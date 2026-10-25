const fs=require('fs');
let src=fs.readFileSync('/tmp/claude-0/t.js','utf8');
src=src.replace(/\}\)\(\);\s*$/,`globalThis.__T={get car(){return car},get cpus(){return cpus},get game(){return game},get P(){return P},get N(){return N},get GOAL_I(){return GOAL_I},get course(){return course},get cupState(){return cupState},get wallet(){return wallet},get cleared(){return cleared},setTab,startFromMenu,toMenu,loadCourse,get mode(){return mode},get vProf(){return vProf},swapCar,get spec(){return spec},get traffic(){return traffic},selectCup,get cupIdx(){return cupIdx},get cleared(){return cleared}};})();`);
const deep=()=>{const f=function(){};return new Proxy(f,{get(t,k){if(k===Symbol.toPrimitive)return()=>0;if(k==='length')return 0;if(k==='then')return undefined;if(k==='children')return [];if(!(k in t))t[k]=deep();return t[k];},set(t,k,v){t[k]=v;return true;},apply(){return deep();},construct(){return deep();}});};
const els={};
const mkEl=id=>{const t={__l:{},textContent:'',hidden:false,style:{setProperty(){}},className:'',value:'',checked:false};return new Proxy(t,{get(o,k){if(k==='addEventListener')return(ev,fn)=>{o.__l[ev]=fn;};if(k==='click')return()=>o.__l.click&&o.__l.click();if(k in o)return o[k];o[k]=deep();return o[k];},set(o,k,v){o[k]=v;return true;}});};
const ls=new Map();
const winL={};
globalThis.document={getElementById:id=>els[id]||(els[id]=mkEl(id)),querySelectorAll:()=>[],createElement:()=>mkEl('_'),body:{classList:{add(){}}}};
globalThis.window=globalThis;globalThis.matchMedia=()=>({matches:false});
globalThis.localStorage={getItem:k=>ls.has(k)?ls.get(k):null,setItem:(k,v)=>ls.set(k,String(v)),removeItem:k=>ls.delete(k)};
globalThis.addEventListener=(ev,fn)=>{(winL[ev]=winL[ev]||[]).push(fn);};
globalThis.innerWidth=1200;globalThis.innerHeight=700;globalThis.devicePixelRatio=1;
let raf=null;globalThis.requestAnimationFrame=f=>{raf=f;};
globalThis.THREE=deep();globalThis.Audio=function(){return deep();};globalThis.Image=function(){return {};};
const _st=setTimeout;globalThis.setTimeout=(f,ms)=>_st(f,0);
els.bgmNow=new Proxy({},{get(o,k){if(k==='querySelector')return()=>null;return k in o?o[k]:deep();},set(o,k,v){o[k]=v;return true;}});
eval(src);
const T=globalThis.__T;
let now=0;const step=(n)=>{for(let i=0;i<n;i++){now+=16.7;raf(now);}};
const key=(code,down)=>winL[down?'keydown':'keyup'].forEach(f=>f({code,preventDefault(){}}));
console.log('loaded course',T.course.id,'N',T.N,'mode',T.mode);
step(30);
function runRace(label){
  els.btnStart.__l.click&&0;
  step(260); // countdown + a bit
  key('ArrowUp',true);step(300);
  console.log(label,'course',T.course.id,'state',T.game.state,'cpus',T.cpus.length,'cpu s',T.cpus.map(c=>c.s.toFixed(0)).join(','),'car idx',T.car.idx);
  // teleport near goal to finish quickly
  const p=T.P[T.GOAL_I+1];T.car.x=p.x;T.car.z=p.z;T.car.idx=T.GOAL_I+1;T.car.s=p.d;
  step(5);key('ArrowUp',false);
  console.log('  after finish state',T.game.state,'wallet',T.wallet,'cup',JSON.stringify(T.cupState),'head',els.resHead.textContent,'retry',els.btnRetry.textContent);
}
// cup mode
T.setTab('gp');T.startFromMenu();runRace('race1');
els.btnRetry.__l.click();runRace('race2');
els.btnRetry.__l.click();runRace('race3');
console.log('cleared',JSON.stringify(T.cleared));
els.btnRetry.__l.click();step(10);console.log('back to menu state',T.game.state,'cpus',T.cpus.length);
// battle
T.setTab('battle');T.startFromMenu();runRace('battle');
els.btnMenu.__l.click();step(5);
// train in cup
T.swapCar('train');T.setTab('gp');T.startFromMenu();runRace('train-cup');
console.log('OK no runtime errors');
