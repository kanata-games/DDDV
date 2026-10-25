import xml.etree.ElementTree as ET,glob,math,heapq,json,sys
nodes={};adj={};wayinfo={}
def d(a,b):return math.hypot((b[0]-a[0])*110540,(b[1]-a[1])*90400)
seen=set()
for f in sorted(glob.glob('/tmp/claude-0/osm/map*.osm')+glob.glob('/tmp/claude-0/osm2/*.osm')+glob.glob('/tmp/claude-0/osm3/*.osm')+glob.glob('/tmp/claude-0/osm4/*.osm')+glob.glob('/tmp/claude-0/osm5/*.osm')):
  r=ET.parse(f).getroot()
  for n in r.iter('node'):nodes[n.get('id')]=(float(n.get('lat')),float(n.get('lon')))
  for w in r.iter('way'):
    t={x.get('k'):x.get('v') for x in w.iter('tag')}
    if t.get('highway') not in('motorway','motorway_link'):continue
    wid=w.get('id')
    if wid in seen:continue
    seen.add(wid)
    nd=[x.get('ref') for x in w.iter('nd')]
    if t.get('oneway')=='-1':nd=nd[::-1]
    both=t.get('oneway')=='no'
    info=dict(ref=t.get('ref'),name=t.get('name'),tun=t.get('tunnel')=='yes',bridge=t.get('bridge')=='yes',link=t['highway']=='motorway_link',layer=t.get('layer'))
    for a,b in zip(nd,nd[1:]):
      adj.setdefault(a,[]).append((b,info));
      if both:adj.setdefault(b,[]).append((a,info))
      wayinfo[(a,b)]=info
def near(pt,ref=None,R=250):
  out=set()
  for a,lst in adj.items():
    for b,info in lst:
      if ref and info['ref']!=ref and ref not in (info['name'] or ''):continue
      if a in nodes and d(nodes[a],pt)<R:out.add(a)
  return out
def dij(src,targets):
  D={src:0};prev={};pq=[(0,src)]
  while pq:
    c,u=heapq.heappop(pq)
    if u in targets:
      path=[u]
      while path[-1]!=src:path.append(prev[path[-1]])
      return c,path[::-1]
    if c>D[u]:continue
    for v,info in adj.get(u,[]):
      if v not in nodes or u not in nodes:continue
      nc=c+d(nodes[u],nodes[v])*(1.3 if info['link'] else 1)
      if nc<D.get(v,1e18):D[v]=nc;prev[v]=u;heapq.heappush(pq,(nc,v))
  return None,None
