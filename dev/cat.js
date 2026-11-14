// Original, time-based cat behaviour. Needs are gentle preferences, never a health penalty.
export const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
export const STATIONS={food:{x:-2.65,z:1.7},water:{x:-1.9,z:2.2},bed:{x:2.75,z:1.8},scratch:{x:-3.2,z:.2}};
export class CatMind {
 constructor(rng=Math.random){
  this.rng=rng;this.x=-1.8;this.z=1.2;this.heading=0;this.state='observe';this.elapsed=0;this.duration=4;
  this.energy=.8;this.satiety=.55;this.hydration=.7;this.curiosity=.7;this.trust=.35;this.excitement=0;
  this.target={x:this.x,z:this.z};this.focus={x:0,z:0};this.jump=0;this.gait=0;this.speed=0;this.history=[];
  this.activity=null;this.activityTime=0;this.arrival=null;this.foodAvailable=false;this.waterAvailable=false;this.tour=[];this.visits=0;
 }
 enter(state,duration=3){this.state=state;this.elapsed=0;this.duration=duration;this.history.push(state);if(this.history.length>30)this.history.shift()}
 cancel(){this.activity=null;this.arrival=null;this.tour=[];this.activityTime=0}
 pet(){this.cancel();this.trust=clamp(this.trust+.05);this.energy=clamp(this.energy+.015);this.enter('nuzzle',3)}
 valid(point){
  let p={x:clamp(point.x,-3.7,3.7),z:clamp(point.z,-.7,2.6)},dx=p.x-1.8,dz=p.z+.8,d=Math.hypot(dx,dz);
  if(d<1.15){let a=Math.atan2(dz,dx);p.x=clamp(1.8+Math.cos(a)*1.18,-3.7,3.7);p.z=clamp(-.8+Math.sin(a)*1.18,-.7,2.6)}
  return p;
 }
 go(point,state,duration=4){this.target=this.valid(point);this.focus=this.target;this.arrival={state,duration};this.enter('travel',18)}
 call(point){this.cancel();this.target=this.valid(point);this.focus=this.target;this.enter('approach',14)}
 command(action){
  if(!['food','water','ball','wand','scratch','rest','explore','stretch','stop'].includes(action))return '';
  if((action==='ball'||action==='wand')&&this.energy<.16)return '今は少し眠そう。休んでから、また遊ぼう。';
  this.cancel();
  if(action==='stop'){this.enter('sit',4);return 'おもちゃをしまった。ルナのペースにまかせよう。'}
  this.activity=action;this.activityTime=['ball','wand'].includes(action)?24:45;
  if(action==='food'){this.foodAvailable=true;if(this.satiety>.94){this.cancel();this.enter('sniff',2);return '今はおなかいっぱい。ごはんはお皿に置いておこう。'}this.go(STATIONS.food,'eat',5);return 'ごはんを用意した。ルナがお皿の匂いに気づいた。'}
  if(action==='water'){this.waterAvailable=true;if(this.hydration>.96){this.cancel();this.enter('sit',3);return '今はのどが潤っている。お水はあとで飲めるように。'}this.go(STATIONS.water,'drink',5);return 'お水を用意した。ルナが水飲み場へ向かっている。'}
  if(action==='rest'){this.go(STATIONS.bed,'sleep',12);return 'クッションを整えた。ルナをゆっくり休ませよう。'}
  if(action==='scratch'){this.go(STATIONS.scratch,'scratch',5);return '爪とぎを見つけて、ルナが近づいていく。'}
  if(action==='stretch'){this.enter('stretch',3.5);return '前足をぐーっと伸ばして、ひと息。'}
  if(action==='explore'){this.tour=[{x:-3,z:1},{x:.2,z:2.3},{x:3,z:.7}];this.go(this.tour.shift(),'sniff',2.5);return '庭を探検。匂いを確かめながら、いくつかの場所を巡ります。'}
  this.target=this.valid({x:0,z:1.8});this.enter('chase',24);this.excitement=clamp(this.excitement+.25);
  return action==='ball'?'ボールを転がした。追いかけて、前足でちょん。':'猫じゃらしを出した。庭をタップすると、その場所で誘えます。';
 }
 celebrate(chain){this.excitement=clamp(this.excitement+chain*.2);if(!this.activity&&this.state!=='sleep')this.enter(chain>1?'pounce':'watch',2.5)}
 choose(music){
  if(this.state==='sleep'&&this.energy<.85){this.duration=this.elapsed+6;return}
  if(this.foodAvailable&&this.satiety<.5){this.activity='food';this.activityTime=45;this.go(STATIONS.food,'eat',5);return}
  if(this.waterAvailable&&this.hydration<.55){this.activity='water';this.activityTime=45;this.go(STATIONS.water,'drink',5);return}
  if(this.energy<.2){this.command('rest');return}
  let options=[['wander',this.curiosity*.75+this.rng()*.5],['groom',.3+this.rng()*.5],['sit',.4+this.rng()*.4],['watch',music*.8+this.excitement*.6],['sniff',.45+this.rng()*.45],['approach',this.trust*.9+this.rng()*.2],['stretch',.3+this.rng()*.5]];
  let state=options.sort((a,b)=>b[1]-a[1])[0][0];this.enter(state,3+this.rng()*6);
  if(state==='approach')this.target={x:0,z:2};
  if(state==='wander')this.target=this.valid({x:-3.5+this.rng()*7,z:-.5+this.rng()*2.8});
 }
 finishActivity(music){
  if(this.activity==='explore'&&this.tour.length){this.visits++;this.go(this.tour.shift(),'sniff',2.5);return}
  if(this.state==='sniff'&&this.activity==='explore')this.visits++;
  if(this.state==='eat'){this.foodAvailable=false;this.trust=clamp(this.trust+.025)}
  if(this.state==='drink')this.waterAvailable=false;
  if(['ball','wand'].includes(this.activity)&&this.activityTime>0){this.enter('chase',this.activityTime);return}
  this.cancel();this.enter('sit',3);
 }
 update(dt,music=0,onset=0){
  dt=clamp(dt,0,.1);this.elapsed+=dt;this.excitement=Math.max(0,this.excitement-dt*.04);
  this.curiosity=clamp(this.curiosity+dt*.008);this.satiety=clamp(this.satiety-dt*.0006);this.hydration=clamp(this.hydration-dt*.0008);
  this.energy=clamp(this.energy+dt*(this.state==='sleep'?.035:this.state==='chase'?-.012:-.0025));
  if(this.state==='eat')this.satiety=clamp(this.satiety+dt*.12);
  if(this.state==='drink')this.hydration=clamp(this.hydration+dt*.12);
  if(this.activity){this.activityTime-=dt;if(this.activityTime<=0){this.cancel();this.enter('sit',4)}}
  if(this.elapsed>this.duration){if(this.activity&&this.state!=='sleep')this.finishActivity(music);else{this.cancel();this.choose(music)}}
  let walking=['wander','approach','travel','chase'].includes(this.state),dx=this.target.x-this.x,dz=this.target.z-this.z,d=Math.hypot(dx,dz);
  let chasing=this.state==='chase',desired=walking&&d>.12?(chasing?1.25:.65)+this.excitement*.4:0;
  this.speed+=(desired-this.speed)*Math.min(1,dt*6);
  if(walking&&d>(chasing?.32:.15)){
   let vx=dx/d,vz=dz/d,ox=this.x-1.8,oz=this.z+.8,od=Math.hypot(ox,oz);
   if(od<1.6){let force=(1.6-od)*2.4;vx+=ox/Math.max(.1,od)*force;vz+=oz/Math.max(.1,od)*force}
   let length=Math.hypot(vx,vz)||1;vx/=length;vz/=length;this.heading=Math.atan2(vx,vz);let step=Math.min(d,this.speed*dt);
   this.x=clamp(this.x+vx*step,-3.7,3.7);this.z=clamp(this.z+vz*step,-.7,2.6);this.gait+=dt*this.speed*9;
  }else{
   this.gait+=dt*.3;
   if(walking){
    if(chasing){this.enter('pounce',1.1)}
    else if(this.arrival){let next=this.arrival;this.arrival=null;this.enter(next.state,next.duration);if(next.state==='sleep')this.activityTime=80}
    else this.enter(this.state==='approach'?(this.trust>.65?'nuzzle':'sit'):'sniff',4);
   }
  }
  this.jump=this.state==='pounce'?Math.max(0,Math.sin(Math.min(1,this.elapsed/.85)*Math.PI))*.55:0;return this;
 }
 snapshot(){return {trust:this.trust,energy:this.energy,satiety:this.satiety,hydration:this.hydration,at:Date.now()}}
 restore(memory,now=Date.now()){if(!memory||typeof memory!=='object')return;for(let key of ['trust','energy','satiety','hydration'])if(Number.isFinite(memory[key]))this[key]=clamp(memory[key]);let hours=clamp((now-(Number.isFinite(memory.at)?memory.at:now))/3600000,0,8);this.energy=clamp(this.energy+hours*.3)}
}
