let canvas = document.querySelector('canvas');
let ctx=canvas.getContext('2d');
let particleArray=[];
let numberOfParticle=1000
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
let connectSpace=40;
let hue=0;
if(canvas.width<750){
  numberOfParticle=750
  connectSpace=30
}
if(canvas.width<500){
  numberOfParticle=500
  connectSpace=20
}
if(canvas.width<350){
  numberOfParticle=300
  connectSpace=20
}
window.addEventListener('resize',()=>{
  cancelAnimationFrame(animate)
 canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
numberOfParticle=1000;
connectSpace=40
if(canvas.width<750){
  numberOfParticle=750
  connectSpace=30
}
if(canvas.width<500){
  numberOfParticle=500
  connectSpace=20
}
if(canvas.width<350){
  numberOfParticle=300
  connectSpace=20
}
particleArray=[]
hue=0;
init();
animate();
})
let mouse={
 x:null,
 y:null,
 raduis:120
}

ctx.fillStyle='white';
ctx.font ='30px serif';
ctx.fillText('404',0,23);
const textCoor = ctx.getImageData(0,0,100,100);

class Particle{
 constructor(x,y){
  this.x=x;
  this.y=y;
  this.baseX=this.x;
  this.baseY=this.y
  this.size=4;
   this.baseColor= `hsl(5,${hue-10}%,${hue+10}%)`
  this.color=this.baseColor
  this.strokeColor =this.baseColor
  this.destinty= Math.random()*45 +5
  
 }
 update(){
  
   let dx = mouse.x -this.x;
   let dy = mouse.y -this.y;
   let distance = Math.sqrt(dx*dx+dy*dy)
   let forceDirectionX =(dx/distance);
   let forceDirectionY =(dy/distance);
   let maxDistance = mouse.raduis
   let forse = (maxDistance - distance)/maxDistance;
   let directionX=forceDirectionX*forse*this.destinty
   let directionY=forceDirectionY*forse*this.destinty
   if(distance < maxDistance){
    this.x -= directionX
     this.y -=directionY
    this.strokeColor='red';
    //  this.color='yellow'
   }
   
   else{
    if(this.x !== this.baseX){
     let dx = this.x - this.baseX;
     this.x -=dx/10
    this.strokeColor=this.baseColor
    this.color=this.baseColor
     // this.x=this.baseX
     // this.y=this.baseY
    }
    if(this.y !== this.baseY){
     let dy = this.y - this.baseY;
     this.y -=dy/10
     // this.x=this.baseX
     // this.y=this.baseY
    }
   } 
 }
 draw(){
  
  ctx.fillStyle=this.color;
  ctx.beginPath();
  ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
  ctx.fill();
 }
}
function init(){
 console.log(textCoor);
 for(let y=0, y2=textCoor.height; y<y2;y++){
  
  for(let x=0, x2=textCoor.width; x<x2;x++){
    
   if(textCoor.data[(y*4*textCoor.width)+(x*4)+3]>128){
    let positionX=x+9;
    let positionY=y; 
    
    particleArray.push(new Particle(positionX*canvas.width/60,canvas.width >= 500?positionY*20:positionY*17));
   }
  }
  hue+=2
  // let x =Math.random()*canvas.width;
  // let y =Math.random()*canvas.height;
  // particleArray.push(new Particle(x,y));
  // particleArray[i].draw()
 }
}
init();
window.addEventListener('mousemove',(e)=>{
   mouse.x=e.x;
   mouse.y=e.y;
  
})
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height)
  
 for(let i=0;i<particleArray.length;i++){
  particleArray[i].draw();
  particleArray[i].update()
 }
 connect();
 
 requestAnimationFrame(animate)
}
animate();
function connect(){
 for(let i=0 ;i<particleArray.length;i++){
  for(let j=i; j<particleArray.length;j++){
   let dx = particleArray[i].x- particleArray[j].x 
   let dy = particleArray[i].y- particleArray[j].y
   let distance = Math.sqrt(dx*dx+dy*dy)
   if(distance<connectSpace){
   
    ctx.beginPath();
    ctx.strokeStyle=particleArray[i].strokeColor
    ctx.moveTo(particleArray[i].x,particleArray[i].y);
    ctx.lineTo(particleArray[j].x,particleArray[j].y);
    ctx.stroke()
    
   }
   if(distance<connectSpace){
    ctx.beginPath();
    ctx.strokeStyle=particleArray[i].strokeColor
    ctx.moveTo(particleArray[i].x,particleArray[i].y);
    ctx.lineTo(particleArray[j].x,particleArray[i].y);
    ctx.stroke()
   }
  }
 }
}