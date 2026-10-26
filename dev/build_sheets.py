# 後ろ・横・前の絵を1枚のシートにまとめ、index.html の寸法表を更新する
import os,re,json
from PIL import Image
D='/home/claude/touge/cars';dims={}
for f in sorted(os.listdir(D)):
    m=re.match(r'(.+)-back\.webp$',f)
    if not m:continue
    id_=m.group(1);parts=[os.path.join(D,f'{id_}-{v}.webp') for v in ('back','side','front')]
    if not all(os.path.exists(p) for p in parts):continue
    ims=[Image.open(p).convert('RGBA') for p in parts];W=max(i.width for i in ims);H=sum(i.height for i in ims)
    sh=Image.new('RGBA',(W,H),(0,0,0,0));y=0
    for i in ims:sh.paste(i,(0,y));y+=i.height
    out=os.path.join(D,f'{id_}-sheet.webp')
    if not os.path.exists(out) or os.path.getmtime(out)<max(os.path.getmtime(p) for p in parts):sh.save(out,quality=90,method=6)
    dims[id_]=[[i.width,i.height] for i in ims]
p='/home/claude/touge/index.html';s=open(p).read()
blk='/*SHEETS*/'+json.dumps(dims,separators=(',',':'))+'/*SHEETS_END*/'
s=re.sub(r'/\*SHEETS\*/.*?/\*SHEETS_END\*/',lambda m:blk,s,flags=re.S)
open(p,'w').write(s);print('sheets',len(dims))
