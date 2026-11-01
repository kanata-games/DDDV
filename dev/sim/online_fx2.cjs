const L=(...a)=>require('fs').appendFileSync('/tmp/claude-0/ol.log',a.map(x=>typeof x==='string'?x:JSON.stringify(x)).join(' ')+'\n');
globalThis.__L=L;
const SRV=globalThis.__SRV;
globalThis.location={search:'?online=ABC234&key=k&tok=&name=%E3%82%84%E3%81%BE%E3%81%A0&srv=asobiba.test.workers.dev',host:'x'};
const FX=[];const Q=[];let G=null,ME=null;const room={members:[{id:'p1',name:'やまだ',host:true},{id:'p2',name:'ボット',host:false}],playing:'dddv'};
function view(){return {t:'state',you:'p1',room,game:G?SRV.viewFor(G,'p1'):null};}
function tickSrv(){if(G&&SRV.wakeAt(G)&&Date.now()>=SRV.wakeAt(G)){SRV.tick(G,Date.now());Q.push(view());}}
function act(pid,a,host){tickSrv();const r=SRV.action(G,pid,a,{isHost:host});if(r&&'live' in r){if(r.live)Q.push({t:'live',data:r.live});return;}Q.push(view());}
globalThis.WebSocket=class{constructor(u){this.url=u;this.readyState=1;ME=this;Q.push({__open:1});}send(raw){const m=JSON.parse(raw);if(m.t==='hello'){Q.push({t:'welcome',you:'p1',token:'T1'});G=SRV.setup([{id:'p1',name:'やまだ'},{id:'p2',name:'ボット'}],{course:'down',reg:'equal'});act('p2',{type:'join',car:'fr',paint:'neon',name:'ボット'},false);}else if(m.t==='act'){if(m.action.type==='fx')FX.push(m.action);act('p1',m.action,true);}}};
globalThis.__flush=()=>{while(Q.length){const m=Q.shift();if(m.__open){ME.onopen();continue;}ME&&ME.onmessage&&ME.onmessage({data:JSON.stringify(m)});}};
const fs=require('fs');
let src=fs.readFileSync('/tmp/claude-0/t.js','utf8');
src=src.replace(/\}\)\(\);\s*$/,`globalThis.__T={get car(){return car},get cpus(){return cpus},get game(){return game},get P(){return P},get N(){return N},get GOAL_I(){return GOAL_I},get course(){return course},get cupState(){return cupState},get wallet(){return wallet},get cleared(){return cleared},setTab,startFromMenu,toMenu,loadCourse,get mode(){return mode},get vProf(){return vProf},swapCar,get spec(){return spec},get traffic(){return traffic},__setParts:p=>{Object.assign(parts,p);},selectCup,get cupIdx(){return cupIdx},get cleared(){return cleared},get ONLINE(){return ONLINE},get selId(){return selId},get spec(){return spec}};})();`);
const deep=()=>{const f=function(){};return new Proxy(f,{get(t,k){if(k===Symbol.toPrimitive)return()=>0;if(k==='length')return 0;if(k==='then')return undefined;if(k==='children')return [];if(!(k in t))t[k]=deep();return t[k];},set(t,k,v){t[k]=v;return true;},apply(){return deep();},construct(){return deep();}});};
const els={};
const mkEl=id=>{const t={__l:{},textContent:'',hidden:false,style:{setProperty(){}},className:'',value:'',checked:false};return new Proxy(t,{get(o,k){if(k==='addEventListener')return(ev,fn)=>{o.__l[ev]=fn;};if(k==='click')return()=>o.__l.click&&o.__l.click();if(k in o)return o[k];o[k]=deep();return o[k];},set(o,k,v){o[k]=v;return true;}});};
const ls=new Map();ls.set('touge_course','park');ls.set('touge_mode','battle');
const winL={};
globalThis.document={addEventListener(){},querySelector:()=>mkEl('_q'),getElementById:id=>els[id]||(els[id]=mkEl(id)),querySelectorAll:()=>[],createElement:()=>mkEl('_'),body:{classList:{add(){}}}};
globalThis.window=globalThis;globalThis.matchMedia=()=>({matches:false});
globalThis.localStorage={getItem:k=>ls.has(k)?ls.get(k):null,setItem:(k,v)=>ls.set(k,String(v)),removeItem:k=>ls.delete(k)};
globalThis.addEventListener=(ev,fn)=>{(winL[ev]=winL[ev]||[]).push(fn);};
globalThis.innerWidth=1200;globalThis.innerHeight=700;globalThis.devicePixelRatio=1;
let raf=null;globalThis.requestAnimationFrame=f=>{raf=f;};
globalThis.THREE=deep();globalThis.Audio=function(){return deep();};globalThis.Image=function(){return {};};
const _st=setTimeout;globalThis.setTimeout=(f,ms)=>_st(f,0);
els.bgmNow=new Proxy({},{get(o,k){if(k==='querySelector')return()=>null;return k in o?o[k]:deep();},set(o,k,v){o[k]=v;return true;}});
src=src.replace("let cleared=sj('touge_cleared',[]);","let cleared=sj('touge_cleared',[]);");eval(src);

const T=globalThis.__T;let now=0;const _B=Date.now();Date.now=()=>_B+now;
const key=(code,down)=>winL[down?'keydown':'keyup'].forEach(f=>f({code,preventDefault(){}}));
const held={};const press=(c,v)=>{if(!!held[c]!==!!v){held[c]=v;key(c,v);}};
function drive(){
  const c=T.car,P=T.P,N=T.N,sp=Math.hypot(c.vx,c.vz);
  const L=Math.round(7+sp*.45),q=P[Math.min(N-1,c.idx+L)];
  const want=Math.atan2(q.x-c.x,q.z-c.z);let e=((want-c.yaw+Math.PI*3)%(Math.PI*2))-Math.PI;let st=-e*2.4;
  press('ArrowRight',st>.25);press('ArrowLeft',st<-.25);
  let m=0;for(let j=c.idx;j<Math.min(N,c.idx+10+Math.round(sp*1.6));j++)m=Math.max(m,Math.abs(P[j].k));
  const vt=Math.min(46,m>0?Math.sqrt(9.5*T.spec.grip/m):46);
  press('ArrowUp',sp<vt);press('ArrowDown',sp>vt+2);
  press('KeyN',USE_N&&m<0.006&&sp<vt-3);
}
let USE_N=true;
const step=()=>{now+=16.7;__flush();tickSrv();raf(now);};
const H=()=>{key('KeyH',true);key('KeyH',false);};
(async()=>{await new Promise(r=>_st(r,30));for(let i=0;i<30;i++)step();
const O=T.ONLINE;
async function round(id,course,off,hfr){off=off??12;hfr=hfr??120;
  T.swapCar(id);await new Promise(r=>_st(r,10));for(let i=0;i<5;i++)step();
  if(course){act('p1',{type:'course',id:course},true);__flush();}
  els.btnStart.__l.click();let fr=0;FX.length=0;
  while(T.game.state!=='race'&&fr<1500){now+=16.7;__flush();tickSrv();raf(now);fr++;}
  // bot sits ahead of me
  for(fr=0;fr<60*6;fr++){now+=16.7;drive();
    if(off==='fix'&&fr===0)globalThis.__fix=T.car.idx+40;const ii=off==='fix'?globalThis.__fix:Math.min(T.N-1,T.car.idx+(id==='ostrich'?3:off)),p=T.P[ii];act('p2',{type:'pos',d:[p.x,p.y,p.z,p.h,ii,(off==='fix'?0:Math.hypot(T.car.vx,T.car.vz))]},false);if(hfr===-2)press('KeyN',fr>60);
    if(fr===hfr)H();__flush();tickSrv();raf(now);if(fr%20===0)await new Promise(r=>_st(r,2));}
  await new Promise(r=>_st(r,20));L(id.padEnd(9),'fx sent:',JSON.stringify(FX.map(f=>({stun:f.stun,vmul:+f.vmul.toFixed(2),lat:+f.lat.toFixed(2)}))));
  act('p2',{type:'finish',t:200},false);T.toMenu();__flush();for(let i=0;i<5;i++)step();await new Promise(r=>_st(r,5));
  // 次のラウンドのため部屋を done→ready へ（leave で done にする）
}
for(const [id,off,hf] of [['fire',15,-2],['deco',-12,60],['enzetsu',-10,60],['roller','fix',-1],['packer','fix',-1],['fork','fix',-1],['tank','fix',-1]])await round(id,null,off,hf);
// 受け取る側：相手の主砲を受けたら
T.swapCar('86');await new Promise(r=>_st(r,10));for(let i=0;i<5;i++)step();els.btnStart.__l.click();let fr=0;while(T.game.state!=='race'&&fr<1500){now+=16.7;__flush();tickSrv();raf(now);fr++;}
for(fr=0;fr<180;fr++){now+=16.7;drive();__flush();tickSrv();raf(now);}
const v0=Math.hypot(T.car.vx,T.car.vz);act('p2',{type:'fx',to:'p1',stun:1.6,vmul:.45,lat:0,wob:0,car:'tank'},false);__flush();
const v1=Math.hypot(T.car.vx,T.car.vz);L('receive: speed',v0.toFixed(1),'->',v1.toFixed(1),'stun until',(T.car.olStunT-T.game.t).toFixed(2),'flash',els.msg&&els.msg.textContent);
act('p2',{type:'fx',to:'p1',stun:1.6,vmul:.45,lat:0,wob:0,car:'tank'},false);__flush();L('2nd within immunity speed',Math.hypot(T.car.vx,T.car.vz).toFixed(1));
process.exit(0);})();
