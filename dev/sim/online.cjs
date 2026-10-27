const L=(...a)=>require('fs').appendFileSync('/tmp/claude-0/ol.log',a.map(x=>typeof x==='string'?x:JSON.stringify(x)).join(' ')+'\n');
globalThis.__L=L;
const SRV=globalThis.__SRV;
globalThis.location={search:'?online=ABC234&key=k&tok=&name=%E3%82%84%E3%81%BE%E3%81%A0&srv=asobiba.test.workers.dev',host:'x'};
const Q=[];let G=null,ME=null;const room={members:[{id:'p1',name:'やまだ',host:true},{id:'p2',name:'ボット',host:false}],playing:'dddv'};
function view(){return {t:'state',you:'p1',room,game:G?SRV.viewFor(G,'p1'):null};}
function tickSrv(){if(G&&SRV.wakeAt(G)&&Date.now()>=SRV.wakeAt(G)){SRV.tick(G,Date.now());Q.push(view());}}
function act(pid,a,host){tickSrv();const r=SRV.action(G,pid,a,{isHost:host});if(r&&'live' in r){if(r.live)Q.push({t:'live',data:r.live});return;}Q.push(view());}
globalThis.WebSocket=class{constructor(u){this.url=u;this.readyState=1;ME=this;Q.push({__open:1});}send(raw){const m=JSON.parse(raw);if(m.t==='hello'){Q.push({t:'welcome',you:'p1',token:'T1'});G=SRV.setup([{id:'p1',name:'やまだ'},{id:'p2',name:'ボット'}],{course:'down',reg:'equal'});act('p2',{type:'join',car:'fr',paint:'neon',name:'ボット'},false);}else if(m.t==='act')act('p1',m.action,true);}};
globalThis.__flush=()=>{while(Q.length){const m=Q.shift();if(m.__open){ME.onopen();continue;}ME&&ME.onmessage&&ME.onmessage({data:JSON.stringify(m)});}};
const fs=require('fs');
let src=fs.readFileSync('/tmp/claude-0/t.js','utf8');
src=src.replace(/\}\)\(\);\s*$/,`globalThis.__T={get car(){return car},get cpus(){return cpus},get game(){return game},get P(){return P},get N(){return N},get GOAL_I(){return GOAL_I},get course(){return course},get cupState(){return cupState},get wallet(){return wallet},get cleared(){return cleared},setTab,startFromMenu,toMenu,loadCourse,get mode(){return mode},get vProf(){return vProf},swapCar,get spec(){return spec},get traffic(){return traffic},__setParts:p=>{Object.assign(parts,p);},selectCup,get cupIdx(){return cupIdx},get cleared(){return cleared},get ONLINE(){return ONLINE},get selId(){return selId},get spec(){return spec}};})();`);
const deep=()=>{const f=function(){};return new Proxy(f,{get(t,k){if(k===Symbol.toPrimitive)return()=>0;if(k==='length')return 0;if(k==='then')return undefined;if(k==='children')return [];if(!(k in t))t[k]=deep();return t[k];},set(t,k,v){t[k]=v;return true;},apply(){return deep();},construct(){return deep();}});};
const els={};
const mkEl=id=>{const t={__l:{},textContent:'',hidden:false,style:{setProperty(){}},className:'',value:'',checked:false};return new Proxy(t,{get(o,k){if(k==='addEventListener')return(ev,fn)=>{o.__l[ev]=fn;};if(k==='click')return()=>o.__l.click&&o.__l.click();if(k in o)return o[k];o[k]=deep();return o[k];},set(o,k,v){o[k]=v;return true;}});};
const ls=new Map();ls.set('touge_course','park');ls.set('touge_mode','battle');
const winL={};
globalThis.document={querySelector:()=>mkEl('_q'),getElementById:id=>els[id]||(els[id]=mkEl(id)),querySelectorAll:()=>[],createElement:()=>mkEl('_'),body:{classList:{add(){}}}};
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
(async()=>{await new Promise(r=>_st(r,30));for(let i=0;i<30;i++)step();
const O=T.ONLINE;L('connected you',O.you,'host',O.host,'phase',O.st&&O.st.phase,'my car on server',G.players.p1&&G.players.p1.car,'selId',T.selId);
T.swapCar('gtr');await new Promise(r=>_st(r,10));for(let i=0;i<5;i++)step();L('car change ->',G.players.p1.car);
L('start btn:',els.btnStart.textContent,'disabled',els.btnStart.disabled);
L('click');els.btnStart.__l.click();L('clicked',Q.length);__flush();L('flushed',G.phase);for(let i=0;i<3;i++){step();L('s',i);}
L('after go: phase',G.phase,'spec eq',T.spec.eq,'pow',T.spec.pow.toFixed(2),'racing',O.racing,'course',T.course.id,'cpus',T.cpus.length,'traffic',T.traffic.length,'count',T.game.count.toFixed(2),'ghosts',Object.keys(O.ghosts));
// ボットは峠を走る（毎フレーム位置を送る）
let bs=T.P[0].d,fr=0,sent=0,doneFor=0;
while(fr<40000){now+=16.7;
  if(T.game.state==='race'){drive();if(fr%6===0&&G.phase!=='done'){bs=Math.min(T.N-1,bs+1.1);const p=T.P[Math.floor(bs)];act('p2',{type:'pos',d:[p.x,p.y,p.z,p.h,Math.floor(bs),20]},false);sent++;}
    if(bs>=T.GOAL_I&&!G.players.p2.finish)act('p2',{type:'finish',t:+T.game.t.toFixed(2)},false);}
  else Object.keys(held).forEach(k=>press(k,false));
  __flush();tickSrv();raf(now);fr++;
  if(fr===900){const g=O.ghosts.p2;L('mid race: ghost got',g&&g.got,'ghost idx',g&&g.idx,'my idx',T.car.idx,'gap text',els.gap.textContent,'server last pos rounds',sent);}
  if(T.game.state==='done'&&G.phase==='done'){doneFor++;if(doneFor>60)break;}else doneFor=0;}
await new Promise(r=>_st(r,1800));__flush();act('p2',{type:'pos',d:[0,0,0,0,0,0]},false);__flush();
L('finish: phase',G.phase,'frames',fr,'standings',els.standings.innerHTML.replace(/<[^>]+>/g,' ').slice(0,200),'results',JSON.stringify(SRV.viewFor(G,'p1').results.map(r=>[r.name,r.t,r.ret])),'head',els.resHead.textContent,'retry btn',els.btnRetry.textContent,'wallet',T.wallet);
els.btnRetry.__l.click();for(let i=0;i<5;i++)step();
L('back to room: racing',O.racing,'state',T.game.state,'ghosts',Object.keys(O.ghosts).length,'title hidden',els.title.hidden,'start btn',els.btnStart.textContent);
// 2戦目：コース変更→途中で抜ける
act('p1',{type:'course',id:'lake'},true);__flush();els.btnStart.__l.click();for(let i=0;i<400;i++){now+=16.7;if(T.game.state==='race')drive();__flush();tickSrv();raf(now);}
L('round2 course',T.course.id,'racing',O.racing);T.toMenu();__flush();L('left: me ret',G.players.p1.ret,'racing',O.racing,'mode',T.mode);
process.exit(0);
})();
