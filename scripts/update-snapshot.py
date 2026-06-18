import json
import os
import sys
from datetime import datetime, timezone

import yfinance as yf

ASSETS = [
    {"ticker": "SPY",  "symbol": "SPY",     "name": "SPDR S&P 500 ETF"},
    {"ticker": "QQQ",  "symbol": "QQQ",     "name": "Invesco Nasdaq-100 ETF"},
    {"ticker": "EWZ",  "symbol": "EWZ",     "name": "iShares MSCI Brazil ETF"},
    {"ticker": "BTC",  "symbol": "BTC-USD", "name": "Bitcoin / USD"},
    {"ticker": "GOLD", "symbol": "GC=F",    "name": "Gold Futures (GC=F)"},
]

output = {
    "updated": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
    "assets": {},
}

errors = []

for asset in ASSETS:
    try:
        hist = yf.download(
            asset["symbol"], period="5y", interval="1d",
            auto_adjust=True, progress=False, multi_level_index=False,
        )
        closes = hist["Close"].dropna()

        if len(closes) < 2:
            raise ValueError("Insufficient data points")

        price = float(closes.iloc[-1])
        prev  = float(closes.iloc[-2])
        d24   = (price / prev - 1) * 100

        this_year = datetime.now().year
        ytd_series = closes[closes.index.year < this_year]
        if ytd_series.empty:
            raise ValueError("No prior-year close found for YTD calculation")
        ytd = (price / float(ytd_series.iloc[-1]) - 1) * 100

        y5 = (price / float(closes.iloc[0]) - 1) * 100

        output["assets"][asset["ticker"]] = {
            "name":  asset["name"],
            "price": round(price, 2),
            "d24":   round(d24, 2),
            "ytd":   round(ytd, 2),
            "y5":    round(y5, 2),
        }
        print(f"[{asset['ticker']}] OK  ${price:,.2f}  d24={d24:+.2f}%  ytd={ytd:+.2f}%  5y={y5:+.2f}%")

    except Exception as exc:
        print(f"[{asset['ticker']}] ERROR: {exc}", file=sys.stderr)
        output["assets"][asset["ticker"]] = {"error": str(exc)}
        errors.append(asset["ticker"])

os.makedirs("data", exist_ok=True)
with open("data/snapshot.json", "w") as f:
    json.dump(output, f, indent=2)

print(f"\nWrote data/snapshot.json — {len(output['assets'])} assets, {len(errors)} errors")
if errors:
    print(f"Failed: {', '.join(errors)}", file=sys.stderr)
    sys.exit(1)
