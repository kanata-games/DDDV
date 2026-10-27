const fs=require('fs');
let src=fs.readFileSync('/tmp/claude-0/t.js','utf8');
src=src.replace(/\}\)\(\);\s*$/,`globalThis.__T={get car(){return car},get cpus(){return cpus},get game(){return game},get P(){return P},get N(){return N},get GOAL_I(){return GOAL_I},get course(){return course},get cupState(){return cupState},get wallet(){return wallet},get cleared(){return cleared},setTab,startFromMenu,toMenu,loadCourse,get mode(){return mode},get vProf(){return vProf},swapCar,get spec(){return spec},get traffic(){return traffic},__setParts:p=>{Object.assign(parts,p);},selectCup,get cupIdx(){return cupIdx},get cleared(){return cleared}};})();`);
const deep=()=>{const f=function(){};return new Proxy(f,{get(t,k){if(k===Symbol.toPrimitive)return()=>0;if(k==='length')return 0;if(k==='then')return undefined;if(k==='children')return [];if(!(k in t))t[k]=deep();return t[k];},set(t,k,v){t[k]=v;return true;},apply(){return deep();},construct(){return deep();}});};
const els={};
const mkEl=id=>{const t={__l:{},textContent:'',hidden:false,style:{setProperty(){}},className:'',value:'',checked:false};return new Proxy(t,{get(o,k){if(k==='addEventListener')return(ev,fn)=>{o.__l[ev]=fn;};if(k==='click')return()=>o.__l.click&&o.__l.click();if(k in o)return o[k];o[k]=deep();return o[k];},set(o,k,v){o[k]=v;return true;}});};
const ls=new Map();
const winL={};
globalThis.document={addEventListener(){},getElementById:id=>els[id]||(els[id]=mkEl(id)),querySelectorAll:()=>[],createElement:()=>mkEl('_'),body:{classList:{add(){}}}};
globalThis.window=globalThis;globalThis.matchMedia=()=>({matches:false});
globalThis.localStorage={getItem:k=>ls.has(k)?ls.get(k):null,setItem:(k,v)=>ls.set(k,String(v)),removeItem:k=>ls.delete(k)};
globalThis.addEventListener=(ev,fn)=>{(winL[ev]=winL[ev]||[]).push(fn);};
globalThis.innerWidth=1200;globalThis.innerHeight=700;globalThis.devicePixelRatio=1;
let raf=null;globalThis.requestAnimationFrame=f=>{raf=f;};
globalThis.THREE=deep();globalThis.Audio=function(){return deep();};globalThis.Image=function(){return {};};
const _st=setTimeout;globalThis.setTimeout=(f,ms)=>_st(f,0);
els.bgmNow=new Proxy({},{get(o,k){if(k==='querySelector')return()=>null;return k in o?o[k]:deep();},set(o,k,v){o[k]=v;return true;}});
src=src.replace("let cleared=sj('touge_cleared',[]);","let cleared=sj('touge_cleared',[]);");eval(src);

const T=globalThis.__T;let now=0;
const key=(code,down)=>winL[down?'keydown':'keyup'].forEach(f=>f({code,preventDefault(){}}));
const held={};const press=(c,v)=>{if(!!held[c]!==!!v){held[c]=v;key(c,v);}};
function drive(){
  const c=T.car,P=T.P,N=T.N,sp=Math.hypot(c.vx,c.vz);
  const L=Math.round(7+sp*.45),q=P[Math.min(N-1,c.idx+L)];
  const pp=P[c.idx],lat=(c.x-pp.x)*pp.rx+(c.z-pp.z)*pp.rz;if(globalThis.tl==null)globalThis.tl=0;
  const lanes=[-5.3,0,5.3],block=l=>T.traffic.concat(T.cpus).some(t=>{const ds=t.s-c.idx;return ds>-3&&ds<14+sp*1.4&&Math.abs(t.lat-l)<2.6;});
  if(block(tl)){const f=lanes.filter(l=>!block(l)).sort((a,b)=>Math.abs(a-lat)-Math.abs(b-lat));if(f.length)tl=f[0];}
  const tx=q.x+q.rx*tl,tz=q.z+q.rz*tl;
  const want=Math.atan2(tx-c.x,tz-c.z);let e=((want-c.yaw+Math.PI*3)%(Math.PI*2))-Math.PI;let st=-e*2.4;
  press('ArrowRight',st>.25);press('ArrowLeft',st<-.25);
  let m=0;for(let j=c.idx;j<Math.min(N,c.idx+10+Math.round(sp*1.6));j++)m=Math.max(m,Math.abs(P[j].k));
  const vt=Math.min(62,m>0?Math.sqrt(9.5*T.spec.grip/m):62);
  press('ArrowUp',sp<vt);press('ArrowDown',sp>vt+2);
  press('KeyN',USE_N&&m<0.006&&sp<vt-3);
}
let USE_N=true;
ls.set('touge_own','["86","4wd","boss"]');
T.swapCar(process.argv[2]||'4wd');ls.set('touge_free_map','c1ring');T.setTab('free');console.log('course',T.course.id,'N',T.N);T.startFromMenu();
const c=T.car,co=T.course,P=T.P;console.log('loopW',co.loopW,'loopF',co.loopF,'D',JSON.stringify(co.loopD));
for(let i=0;i<120;i++){now+=16.7;raf(now);}
const k=co.loopF-150;c.x=P[k].x;c.z=P[k].z;c.y=P[k].y;c.idx=k;c.s=k;c.yaw=P[k].h;c.vx=Math.sin(c.yaw)*30;c.vz=Math.cos(c.yaw)*30;
let fr=0,warp=0,last=c.idx;
while(fr<60*20){now+=16.7;drive();raf(now);fr++;if(T.car.idx<last-1000){warp++;console.log('warped at fr',fr,'idx',last,'->',T.car.idx,'pos',T.car.x.toFixed(1),T.car.z.toFixed(1));}last=T.car.idx;}
console.log('warps',warp,'idx',T.car.idx,'hp',Math.round(T.car.hp),'state',T.game.state,'traffic near',T.traffic.filter(t=>Math.abs(t.s-T.car.idx)<500).length);
setTimeout(()=>process.exit(0),30);
