"""Regenerate the hero-only font after editing Hero.jsx's heading.

Requires: pip install fonttools brotli
Run from the project root: python3 scripts/build-hero-font.py
"""
from pathlib import Path
import html
import re
from fontTools import subset
from fontTools.ttLib import TTFont

root = Path(__file__).resolve().parent.parent
source = root / 'public/fonts/ChenYuluoyan-2.0-Thin.ttf'
output = root / 'public/fonts/southside-hero.woff2'
hero = (root / 'components/Hero.jsx').read_text()
heading = re.search(r'<h1\b[^>]*id="hero-title"[^>]*>(.*?)</h1>', hero, re.S)
if not heading:
    raise SystemExit('Could not find the hero heading')
text = html.unescape(re.sub(r'<[^>]+>', '', heading.group(1)))
font = TTFont(source)
missing = set(map(ord, text)) - set(font.getBestCmap())
if missing:
    raise SystemExit(f'Missing characters: {missing}')
options = subset.Options()
subsetter = subset.Subsetter(options=options)
subsetter.populate(text=text)
subsetter.subset(font)
# Rename this subset to respect the source font's reserved font names.
names = {1: 'Southside Hero', 2: 'Thin', 4: 'Southside Hero Thin',
         6: 'SouthsideHero-Thin', 16: 'Southside Hero', 17: 'Thin'}
for record in font['name'].names:
    if record.nameID in names:
        record.string = names[record.nameID].encode(record.getEncoding())
font.flavor = 'woff2'
font.save(output)
print(f'{output.name}: {output.stat().st_size:,} bytes ({len(set(text))} characters)')
