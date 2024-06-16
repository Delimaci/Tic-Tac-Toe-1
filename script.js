const statusDisplay = document.querySelector('.game--status');
const Xscore = document.querySelector('.Xscore');
const Oscore = document.querySelector('.Oscore');
const gameRound = document.querySelector('.game--round');
const gameValue = document.querySelector('.game--value');
const gameValueTimer = document.querySelector('.game--valueTimer');
const gameValueQuiz = document.querySelector('.game--quiz');
const Timer = document.querySelector('.game--Timer');
const Outcome = document.querySelector('.game--Outcome');
const strike = document.getElementById("strike");

//user preferences boolean

let bool = 'Yes';
let timerBool = true;
let quizBool = true;



let gameround = 1;


//OPTIONS 

//Changing best of three settings based on user pref boolean
const changeValueNoBo3 = () => {
    currentButton(1)
    bool = 'No'
   
    console.log(bool)
    gameValue.innerHTML = `Best of three: ${bool}`;
}
const changeValueYesBo3 = () => {
    currentButton(0)
    bool = 'Yes'
    console.log(bool)
    gameValue.innerHTML = `Best of three: ${bool}`;
}


//changing theme preference

const changeValueAbstractTheme = () => {
  currentButton(3)
  document.body.style.backgroundImage = "url('wallpaper.jpg')";
 

 
}
const changeValuePurpleTheme = () => {
  currentButton(2)
  document.body.style.backgroundImage = "url('purple.png')";
 
}

//TIMER

var timeleft = 10;
var downloadTimer = setInterval(function(){


    
  if(timeleft <= 0){
    clearInterval(downloadTimer);
    document.querySelector('.game--Timer').innerHTML = "Time up!";
    handlePlayerChange();

   

  } else {
    document.querySelector('.game--Timer').innerHTML = timeleft + " seconds remaining";
  }

  
  timeleft -= 1;
}, 1000);



//scores

let xScoreNumber = 0;
let oScoreNumber = 0;

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "","","",
                 "", "", "","",
                 "", "", "", "",
                "", "", "", ""];

statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
gameRound.innerHTML = `Game Round: ${gameround}`;

//settings
gameValue.innerHTML = `Best of three: ${bool}`;


Xscore.innerHTML = `X'score: ${xScoreNumber}`;

Oscore.innerHTML = `O'score: ${oScoreNumber}`;

function settingsManagement() {


   
//show/hide options
}

function startGame() {
    document.getElementById("options").style.display = "none";
    document.getElementById("wrapper").style.display = "inline";
    Outcome.innerHTML = ``;
    timeleft = 10;
  }

  //once restart button is clicked, restart game

function handleRestartGame() {
  Outcome.innerHTML = ``;
   settingsManagement();
    gameround++; //every time a game is restarted, the game round variable adds 1
    gameActive = true;
    currentPlayer = "X"; //X goes first
    strike.className = "strike";
    document.querySelector('.game--Timer').style.display = "inline";
    //Resets game state to have no X's or O's

    gameState = ["", "","","",           //gamestate is empty at beginning
                 "","","","",
                 "", "", "", "",
                "", "", "", ""];


    //display's the current players' turn with a variable
    statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;

    
    
   if( bool == "Yes")
   {
if(gameround == 3){
        gameRound.innerHTML = `Last Game Round: ${gameround}`;
    }
    else{
        gameRound.innerHTML = `Game Round: ${gameround}`; //displays the current game round 
        
    }

    if(xScoreNumber == 3){
        gameround = 0;
        xScoreNumber = 0;
        Xscore.innerHTML = `X's Score: ${xScoreNumber}`;
        Oscore.innerHTML = `O's Score: ${oScoreNumber}`;
    }
    if(oScoreNumber == 3){
        gameround = 0;
        oScoreNumber = 0;
        Xscore.innerHTML = `X's Score: ${xScoreNumber}`;
        Oscore.innerHTML = `O's Score: ${oScoreNumber}`;
    }
   }
    
    gameRound.innerHTML = `Game Round: ${gameround}`;
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");


    clearInterval(downloadTimer);
     timeleft = 10;
 downloadTimer = setInterval(function(){
  if(timeleft <= 0){
    clearInterval(downloadTimer);
    document.querySelector('.game--Timer').innerHTML = "Time up!";
    handlePlayerChange();

  } else {
    document.querySelector('.game--Timer').innerHTML = timeleft + " seconds remaining";
  }
  timeleft -= 1;
}, 1000);

}







//function for when a cell is clicked
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
  
    if(gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation(); //call validation result to check for win
    clearInterval(downloadTimer); //reset timer
     timeleft = 10;
     downloadTimer = setInterval(function(){
      if(timeleft <= 0){
        clearInterval(downloadTimer);
        document.querySelector('.game--Timer').innerHTML = "Time up!";
        handlePlayerChange();
    
      } else {
        document.querySelector('.game--Timer').innerHTML = timeleft + " seconds remaining";
      }
      timeleft -= 1;
    }, 1000);
}


//function for when a cell is clicked
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    
    
    //display image X or O depending on the player
    if(currentPlayer == "X")
    {clickedCell.innerHTML = "<img src = 'X2.png' alt = 'X' width = '100' height = '100'>";}
    else
    {clickedCell.innerHTML = "<img src = 'O2.png' alt = 'O' width = '100' height = '100'>";}
    
}

const winningConditions = [


    //horizontally 


    //added strikecClass that will display specific strikes created in the css depending on the winning combinations
{ winCondition: [0, 1, 2, 3], strikeClass: "strike-row-1"},
{ winCondition: [4, 5, 6, 7], strikeClass: "strike-row-2"},
{ winCondition: [8, 9, 10, 11], strikeClass: "strike-row-3"},
{ winCondition:  [12, 13, 14, 15], strikeClass: "strike-row-4"},

//DIAGONALLY


{ winCondition:    [0, 5, 10, 15], strikeClass: "strike-diagonal-1"},
{ winCondition:    [3, 6, 9, 12], strikeClass: "strike-diagonal-2"},

//VERTICALLY
{ winCondition:     [3, 7, 11, 15], strikeClass: "strike-column-1"},
{ winCondition:     [1, 5, 9, 13], strikeClass: "strike-column-2"},
{ winCondition:     [2, 6, 10, 14], strikeClass: "strike-column-3"},
{ winCondition:     [0, 4, 8, 12], strikeClass: "strike-column-4"}

];



function handleResultValidation() {

    //check for win
    //check for draw
   
    let roundWon = false;
    for (let i = 0; i <= 9; i++){
        const { winCondition, strikeClass } = winningConditions[i]; //brings through the winningcondition and the strikeclasses
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        let d = gameState[winCondition[3]];
        
          //if there are not 4 in a row, then continue the game
        if (a === '' || b === '' || c === '' || d === '') {
            continue;
            
        }
        if (a === b && b === c && c === d){
            roundWon = true; //ensures that 4 need to be in a row to win
            strike.classList.add(strikeClass) //add strike
            break
        }
        
       
        
    }

    

        if (roundWon) {
        
           
          document.querySelector('.game--Timer').style.display = "none";
            clearInterval(downloadTimer);
            document.getElementById("options").style.display = "none";

            document.querySelector('.game--Timer').innerHTML = "0";
            statusDisplay.innerHTML = `Player ${currentPlayer} has won!`;
            
        
               if(currentPlayer == "O"){
                oScoreNumber++;
               }
               else{
                xScoreNumber++;
               }
               Xscore.innerHTML = `X's Score: ${xScoreNumber}`;    //updates the UI text
               Oscore.innerHTML = `O's Score: ${oScoreNumber}`;


               //if bool = yes, which was selected during the settings for best of three
if(bool == "Yes"){
    if(xScoreNumber == 3){
      Outcome.innerHTML = `X won the best of 3! Their score: ${xScoreNumber}`;
       }
       if(oScoreNumber == 3){
        Outcome.innerHTML = `O won the best of 3! Their score: ${oScoreNumber}`;
       }
}
              


            gameActive = false;
            return;
           
        }
        
        let roundDraw = !gameState.includes("");
        if (roundDraw) {
            statusDisplay.innerHTML = `Game ended in a draw!`;
            gameActive = false;
            return
         
        }

        handlePlayerChange();
        
    
}


//change player 

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X"; //player change

    //state current player
    statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`; 

    clearInterval(downloadTimer);  //reset timer on player change

     //reset timeleft to 10 seconds
     timeleft = 10;

      //start timer
     downloadTimer = setInterval(function(){
      if(timeleft <= 0){
        clearInterval(downloadTimer);
        document.querySelector('.game--Timer').innerHTML = "Time up!";
        handlePlayerChange();
    

         //state the remaining time left
      } else {
        document.querySelector('.game--Timer').innerHTML = timeleft + " seconds remaining";
      }
      timeleft -= 1;
    }, 1000);
  
}


//Change active button in settings

var index = 0 ;
    var item = document.getElementsByClassName('btn');

    function currentButton(n){
        showActive(index = n);
    }
    function showActive(n){
      
            item[i].className = item[i].className.add(' Acitve','');
        
        item[n].className +=' Acitve';
    }






document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);