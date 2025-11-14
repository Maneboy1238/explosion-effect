const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const particlesArray = [];
let hue = 0;
function resize() {
   window.addEventListener('resize', ()=> {
      canvas.width = innerWidth;
      canvas.height= innerHeight;
   }) 
}
canvas.width = innerWidth;
canvas.height = innerHeight;
resize();
const mouse = {
    x: undefined,
    y: undefined
}
addEventListener('resize', ()=> {
   canvas.width = innerWidth;
   canvas.height = innerHeight;
   mouse.x = undefined;
   mouse.y = undefined;
   particlesArray.length = 0;
})
 canvas.addEventListener('mousemove', (e)=> {
  //  console.log(e);
    //const rect = canvas.getBoundingClientRect();
    //mouse.x = e.clientX - rect.left;
    //mouse.y = e.clientY - rect.top;
 })
 class particle  {
   constructor() {
      this.x = mouse.x;
      this.y = mouse.y;
      /*this.x = Math.random() * canvas.width;*/
      /*this.y = Math.random() * canvas.height*/
      this.size = Math.random() * 15 + 1;
      this.speedx = Math.random() * 3-1.5
      this.speedy = Math.random() * 3-1.5
      this.color = `hsl(${hue}, 100%, 50%)`;
   }
   update() {
      this.x += this.speedx;
      this.y += this.speedy;
      if (this.size > 0.2) {
      this.size -= 0.1;
      }
   }
   drawCircle() {
      ctx.beginPath();
      ctx.fillStyle = this.color
      ctx.arc(this.x, this.y,5,0,Math.PI*2);
      ctx.fill();
      
   }
 }
 canvas.addEventListener('mousemove', (e)=> {
   const rect = canvas.getBoundingClientRect();
   mouse.x = e.x - rect.left;
   mouse.y = e.y - rect.top;
   for(i=0; i<10; i++) {
      particlesArray.push(new particle());
   }
 })

 canvas.addEventListener('touchmove', (e)=> {
   const rect = canvas.getBoundingClientRect();
   mouse.x = e.touches[0].clientX - rect.left;
   mouse.y = e.touches[0].clientY - rect.top;
   for(i=0; i<10; i++) {
      particlesArray.push(new particle());
   }
 })
 function handlesParticles() {
 for (i=0; i < particlesArray.length; i++) {
   particlesArray[i].drawCircle();
   particlesArray[i].update();
   if (particlesArray[i].size <= 0.3) {
      particlesArray.splice(i, 1);
      i--
   }
}
 }
 function animate() {
    //ctx.clearRect(0,0,canvas.width,canvas.height);
    hue+=5;
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(0,0,canvas.width, canvas.height);

ctx.fillStyle = 'white'
ctx.font = '15px sans-serif';
ctx.fillText('Move your finger or cursor on the page', canvas.width/4, canvas.height/4)
    handlesParticles();
    requestAnimationFrame(animate);
 }
 animate();
 function generateRandomNumber(min, max) {
let result = Math.floor(Math.random() * max-min+1)+ min;
return result;
 }