ls.set('touge_course',CRS);T.swapCar(CAR);T.setTab('battle');T.startFromMenu();let fr=0,doneFor=0,log=[];
while(fr<40000){now+=16.7;
  if(T.game.state==='race'){drive();
    if(FMT==='tsui'){const c=T.car;let m=0;for(let j=c.idx+4;j<Math.min(T.N,c.idx+22);j++)m=Math.max(m,Math.abs(T.P[j].k));press('Space',m>.025&&Math.hypot(c.vx,c.vz)>13&&!c.drifting);}}
  else Object.keys(held).forEach(k=>press(k,false));
  raf(now);fr++;
  if(T.game.state==='done'){doneFor++;if(doneFor===1)log.push('done@'+T.game.t.toFixed(1)+' '+(els.count&&els.count.textContent));if(doneFor>260)break;}else doneFor=0;}
console.log(FMT,CAR,CRS,log.join(' | '),'->',els.resHead&&els.resHead.textContent,'|',els.resSub&&els.resSub.textContent,'| earn',els.earn&&els.earn.textContent&&els.earn.textContent.slice(0,0));process.exit(0);
