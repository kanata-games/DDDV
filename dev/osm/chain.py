import xml.etree.ElementTree as ET,math,json,glob,sys
nodes={};ways={}
for f in sorted(glob.glob('/tmp/claude-0/osm/map*.osm')):
  r=ET.parse(f).getroot()
  for n in r.iter('node'):nodes[n.get('id')]=(float(n.get('lat')),float(n.get('lon')))
  for w in r.iter('way'):
    t={x.get('k'):x.get('v') for x in w.iter('tag')}
    if t.get('highway')=='motorway' and (t.get('ref')=='C1' or '都心環状線' in (t.get('name') or '')):
      ways[w.get('id')]=dict(id=w.get('id'),nd=[x.get('ref') for x in w.iter('nd')],tun=t.get('tunnel')=='yes',name=t.get('name'))
ways=list(ways.values())
start={};[start.setdefault(w['nd'][0],[]).append(w) for w in ways]
ends={w['nd'][-1] for w in ways};used=set();chains=[]
for w in ways:
  if w['nd'][0] in ends: continue
  ch=[w];used.add(w['id'])
  while True:
    nx=[x for x in start.get(ch[-1]['nd'][-1],[]) if x['id'] not in used]
    if not nx:break
    nx.sort(key=lambda x:'通行帯' in (x['name'] or ''));ch.append(nx[0]);used.add(nx[0]['id'])
  chains.append(ch)
def dist(a,b):return math.hypot((b[0]-a[0])*110540,(b[1]-a[1])*111320*math.cos(math.radians(a[0])))
out=[]
for ch in chains:
  pts=[]
  for w in ch:
    for i,n in enumerate(w['nd']):
      if pts and i==0:continue
      if n not in nodes:print('missing node');continue
      pts.append([*nodes[n],1 if w['tun'] else 0])
  L=sum(dist(pts[i],pts[i+1]) for i in range(len(pts)-1))
  print(len(ch),'ways',len(pts),'pts',round(L),'m tun%',round(100*sum(p[2] for p in pts)/len(pts)),[round(x,5) for x in pts[0][:2]],'->',[round(x,5) for x in pts[-1][:2]])
  out.append(pts)
print('unused',len([w for w in ways if w['id'] not in used]))
json.dump(out,open('/tmp/claude-0/osm/chains.json','w'))
