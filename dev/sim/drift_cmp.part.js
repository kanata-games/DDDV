for(const [id,crs] of CASES){for(const useD of [false,true]){ls.set('touge_course',crs);T.swapCar(id);T.setTab('battle');T.startFromMenu();let fr=0,df=0,maxSlip=0;
while(T.game.state!=='done'&&fr<20000){now+=16.7;drive();const c=T.car;
  if(useD){let m=0;for(let j=c.idx+4;j<Math.min(T.N,c.idx+22);j++)m=Math.max(m,Math.abs(T.P[j].k));press('Space',m>.025&&Math.hypot(c.vx,c.vz)>13&&!c.drifting);}
  raf(now);fr++;if(T.car.drifting)df++;maxSlip=Math.max(maxSlip,T.car.slip||0);}
Object.keys(held).forEach(k=>press(k,false));for(let i=0;i<5;i++){now+=16.7;raf(now);}
const ex=(els.earn&&els.earn.textContent||'');
console.log(id.padEnd(6),crs.padEnd(7),useD?'DRIFT':'grip ','t',T.game.t.toFixed(1),'hits',T.game.hits,'driftSec',(df/60).toFixed(1),'maxSlip',maxSlip.toFixed(0),'pts',Math.round(T.game.dTotal||0),els.resHead&&els.resHead.textContent);}}
process.exit(0);
