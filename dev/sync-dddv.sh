#!/bin/bash
# touge/ の内容を GitHub 用フォルダ dddv/ にまとめてコミット・プッシュする
set -e
SRC=/home/claude/touge; DST=/home/claude/dddv
python3 /home/claude/build_sheets.py
rm -rf $DST/cars && cp -r $SRC/cars $DST/cars
rm -rf $DST/bgm && cp -r $SRC/bgm $DST/bgm
rm -rf $DST/icons && cp -r /home/claude/pwa/icons $DST/icons && cp /home/claude/pwa/manifest.webmanifest $DST/
python3 - <<'PY'
src=open('/home/claude/touge/index.html').read()
i=src.index('</style>')+len('</style>')
pwa='<link rel="manifest" href="manifest.webmanifest">\n<meta name="theme-color" content="#070b16">\n<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">\n<link rel="icon" href="icons/icon-192.png">\n<meta name="apple-mobile-web-app-capable" content="yes">\n<meta name="mobile-web-app-capable" content="yes">\n<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">\n<meta name="apple-mobile-web-app-title" content="DDDV">\n'
out='<!doctype html>\n<html lang="ja">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover">\n'+pwa+src[:i]+'\n<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0;font-size:14px}img{max-width:100%}</style>\n</head>\n<body>\n'+src[i:]+'\n<script>if(\'serviceWorker\' in navigator)addEventListener(\'load\',()=>navigator.serviceWorker.register(\'sw.js\').catch(()=>{}));</script>\n</body>\n</html>\n'
open('/home/claude/dddv/index.html','w').write(out)
import os,hashlib,time
import re
_all=os.listdir('/home/claude/touge/cars');_sh={f[:-11] for f in _all if f.endswith('-sheet.webp')}
cars=sorted(f for f in _all if f.endswith('.webp') and not (re.match(r'(.+)-(back|side|front)\.webp$',f) and re.match(r'(.+)-(back|side|front)\.webp$',f).group(1) in _sh))
sw=open('/home/claude/pwa/sw.js.tmpl').read().replace('__CARS__',',\n'.join("  './cars/%s'"%f for f in cars))
ver=hashlib.sha1((out+''.join(cars)).encode()).hexdigest()[:10]
open('/home/claude/dddv/sw.js','w').write(sw.replace('__VERSION__',ver))
PY
[ "$1" = "--build" ] && exit 0
cd $DST
git add -A
if git diff --cached --quiet; then echo "nothing to commit"; exit 0; fi
git -c user.name="Claude" -c user.email="noreply@anthropic.com" commit -q -m "$1

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01FPBx44a2EdMEPxJYUVZacn"
git fetch -q origin main && git rebase -q origin/main
git push -q origin main && git log --oneline -1
