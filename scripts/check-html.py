#!/usr/bin/env python3
"""Fails the build when an HTML page has duplicate ids (guards against copy/paste accidents)."""
import re, sys, glob, collections
bad = 0
for f in sorted(glob.glob('*.html') + glob.glob('guides/*.html')):
    ids = re.findall(r'\bid="([^"]+)"', open(f, encoding='utf-8').read())
    dups = [k for k, v in collections.Counter(ids).items() if v > 1]
    if dups:
        bad += 1
        print(f'{f}: duplicate ids {dups}')
sys.exit(1 if bad else 0)
