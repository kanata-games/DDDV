const fs=require('fs');
let src=fs.readFileSync('/tmp/claude-0/t.js','utf8');
src=src.replace(/\}\)\(\);\s*$/,`globalThis.__T={get car(){return car},get cpus(){return cpus},get game(){return game},get P(){return P},get N(){return N},get GOAL_I(){return GOAL_I},get course(){return course},get cupState(){return cupState},get wallet(){return wallet},get cleared(){return cleared},setTab,startFromMenu,toMenu,loadCourse,get mode(){return mode},get vProf(){return vProf},swapCar,get spec(){return spec},get traffic(){return traffic},__setParts:p=>{Object.assign(parts,p);},selectCup,get cupIdx(){return cupIdx},get cleared(){return cleared}};})();`);
const deep=()=>{const f=function(){};return new Proxy(f,{get(t,k){if(k===Symbol.toPrimitive)return()=>0;if(k==='length')return 0;if(k==='then')return undefined;if(k==='children')return [];if(!(k in t))t[k]=deep();return t[k];},set(t,k,v){t[k]=v;return true;},apply(){return deep();},construct(){return deep();}});};
const els={};
const mkEl=id=>{const t={__l:{},textContent:'',hidden:false,style:{setProperty(){}},className:'',value:'',checked:false};return new Proxy(t,{get(o,k){if(k==='addEventListener')return(ev,fn)=>{o.__l[ev]=fn;};if(k==='click')return()=>o.__l.click&&o.__l.click();if(k in o)return o[k];o[k]=deep();return o[k];},set(o,k,v){o[k]=v;return true;}});};
const ls=new Map();ls.set('touge_course','park');ls.set('touge_mode','battle');
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
for(const id of ['wanganS','hanedaL']){T.loadCourse(id);let m=0,mi=0;for(let i=5;i<T.N-5;i++)if(Math.abs(T.P[i].k)>m){m=Math.abs(T.P[i].k);mi=i;}let gmax=0;for(let i=10;i<T.N-10;i++)gmax=Math.max(gmax,Math.abs(T.P[i+5].y-T.P[i-5].y)/10);console.log(id,'N',T.N,'maxk',m.toFixed(4),'(R',(1/m).toFixed(0),'m) at',mi,'max grade',(gmax*100).toFixed(1)+'%','maxY',Math.max(...T.P.map(p=>p.y)).toFixed(0));}
setTimeout(()=>process.exit(0),30);
