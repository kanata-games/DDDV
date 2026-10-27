const fs=require('fs');
let src=fs.readFileSync('/tmp/claude-0/t.js','utf8');
src=src.replace(/\}\)\(\);\s*$/,`globalThis.__T={get car(){return car},get cpus(){return cpus},get game(){return game},get P(){return P},get N(){return N},get GOAL_I(){return GOAL_I},get course(){return course},get cupState(){return cupState},get wallet(){return wallet},get cleared(){return cleared},setTab,startFromMenu,toMenu,loadCourse,get mode(){return mode},get vProf(){return vProf},swapCar,get spec(){return spec},get traffic(){return traffic},__setParts:p=>{Object.assign(parts,p);},selectCup,get cupIdx(){return cupIdx},get cleared(){return cleared}};})();`);
const deep=()=>{const f=function(){};return new Proxy(f,{get(t,k){if(k===Symbol.toPrimitive)return()=>0;if(k==='length')return 0;if(k==='then')return undefined;if(k==='children')return [];if(!(k in t))t[k]=deep();return t[k];},set(t,k,v){t[k]=v;return true;},apply(){return deep();},construct(){return deep();}});};
const els={};
const mkEl=id=>{const t={__l:{},textContent:'',hidden:false,style:{setProperty(){}},className:'',value:'',checked:false};return new Proxy(t,{get(o,k){if(k==='addEventListener')return(ev,fn)=>{o.__l[ev]=fn;};if(k==='click')return()=>o.__l.click&&o.__l.click();if(k in o)return o[k];o[k]=deep();return o[k];},set(o,k,v){o[k]=v;return true;}});};
const ls=new Map();ls.set('touge_own','["86","hokora"]');
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
  const want=Math.atan2(q.x-c.x,q.z-c.z);let e=((want-c.yaw+Math.PI*3)%(Math.PI*2))-Math.PI;let st=-e*2.4;
  press('ArrowRight',st>.25);press('ArrowLeft',st<-.25);
  let m=0;for(let j=c.idx;j<Math.min(N,c.idx+10+Math.round(sp*1.6));j++)m=Math.max(m,Math.abs(P[j].k));
  const vt=Math.min(46,m>0?Math.sqrt(9.5*T.spec.grip/m):46);
  press('ArrowUp',sp<vt);press('ArrowDown',sp>vt+2);
  press('KeyN',USE_N&&m<0.006&&sp<vt-3);
}
let USE_N=true;
function race(){T.startFromMenu();let fr=0;
  while(T.game.state!=='done'&&fr<24000){now+=16.7;drive();if(fr===260){key('KeyH',true);key('KeyH',false);}raf(now);fr++;if(fr%1200===0)console.log('  t',T.game.t.toFixed(0),'idx',T.car.idx,'/',T.N,'sp',Math.hypot(T.car.vx,T.car.vz).toFixed(1),'hits',T.game.hits,'hp',Math.round(T.car.hp),'state',T.game.state);}
  Object.keys(held).forEach(k=>press(k,false));
  for(let i=0;i<5;i++){now+=16.7;raf(now);}
  const cp=T.cpus.map(c=>c.done?c.done.toFixed(0):'-').join(' ');
  return `wallet ${T.wallet} shoved ${T.game.shoved} traffic ${T.traffic.length} ${T.course.id.padEnd(8)} you ${T.game.t.toFixed(1)}s hits ${T.game.hits} hp ${Math.round(T.car.hp)} ret ${T.game.retired} | cpu ${cp} -> ${els.resHead?els.resHead.textContent:'(no result)'}`;
}
ls.set('touge_cleared',JSON.stringify(['D','C','B']));
const cases=[['N','hokora',{engine:0,tire:0,body:0}],['D','hokora',{engine:0,tire:0,body:0}]];
for(const [cid,carId,pt] of cases){
  ls.set('touge_parts',JSON.stringify(pt));
  // reload parts into game state
  T.__setParts&&T.__setParts(pt);
  T.swapCar(carId);T.setTab('gp');T.selectCup(['D','C','B','N','A'].indexOf(cid));
  console.log('== cup',cid,'car',carId,'parts',JSON.stringify(pt),'hpMax',T.spec.hpMax,'pow',T.spec.pow.toFixed(2));
  for(let r=0;r<3;r++){console.log(race(),'kyo',JSON.stringify(T.game.kyo),'earn',[...document.getElementById('earn').__kids||[]].length);els.btnRetry.__l.click();}
}
