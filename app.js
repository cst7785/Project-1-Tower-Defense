class View {
    constructor(){
        this.newGameButton = document.querySelector(".new-game-button");
        this.aboutGameButton = document.querySelector(".about-game-button");
        this.pauseGameButton = document.querySelector(".pause-game-button");
        this.circleTowerButton = document.querySelector(".circle-tower-button");
        this.circleTowerInfoButton = document.querySelector(".circle-tower-info-button");
        // this.scoreBoard = document.querySelector(".game-menu-scoreboard");
        this.waveNumberField = document.querySelector(".wave-number-field");
        this.livesRemainingField = document.querySelector(".lives-remaining-field");
        this.currencyField = document.querySelector(".currency-field");
        this.gameBoard = document.querySelector(".game-board");
        console.log(this.gameBoard.children)
        console.log(this.gameBoard.children.length)
 
        console.log(this.gameBoard);
        console.log(this.gameBoard.children)//.forEach(element => console.log(element)))
        this.newGameButtonHandlers = [
            this.newGameButton.addEventListener('click', ()=>{appController.eventList.push("new-game-clicked")}), 
            this.newGameButton.addEventListener('mouseover', ()=>{appController.eventList.push("new-game-hover")})
        ];
        this.aboutGameButtonHandlers = [
            this.aboutGameButton.addEventListener('click', ()=>{appController.eventList.push("about-game-clicked")}), 
            this.aboutGameButton.addEventListener('mouseover', ()=>{appController.eventList.push("about-game-hover")})
        ];
        this.pauseButtonHandlers = [
            this.pauseGameButton.addEventListener('click', ()=>{appController.eventList.push("pause-game-clicked")}), 
            this.pauseGameButton.addEventListener('mouseover', ()=>{appController.eventList.push("pause-game-hover")})
        ];
        this.circleTowerButtonHandlers = [
            this.circleTowerButton.addEventListener('click', ()=>{appController.eventList.push("circle-tower-clicked")}), 
            this.circleTowerButton.addEventListener('mouseover', ()=>{appController.eventList.push("circle-tower-hover")})
        ];
        this.circleTowerInfoButtonHandlers = [
            this.circleTowerInfoButton.addEventListener('click', ()=>{appController.eventList.push("circle-tower-info-clicked")}), 
            this.circleTowerInfoButton.addEventListener('mouseover', ()=>{appController.eventList.push("circle-tower-info-hover")})
        ]
        this.windowEventHandlers = [
            window.onresize = this.updateSizes
        ];
        this.activeUnits = [];
        this.toRender = [];
    }
    reset() {
        length = this.gameBoard.children.length;
        for (let i = 0; i < length; i++) {
            // console.log(`Run ${1+i}`)
            this.gameBoard.children[0].remove();
        }
        this.activeUnits = [];
        this.toRender = [];
    }
    //uses an update keyword
    viewMainLoop(){
        // console.log("view main loop");
        for (let i = 0; i < this.toRender.length; i++) {
            this.render(this.toRender[i]);
        }
    };
    clickNewGame() {
        appController.eventList.push("new-game-clicked");
        // console.log("Clicked new game")
    }
    updateScoreBoard(type, [wave, unitsOrTime, lives]) {
        // console.log("Updating Scoreboard");
        let waveNumberFieldString;
        switch (type) {
            case "units":
                waveNumberFieldString = `Wave: ${wave} Units: ${unitsOrTime}`;
                break;
            case "timer":
                waveNumberFieldString = `Wave: ${wave} Timer: ${unitsOrTime}`;
                break;
        }
        const livesRemainingString = `Lives remaining: ${lives}`;
        this.waveNumberField.innerText = waveNumberFieldString;
        this.livesRemainingField.innerText = livesRemainingString;
    }
    updateCurrency(amount) {
        const currencyFieldString = `Currency: ${amount}`
        this.currencyField.innerText = currencyFieldString;
    }
    updateNewUnit(obj) {
        this.gameBoard.append(obj.domHandle);
        // console.log(obj.domHandle);
        this.activeUnits.push(obj);
        this.toRender.push(obj);
    }
    updatePosition(obj) {
        //handle must be a document query selector
        // console.log(obj)
        const xCoord = obj.motion.coords[0];
        const yCoord = obj.motion.coords[1];
        // console.log(`X coord: ${xCoord} Y coord: ${yCoord}`);
        // console.log(`The dom handle is:${obj.domHandle}`);
        obj.domHandle.style.left = `${xCoord}px`;
        obj.domHandle.style.top = `${yCoord}px`;
    }
    render(obj) {
        // console.log("Render called")
        this.updatePosition(obj);
    }
    updateSizes() {
        for (let i = 0; i < appView.activeUnits.length; i++) {
            appView.activeUnits[i].resize();
        }
    }
}
class Controller {
    constructor() {
        const states = [
            "pre-game-root", 
            "about-game-clicked", 
            "pause-button-clicked", 
            "circle-tower-clicked", 
            "circle-tower-info-clicked",
            "pre-wave",
            "wave",
            "game-over"];
        this.state="pre-game-root";
        this.eventList = [];
        this.timeOuts = [];
    };
    controllerMainLoop() {
        this.processEvents();
    };
    setState(stateString) {
        this.eventList.push(stateString);
    }
    processEvents() {
        for (let i = 0; i < this.eventList.length; i++) {
            console.log(this.eventList);
            switch(this.eventList.shift()) {
                //Button Interactions
                case "new-game-clicked":
                    console.log("New Game Button Clicked");
                    this.setNewGameState();
                    break;
                case "new-game-hover":
                    // console.log("New Game Button Hovered");
                    break;
                case "about-game-clicked":
                    console.log("About Game Button Clicked");
                    break;
                case "about-game-hover":
                    // console.log("About Game Button Hovered");
                    break;
                case "pause-game-clicked":
                    console.log("Pause Game Button Clicked");
                    break;
                case "pause-game-hover":
                    // console.log("Pause Game Button Hovered");
                    break;
                case "circle-tower-clicked":
                    console.log("Circle Tower Button Clicked");
                    break;
                case "circle-tower-hover":
                    // console.log("Circle Tower Button Hovered");
                    break;
                case "circle-tower-info-clicked":
                    console.log("Circle Tower Info Button Clicked");
                    break;
                case "circle-tower-info-hover":
                    // console.log("Circle Tower Info Button Hovered");
                    break;
                //State Changes
                case "pre-wave":
                    console.log(`Changing state to pre-wave`);
                    this.setPreWaveState();
                    break;
                case "wave":
                    console.log(`Changing state to wave`);
                    this.setWaveState();
                    break;
            console.log(this.eventList);
            }
        }   
    }
    reset() {
        console.log(this.timeOuts)
        let length = this.timeOuts.length;
        for (let i = 0; i < length; i++) {
            clearTimeout(this.timeOuts[i]);
        }
    }
    //uses a set keyword
    setNewGameState() {
        console.log("Starting new game")
        //clear data model and view
        appController.reset();
        appView.reset();
        appData.reset();
        this.setScoreBoard();
        this.setCurrency();
        this.setState("pre-wave");
    }
    setPreWaveState() {
        this.state = "pre-wave";
        this.setScoreBoard();
        this.setCurrency(appData.addIncome); 
        this.setTimer("start");
    }
    setWaveState() {
        this.state = "wave";
        this.setScoreBoard();
        let timeOut = 0;
        for (let i = 0; i < appData.units; i++) {
            let generator = setTimeout(this.setNewUnit, timeOut);
            // console.log(`The timeout ID is ${generator}`);
            this.timeOuts.push(generator);
            timeOut += 2000;
        }
        let generator = setTimeout(console.log(appView.activeUnits), timeOut);
    }
    setScoreBoard() {
        //has shape wave unit lives timer
        const scoreBoardData = appData.getScoreBoardData();
        let formattedData;
        switch (this.state) {
            case "pre-game-root":
                //TODO figure out how to remove duplication here
                //wave timer lives
                formattedData = [scoreBoardData[0], scoreBoardData[3], scoreBoardData[2]]
                return appView.updateScoreBoard("timer", formattedData);
                break;
            case "pre-wave":
                //wave timer lives
                formattedData = [scoreBoardData[0], scoreBoardData[3], scoreBoardData[2]]
                return appView.updateScoreBoard("timer", formattedData);
                break;
            case "wave":
                //wave unit lives
                formattedData = [scoreBoardData[0], scoreBoardData[1], scoreBoardData[2]]
                return appView.updateScoreBoard("units", formattedData);
                break;
        }
    }
    setCurrency(currencyChange=0) {
        const currencyData = appData.getCurrency(currencyChange);
        appView.updateCurrency(currencyData);
    }
    setTimer(startStopUpdate){    
        switch (startStopUpdate) {
            case "start": 
                // console.log("Setting the timer...");
                appData.getTimer("start");
                break;
            case "update":
                // console.log("Updating the timer...");
                appView.updateTimer();
            case "stop":
                // console.log("Stopping the timer");
                this.setState("wave")
        }
        appData.getTimer();
    }
    setNewUnit() {
        //create the units data
        appView.updateNewUnit(appData.getNewUnit());
        // console.log("New unit created");
    }
}
class Data {
    constructor() {
        this.wave = 1;
        this.units = 3;
        this.lives = 30;
        this.timer = 2;
        this.timerActive = false;
        this.timerInterval = setInterval(() => {
            // console.log(this.timerActive);
            if (this.timerActive) {
                if (this.timer === 0) {
                    this.timerActive = false;
                    // console.log("this.time = 0")
                    this.getTimer("stop");
                } else {
                    this.getTimer("update");
                    this.timer--;
                    // console.log(this.timer);
                }
            } else {
                // console.log("Timer not active")
            }
        }, 1000);
        this.currency = 100;
        this.addIncome = 50;
        this.playerUnits = [];
        this.enemyUnits = [];
    }
    reset() {
        this.wave = 1;
        this.units = 3;
        this.lives = 30;
        this.timer = 2;
        this.timerActive = false;
        this.currency = 100;
        this.addIncome = 50;
        this.playerUnits = [];
        this.enemyUnits = [];
    }
    //uses a get keyword
    dataMainLoop(){
        // console.log('Data main loop')
        this.getNewEnemyPositions();  
    };
    getScoreBoardData() {
        // console.log("Getting data...")
        const scoreBoardData = [this.wave, this.units, this.lives, this.timer];
        return scoreBoardData; 
    }
    getCurrency(currencyChange = 0) {
        this.currency += currencyChange;
        return this.currency;
    }
    getTimer(startStopUpdate) {
        switch (startStopUpdate) {
            case "start":
                this.timer = 3;
                this.timerActive = true;
                break;
            case "stop":
                this.timerActive = false;
                appController.setTimer("stop");
            case "update":
                appController.setScoreBoard();
            case "default":
                break;
        }
        return this.timer;
    }
    getNewUnit() {
        const newUnit = new Unit (this.wave, this.enemyUnits.length + 1);
        this.enemyUnits.push(newUnit);
        return newUnit;
    }
    getNewEnemyPositions(){
        for (let i = 0; i < this.enemyUnits.length; i++) {
            const unitObj = this.enemyUnits[i];
            // console.log("Calculating new positions...")
            unitObj.motion.calculateNewPosition();               
            if (this.enemyUnits[i].motion.coords[1] >= appData.getBoardDimensions()[1]) {
                console.log("This section runs.")
                this.enemyUnits.shift();
                this.getLives(-1);         
        }
    }
}
    getBoardDimensions() {
        const gameBoardWidth = appView.gameBoard.offsetWidth;
        const gameBoardHeight = appView.gameBoard.offsetHeight;
        return [gameBoardWidth, gameBoardHeight]
    }
    getLives(change=0) {
        if (change != 0) {
            this.lives += change;
            appController.setScoreBoard("lives", this.getScoreBoardData());
        }
        return this.lives;
    }
}
class Motion {
    constructor(offset) {
        this.boardDimensions = appData.getBoardDimensions();
        //TODO change the initial coords to be in constructor
        this.coords= [offset[0] + (this.boardDimensions[0] / 2), offset[1]+(this.boardDimensions[1] * -0.1)]; //vector
        this.speed = this.boardDimensions[1] * .009  ; //magnitude
        this.direction = [0, 1]; //unit vector
    }
    calculateNewPosition() {
        //new position = current position + speed
        let deltas = [(this.speed*this.direction[0]),(this.speed*this.direction[1])];
        // console.log(deltas)
        this.coords = [this.coords[0]+deltas[0],this.coords[1]+deltas[1]];
        // console.log(this.coords);
    }
}
class Unit {
    constructor(waveNumber, unitNumber) {
        this.name = `wave${waveNumber}-unit${unitNumber}`;
        this.health = 100;
        this.size = [0.05 * appView.gameBoard.offsetWidth, 0.1 * appView.gameBoard.offsetHeight]; // percentage of game board
        this.originOffset = [-0.5*this.size[0], -0.5*this.size[1]]; 
        this.style();
        this.motion = new Motion(this.originOffset);
    }
    style() {
        this.domHandle = document.createElement("div");
        this.domHandle.classList.add(`${this.name}`);
        this.domHandle.style.width = `${this.size[0]}px`;
        this.domHandle.style.height = `${this.size[1]}px`;
        this.domHandle.style.position = "absolute";
        this.domHandle.style.backgroundColor = "blue";
        this.domHandle.style.borderRadius = "50%";
        this.domHandle.style.left = `${appData.getBoardDimensions()[1]/2}px`;
        this.domHandle.style.top = `${appData.getBoardDimensions()[1] * -0.1}px`;
        // this.domHandle.style.boxShadow = `0 -5px 5px blue`
    }
    resize() {
        // console.log("Resizing...")
        let oldBoardDimensions = this.motion.boardDimensions;
        this.motion.boardDimensions = appData.getBoardDimensions();
        this.size = [0.05 * appView.gameBoard.offsetWidth, 0.1 * appView.gameBoard.offsetHeight]; // percentage of game board
        this.motion.coords= [this.motion.boardDimensions[0]*this.motion.coords[0]/oldBoardDimensions[0], this.motion.boardDimensions[1]*this.motion.coords[1]/oldBoardDimensions[1]]; //vector
        this.motion.speed = appView.gameBoard.offsetHeight * .009  ;
        this.domHandle.style.width = `${this.size[0]}px`;
        this.domHandle.style.height = `${this.size[1]}px`;
    }
}
class Tower {
    constructor() {
    }
}





//temporary functions for development
function setTerrain() {
    const pathTiles = [4,5,14,15,24,25,34,35,44,45,54,55,64,65,74,75,84,85,94,95];
    const stoneTiles = [90,91,92,93,96,97,98,99];
    const underLayElements = document.querySelector(".game-board-underlay").children;
    for (let i = 0; i < 100; i++) {
        if (pathTiles.includes(i)) {
            underLayElements[i].classList.toggle("path");
        }
        else if (stoneTiles.includes(i)) {
            underLayElements[i].classList.toggle("stone");
        } else {
            underLayElements[i].classList.toggle("grass");
        }
    }
}
setTerrain();

function moveDown() {
    const unit1 = document.querySelector(".board-element");
    currentPosition = unit1.offsetTop;
    // console.log(currentPosition);
    speed = 1;
    nextPosition = currentPosition + speed;
    // console.log(nextPosition)
    unit1.style.top = `${nextPosition}px`;       
}
// const test = setInterval(moveDown, 50);

//TODOs
//pseudocoding
function init(){};
function render(){};

// const loop = setInterval(moveDown, 50);

//create a wave class/object that creates a specified number of unit objects with the specified parameters
//How to easily change properties of the unit such as health, armor, speed in between waves?



// goal is to have a game loop on interval
// create a game loop of self sufficient classes, each class has its own "loop" function
function mainLoop(){
    appController.controllerMainLoop();
    appData.dataMainLoop();
    appView.viewMainLoop();
};
let activeGame = true;
const appView = new View();
const appController = new Controller();
const appData = new Data();
const loop = setInterval(mainLoop, 100); //tune the time value



// console.log(currentWave);
// console.log(appView.activeUnits);

//how does the user get from pressing New game to having the first enemy appear onscreen?
//init function runs when webpage loads
//created event listeners for each clickable object 
//user clicks on new game
//a timer starts and is displayed on screen, wave 1 appears, remaining lives appears, starting currency appears
//a user can then click on towers within the tower menu 
//

//stretch goal -- save game / load game;

//******States****** 
//***Pregame***
    //**PreGame Root Menu
        //Hover over New Game -> Start a new game! Cursor pointer
        //Hover over Pause -> nothing
        //Hover over About Game -> Learn about the game! Cursor Pointer
        //Hover over tower -> Basic Tower Description, Cursor Pointer
    //**About Game
        //Tower Menu changes to About Game text;
        //Exit Menu button appears, cursor pointer, clicking on it changes state to Pregame Root Menu;
        //Stretch goal -> visual display of how to play the game, animated cursor clicks tower menu button, places tower, attacks creeps, loses life, upgrades tower
    //**Click on Tower Info
        //Tower Menu changes to About Tower text;
        //Exit menu button appears, cursor pointer, clicking on it changes state to PreGame Root Menu
    //**New Game
        //1 Minute timer starts, currency, lives, wave number, unit count all appear on the screen.
        //Controller starts controller the sequence of spawning the first wave 
        //Tower buttons become Clickable 
//***Game***
    //**Game Root Menu
        //Hover over New Game -> Start a new game! Cursor pointer
        //Hover over Pause -> Pause the game. Cursor Pointer
        //Hover over About Game -> Learn about the game! Cursor Pointer
        //Timer starts 
        //Clicking on a tower that has been placed on the grid will change the state to Tower Upgrade Menu
    //**About Game
        //Tower Menu changes to About Game text;
        //Exit Menu button appears, cursor pointer, clicking on it changes state to Pregame Root Menu;
        //Clicking on a tower that has been placed on the grid will change the state to Tower Upgrade Menu
    //**Pause Game
        //Stop automatic data calculations and rendering but keep the view and controller active to receive user queries
        //Allows user to click on tower info to read and think without having the game update the positions and render 
        //Pressing resume game will return the game to the Game Root Menu
        //Clicking on a tower that has been placed on the grid will change the state to Tower Upgrade Menu
    //**Tower Info
        //Tower Menu changes to About Tower text;
        //Exit menu button appears, cursor pointer, clicking on it changes state to Game Root Menu
        //Clicking on a tower that has been placed on the grid will change the state to Tower Upgrade Menu
    //**Tower 
        //Clicking on a create tower button makes it so that any available grid tile for construction will show respond with a visual cue such as changing color
        //Clicking on an available grid tile will check if the user has enough currency, create a tower at that location, reduce the player currency and change state to Game Root Menu
        //Clicking on an existing tower produces an error message
        //Clicking on an invalid tower placement location will produce an error message
        //Pressing Escape or clicking cancel will change the state to Game Root Menu
    //**Wave
        //Timer is removed
        //Units are generated in the data structure and then displayed by the view, event listeners are added in the controller
        //Units grant a small amount of currency when killed by a player, event listener, view, and data associated with the unit are cleared 
        //Hovering over a unit displays information about it. 
        //Clicking on a unit changes the Tower Menu to display more information about the unit?
    //**Between Wave
        //Timer is started
        //A lump sum of currency is granted to the player 
        //The wave number increments and the unit count adjusts to that of the next wave
        //Enemies stop spawning
        //Possibly clear controller and data? If well designed, should be redundant?
    //**Game Over
    
