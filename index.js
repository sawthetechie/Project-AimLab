const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const con = canvas.getContext("2d");

let gunShot = document.getElementById("gunSound");
gunShot.muted = true;

let startingMsg = ()=>{
    alert("Press OK to start playing.")
}


let timer = 0;
let score = 0;
let circleX = Math.floor(Math.random()*(canvas.width-60-180)+180);
let circleY = Math.floor(Math.random()*(canvas.height-60-180)+180);
let radius = Math.floor(Math.random()*(25-5)+5);


con.beginPath();
con.moveTo(0,125); 
con.lineTo(canvas.width,125); 
con.strokeStyle = "red";
con.stroke();

function createTarget(circleX,circleY){
    con.beginPath();
    con.arc(circleX,circleY,radius,0,2*Math.PI,false);
    con.strokeStyle= `rgb(30,129,176)`;
    con.stroke();
    con.fillStyle = `rgb(30,129,176)`;
    con.fill();
}

let writeScore = ()=>{
    con.clearRect(canvas.width/2 ,0,canvas.width,120);
    con.fillStyle = "black";
    con.font = "bold 24px sans-serif";
    con.textAlign ="right";
    con.textBaseline = "top";
    con.fillText(`Score: ${score}`,canvas.width - 24, 0 + 24);
}
writeScore();

let timing = ()=>{
    con.clearRect(0 ,0,canvas.width/2,120);
    con.fillStyle = "black";
    con.font = "bold 24px sans-serif";
    con.textAlign ="left";
    con.textBaseline = "top";
    con.fillText(`Time: ${timer}`, 24, 0 + 24);
    setTimeout(()=>{
        timer++;
        timing();
    },1000)
}
timing();

let check = (circleX,circleY,clickX,clickY)=>{
    if(clickX >= circleX-radius && clickX <= circleX+radius && clickY >= circleY-radius && clickY <= circleY+radius){
        score++;
        writeScore();
        gunShot.muted = false;
        setTimeout(()=>{
            gunShot.muted = true;
        },500)
    }
}

window.addEventListener("click",(event)=>{
    let clickX = event.clientX;
    let clickY = event.clientY;
    check(circleX,circleY,clickX,clickY);
    
})

function generator(){
    circleX = Math.floor(Math.random()*(canvas.width-60-180)+180);
    circleY = Math.floor(Math.random()*(canvas.height-60-180)+180);
    radius = Math.floor(Math.random()*(25-5)+5);
}
let genInterval = setInterval(generator,1000);

function endgame(){
    con.clearRect(0,0,canvas.width,canvas.height);
    con.fillStyle = "black";
    con.font = "bold 54px sans-serif";
    con.textAlign ="center";
    con.textBaseline = "middle";
    con.fillText(`Your Total Score is ${score}`, canvas.width/2, canvas.height/2);
}

function anim(){
    requestAnimationFrame(anim);
    con.clearRect(0,130,canvas.width, canvas.height);
    createTarget(circleX, circleY);
    if(timer>=60){
        clearInterval(genInterval);
        endgame();
    }
}
anim();