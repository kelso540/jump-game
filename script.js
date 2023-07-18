    document.getElementById('root').innerHTML = `<div id="canvasContainer2">
        <div class="logoDiv">
            <h2>ROBOT RUN!</h2>
            <img src="./images/icons8-robot-96.png" alt="robot" id="robotPicA"/>
        </div>
        <canvas id="myCanvas" width="350" height="550"></canvas>
        <div class="logoDiv">
            <img src="./images/icons8-robot-96.png" alt="robot" id="robotPicB" />
            <h2>ROBOT RUN!</h2>
        </div>
    </div>
    <div id="button">
        <a id="startBtn">Click to Start!</a>
        <a id="jumpBtn">Jump</a>
    </div>`; 

    setInterval(()=>{
        document.querySelector('#robotPicA').src = './images/icons8-broken-robot-96.png'; 
        setTimeout(()=>{
            document.querySelector('#robotPicA').src = './images/icons8-robot-96.png';
        }, 500)
    }, 4000)

    setInterval(()=>{
        document.querySelector('#robotPicB').src = './images/icons8-broken-robot-96.png'; 
        setTimeout(()=>{
            document.querySelector('#robotPicB').src = './images/icons8-robot-96.png';
        }, 700)
    }, 6000)

    
    let c = document.getElementById("myCanvas");
    let ctx = c.getContext("2d"); 
    let p = {
        jumpBtn: document.querySelector("#jumpBtn"), 
        ctxWidth: 350, 
        ctxHeight: 550,   
        timer: 0, 
        counter: 0, 
        legs: 0,
        jumpTmrCounter: 0, 
        jmpCounter: 0,
        bkgCounter: 0,
        crateStartX: 1350,
        crateStartY: 480, 
        jumpCntA: 0, 
        jumpCntB: 0,
        jumpCntC: 0,
        upCount: 0, 
        starter: 0, 
        starter2: 0,
        jumpHover: 0,
        hoverCount: 0,
        canvas_ctxWidth: 0, 
        canvas_ctxHeight: 0, 
        playerStart: 180,
        newCrate: {},  
        date: 0,
        hightScore: 0, 
        totalTime: 0, 
        endGameScreen: 0,
        currentScore: 0,
        counterList: [0, 0, 0], 
        crateList: {},
        startInterval: 0, 
        jumper: 0, 
        newTime: 0, 
        gameRunner: 0,  
        gameTimer: 0, 
        gamePlayerAnimation: 0,
        backgroundAnimation: 0,
        screenDate: 0,
        speed: 10,  
    };    

    let spaceManRun1 = new Image();
    spaceManRun1.src = "jumpPictures/spaceManRun1.png";
    let spaceManRun2 = new Image();
    spaceManRun2.src = "jumpPictures/spaceManRun2.png";     
    let spaceManRun3PreJump = new Image();
    spaceManRun3PreJump.src = "jumpPictures/spaceManRun3PreJump.png";
    let runJump = new Image(); 
    runJump.src = "jumpPictures/spaceManRun4Jump.png"; 
    let enemyRobotA1 = new Image(); 
    enemyRobotA1.src = "jumpPictures/enemyRobotA1.png"; 
    let enemyRobotA2 = new Image(); 
    enemyRobotA2.src = "jumpPictures/enemyRobotA2.png"; 
    let enemyRobotB1 = new Image(); 
    enemyRobotB1.src = "jumpPictures/enemyRobotB1.png"; 
    let enemyRobotB2 = new Image(); 
    enemyRobotB2.src = "jumpPictures/enemyRobotB2.png"; 
    let enemyRobotC1 = new Image(); 
    enemyRobotC1.src = "jumpPictures/enemyRobotC1.png"; 
    let enemyRobotC2 = new Image(); 
    enemyRobotC2.src = "jumpPictures/enemyRobotC2.png"; 
    let enemyRobotD1 = new Image(); 
    enemyRobotD1.src = "jumpPictures/enemyRobotD1.png"; 
    let enemyRobotD2 = new Image(); 
    enemyRobotD2.src = "jumpPictures/enemyRobotD2.png"; 
    let robotFail = new Image(); 
    robotFail.src = "jumpPictures/spaceManRunFail.png";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "#ff7f50";



    class Crate {
        constructor(img, width, height, x, y, n, speed) {
            this.img = img;  
            this.width = width; 
            this.height = height; 
            this.x = x; 
            this.y = y; 
            this.n = n;
            this.speed = speed; 
        }     
    }
    class Jumper extends Crate { }

    class Time {
        constructor(){
            this.time = new Date(); 
        }
    }  

    let testHitRectObject = (object1, object2) => { //collision tester 
        return object1.x <= object2.x + object2.width
        && object2.x <= object1.x + object1.width 
        && object1.y <= object2.y + object2.height
        && object2.y <= object1.y + object1.height;
    };

    let createCrate =() => {  //crate spawn control. 
        let ranNumber1_5 =  Math.floor((Math.random() * 150) + 100); 
        let random1_4 =  Math.floor((Math.random() * 4) + 1);
        let objectNumber = Math.floor((Math.random() * 5000) + 1); 
        p.newCrate = new Crate(enemyRobotA1, ranNumber1_5, ranNumber1_5, p.crateStartX, p.crateStartY, objectNumber, p.speed); 
        if(random1_4 === 1){
            p.newCrate.img = enemyRobotA1; 
        }
        if(random1_4 === 2){
            p.newCrate.img = enemyRobotB1; 
        }
        if(random1_4 === 3){
            p.newCrate.img = enemyRobotC1; 
        }
        if(random1_4 === 4){
            p.newCrate.img = enemyRobotD1; 
        }
        p.newCrate.y = p.newCrate.y - p.newCrate.height;
        p.crateList[p.newCrate.n] = p.newCrate; 
    }

    let moveCrate = (set) => {
        ctx.drawImage(set.img, set.x, set.y, set.width, set.height);
        set.x -= set.speed; 
        if(set.x <= -350){
            p.currentScore -= Math.floor(set.x); 
            delete p.crateList[set.n]; //call proper delete object list. 
            createCrate();
        } 
    }

    let time = () => {
        p.counter ++; 
        counterFunction();
    }
    let playerLegMovementSpeed = () => {
        p.legs ++; 
    }
    let backgroundMovementCounter = () => {
        p.bkgCounter ++; 
    }   

    let clearOut = () => {
        clearInterval(p.jumpCntA);
        clearInterval(p.jumpCntB);
        clearInterval(p.jumpCntC);
        clearInterval(p.jumpTmrCounter); 
        jumpDownY();
    }

    let jumpUpY = () => {
        p.jumper.img = runJump;
        p.jumper.y -= 20; //going up! Larger # goes faster. 
        if(p.jumper.y < -300){
            p.starter2 = 0; 
            jumpDown(); 
        }
    }

    let onDown = () => {
        p.jumper.y += 17; //going down! Larger # goes faster. 
        if(p.jumper.y >= p.playerStart){
            p.jumper.img = spaceManRun3PreJump;
            clearInterval(p.jumpCntA);
            clearInterval(p.jumpCntB);
            clearInterval(p.jumpCntC);
            clearInterval(p.jumpTmrCounter); 
            p.jumper.y = p.playerStart;
            p.starter = 0; 
            p.starter2 = 0;   
        }
    }

    let jumpAirHover = () => {
        if(p.hoverCount >= 4){ //sets hover UP time with value. 
            p.hoverCount = -1; 
        } 
        if(p.hoverCount <= -1){
            p.hoverCount --; 
            p.jumper.y += 5; 
            if(p.hoverCount === -4){ //sets hover DOWN time with value. 
                p.hoverCount = 0;
                clearInterval(p.jumpHover); 
                p.jumpCntC = setInterval(onDown, 20); //set interval to control speed down as well.
        }
        } else {
            p.hoverCount ++; 
            p.jumper.y -= 5;
        }
    }

    let jumpDownY = () => {
        p.jumpHover = setInterval(jumpAirHover, 40);  
    }

    let jumpDownYA = () => {
        p.upCount ++; 
        p.jumper.y -= 15;
        if(p.upCount >= 5){ //set to control how high after touch release jumper goes up. 
            p.upCount = 0; 
            clearOut(); 
        }
    }

    let jumpUp = () => {
        if(p.starter === 0){ 
            p.starter ++;      
            p.jumpCntA = setInterval(jumpUpY, 20); //set interval to control speed up as well. 
        }
    }

    let jumpDown = () => {
        if(p.starter2 === 0){
            p.starter2 ++;
            clearInterval(p.jumpCntA);
            p.jumpCntB = setInterval(jumpDownYA, 20); //set interval to control speed down as well. 
        }  
    }

    let move = (set) => {
        ctx.drawImage(set.img, set.x, set.y, set.width, set.height);
        if(p.legs === 0){
            set.img = spaceManRun1;
            set.height = 150;
        }
        if(p.legs === 0 && p.newCrate.img === enemyRobotA1){
            p.newCrate.img = enemyRobotA2; 
        }
        if(p.legs === 0 && p.newCrate.img === enemyRobotB1){
            p.newCrate.img = enemyRobotB2; 
        }
        if(p.legs === 0 && p.newCrate.img === enemyRobotC1){
            p.newCrate.img = enemyRobotC2; 
        }
        if(p.legs === 0 && p.newCrate.img === enemyRobotD1){
            p.newCrate.img = enemyRobotD2; 
        }
        if(p.legs === 1){
            set.img = spaceManRun2; 
            set.height = 152; //sets player bounce while running.
        }
        if(p.legs === 1 && p.newCrate.img === enemyRobotA2){
            p.newCrate.img = enemyRobotA1; 
        }
        if(p.legs === 1 && p.newCrate.img === enemyRobotB2){
            p.newCrate.img = enemyRobotB1; 
        }
        if(p.legs === 1 && p.newCrate.img === enemyRobotC2){
            p.newCrate.img = enemyRobotC1; 
        }
        if(p.legs === 1 && p.newCrate.img === enemyRobotD2){
            p.newCrate.img = enemyRobotD1; 
        }
        if(p.legs >= 2){
            p.legs = 0; 
        }
    }       

    let moveBackground = () => {
        if(p.bkgCounter === 0){
            c.style.backgroundPosition = "0px -600px";
        }
        if(p.bkgCounter === 1){
            c.style.backgroundPosition = "-50px -600px";
        }
        if(p.bkgCounter === 2){
            c.style.backgroundPosition = "-100px -600px";
        }
        if(p.bkgCounter === 3){
            c.style.backgroundPosition = "-150px -600px";
        }
        if(p.bkgCounter === 4){
            c.style.backgroundPosition = "-200px -600px";
        }
        if(p.bkgCounter === 5){
            c.style.backgroundPosition = "-250px -600px";
        }
        if(p.bkgCounter === 6){
            c.style.backgroundPosition = "-300px -600px";
        }
        if(p.bkgCounter === 7){
            c.style.backgroundPosition = "-350px -600px";
        }
        if(p.bkgCounter === 8){
            c.style.backgroundPosition = "-400px -600px";
        }
        if(p.bkgCounter === 9){
            c.style.backgroundPosition = "-450px -600px";
        }
        if(p.bkgCounter === 10){
            c.style.backgroundPosition = "-500px -600px";
        }
        if(p.bkgCounter === 11){
            c.style.backgroundPosition = "-550px -600px";
        }
        if(p.bkgCounter === 12){
            c.style.backgroundPosition = "-600px -600px";
        }
        if(p.bkgCounter === 13){
            p.bkgCounter = 0; 
        }
    }

    let counterFunction = () => {
        p.counterList[2] = p.counter; 
        if(p.counter >= 9){
            p.counter = -1;
        }
        if(p.counter === 0){
            p.counterList[1]++; 
        }
        if(p.counterList[1] === 6){
            p.counterList[0]++;
            p.counterList[1] = 0; 
        }
    }


    let run = () => {   // main game loop.  
        p.timer ++; 
        ctx.clearRect(0, 0, p.ctxWidth, p.ctxHeight);
        move(p.jumper);
        moveBackground(); 
        ctx.font = "small-caps bold 20px Trebuchet MS";
        ctx.fillStyle = "#ff7f50";
        ctx.textAlign = "center";
        ctx.fillText("Score: " + p.currentScore, 600, 100);
        ctx.fillText("Total time: " + p.counterList[0] + "." + p.counterList[1] + p.counterList[2], 850, 100); 
        ctx.font = "small-caps bold 20px Trebuchet MS";
        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.fillText(p.screenDate, 50, 47);
        ctx.fillText("Highest Score: " + p.hightScore, 50, 72); 
        ctx.fillText("Longest Time: " + p.totalTime, 50, 97); 
        let playerContact = testHitRectObject(p.jumper, p.newCrate);
        console.log(p.timer); 
        if(playerContact){
            gameEndingPause();  
        }
        if(p.timer > 500){
            p.speed = 20; 
        }
        if(p.timer > 1000){
            p.speed = 25; 
        }
        if(p.timer > 1500){
            p.speed = 30; 
        }
        if(p.timer > 2000){
            p.speed = 35; 
        }
        for(let i in p.crateList){
            moveCrate(p.crateList[i]);
        }
    }

    let endScreen = () => {
        ctx.clearRect(0, 0, p.ctxWidth, p.ctxHeight);
        ctx.font = "small-caps bold 22px Trebuchet MS";
        ctx.fillStyle = "#ff7f50";
        ctx.textAlign = "center";
        ctx.fillText("Time: " + p.counterList[0] + "." + p.counterList[1] + p.counterList[2], 90, 540);
        ctx.fillText("Score: " + p.currentScore, 255, 540); 
        ctx.font = "small-caps bold 20px Trebuchet MS";
        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.fillText(p.screenDate, 50, 47);
        ctx.fillText("Highest Score: " + p.hightScore, 50, 72); 
        ctx.fillText("Longest Time: " + p.totalTime, 50, 97);
        ctx.drawImage(p.jumper.img, p.jumper.x, p.jumper.y, p.jumper.width, p.jumper.height); 
        ctx.drawImage(p.newCrate.img, p.newCrate.x, p.newCrate.y, p.newCrate.width, p.newCrate.height);
    }

    let returnJumpToButtons = () => {
        p.jumpBtn.addEventListener("touchstart", jumpUp); 
        p.jumpBtn.addEventListener("touchend", jumpDown); 
        p.jumpBtn.addEventListener("mousedown", jumpUp); 
        p.jumpBtn.addEventListener("mouseup", jumpDown); 
    }
    let removeJumpToButtons = () => {
        p.jumpBtn.removeEventListener("touchstart", jumpUp); 
        p.jumpBtn.removeEventListener("touchend", jumpDown); 
        p.jumpBtn.removeEventListener("mousedown", jumpUp); 
        p.jumpBtn.removeEventListener("mouseup", jumpDown); 
    }

    let reset = () => {
        clearInterval(p.endGameScreen);
        clearInterval(p.startInterval);
        clearInterval(p.gameRunner);
        clearInterval(p.gameTimer);
        clearInterval(p.gamePlayerAnimation);
        clearInterval(p.backgroundAnimation);
        clearInterval(p.jumpCntA);
        clearInterval(p.jumpCntB);
        clearInterval(p.jumpCntC);
        clearInterval(p.jumpHover);
        clearInterval(p.jumpTmrCounter);
        p.jumpBtn = document.querySelector("#jumpBtn");   
        p.ctxWidth = 350; 
        p.ctxHeight = 550; 
        p.timer = 0; 
        p.counter = 0; 
        p.legs = 0;
        p.jumpTmrCounter; 
        p.jmpCounter = 0;
        p.bkgCounter = 0;
        p.crateStartX = 1350; 
        p.jumpCntA; 
        p.jumpCntB;
        p.jumpCntC;
        p.upCount = 0; 
        p.starter = 0; 
        p.starter2 = 0;
        p.jumpHover;
        p.hoverCount = 0;
        p.canvas_ctxWidth = 0; 
        p.canvas_ctxHeight = 0; 
        p.playerStart = 310;
        p.newCrate = {};  
        p.date = 0;  
        p.endGameScreen = 0;
        p.currentScore = 0;
        p.counterList = [0, 0, 0]; 
        p.crateList = {};
        p.startInterval = 0; 
        p.jumper = 0; 
        p.newTime = 0; 
        p.gameRunner = 0;  
        p.gameTimer = 0; 
        p.gamePlayerAnimation = 0;
        p.backgroundAnimation = 0;
        p.speed = 18;  
        p.jumper = new Jumper(spaceManRun1, 40, 130, 40, p.playerStart, 0, 0);
        p.date = new Time();
        p.newTime = p.date.time.toString().split(" "); 
        p.screenDate = p.newTime[0] + ", " + p.newTime[1] + " " + p.newTime[2];    
        p.gameRunner = setInterval(run, 40); 
        p.gameTimer = setInterval(time, 1000); 
        p.gamePlayerAnimation = setInterval(playerLegMovementSpeed, 300);
        p.backgroundAnimation = setInterval(backgroundMovementCounter, 90);
        document.getElementById("startBtn").style.display = "none";
        document.getElementById("jumpBtn").style.display = "inline";
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "#ff7f50"; 
        returnJumpToButtons(); 
        createCrate(); 
    }

    let firstStart = () => {
        c.style.backgroundPosition = "0px -600px";
        ctx.clearRect(0, 0, p.ctxWidth, p.ctxHeight);
        ctx.font = "small-caps bold 30px Trebuchet MS";
        ctx.fillStyle = "#ff7f30";
        ctx.textAlign = "center";
        ctx.fillText("Escape the Robots!", 180, 100);
        ctx.fillText("Tap the Jump button", 180, 150);
        ctx.fillText("to jump!", 180, 200);
        ctx.fillText("How long can you last?", 180, 250); 
        ctx.font = "small-caps bold 20px Trebuchet MS";
    }

    let starterScreen = () => {
        p.startInterval = setInterval(firstStart, 40); 
    }

    let gameEndingPause = () => {
        clearInterval(p.endGameScreen);
        clearInterval(p.startInterval);
        clearInterval(p.gameRunner);
        clearInterval(p.gameTimer);
        clearInterval(p.gamePlayerAnimation);
        clearInterval(p.backgroundAnimation);
        clearInterval(p.jumpCntA);
        clearInterval(p.jumpCntB);
        clearInterval(p.jumpCntC);
        clearInterval(p.jumpHover);
        clearInterval(p.jumpTmrCounter);
        let newTotalTime = p.counterList[0] + "." + p.counterList[1] + p.counterList[2];
        if(newTotalTime > p.totalTime){
        p.totalTime = p.counterList[0] + "." + p.counterList[1] + p.counterList[2];
        }
        if(p.currentScore > p.hightScore){
        p.hightScore = p.currentScore;
        }
        p.jumper.img = robotFail; 
        removeJumpToButtons(); 
        document.getElementById("startBtn").style.display = "inline";
        document.getElementById("jumpBtn").style.display = "none"; 
        p.endGameScreen = setInterval(endScreen, 40);
    }

    // let resizeCanvas = () => { //resize canvas to page size(increase pixel COUNT). 
    //     p.canvas_ctxWidth = window.innerWidth -100;
    //     p.canvas_ctxHeight = window.innerHeight -100;
    //     // c.width = p.ctxWidth;
    //     // c.height = p.ctxHeight;
    //     c.style.width = ' ' + p.canvas_ctxWidth + 'px'; 
    //     c.style.height  = ' ' + p.canvas_ctxHeight + 'px';
    // };
    // window.addEventListener("resize", resizeCanvas); 
    // resizeCanvas();

    document.getElementById("startBtn").addEventListener("click", reset);

    starterScreen();