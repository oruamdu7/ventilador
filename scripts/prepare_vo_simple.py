#!/usr/bin/env python3
"""Simplified prepare_vo: converts vo-timings.json to vo.json without audio processing.
Use when numpy/scipy/soundfile are not available."""

import json
from pathlib import Path

ROOT = Path.cwd()
TIMINGS = json.loads((ROOT / "scripts" / "out" / "vo-timings.json").read_text(encoding="utf-8"))
OUT_JSON = ROOT / "src" / "data" / "vo.json"

out = {}
for key, line in TIMINGS["lines"].items():
    out[key] = {
        "text": line["text"],
        "seconds": round(line["words"][-1]["end"], 3),
        "words": line["words"],
    }
    print(f"{key}: {out[key]['seconds']:.3f}s")

print(f"total: {sum(v['seconds'] for v in out.values()):.2f}s")
OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
OUT_JSON.write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Wrote {OUT_JSON}")