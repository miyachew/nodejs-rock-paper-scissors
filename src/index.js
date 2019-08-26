inquirer = require("inquirer")

const prompt = inquirer.createPromptModule();
const moves = ["rock", "paper","scissors"];

async function newGame() {
  let answer = await prompt({
    type: 'confirm',
    name: 'new_game',
    message: "New game?"
  });
  if(answer.new_game !==true){
    console.log("bye!")
    process.exit();
  }
  chooseGameOption();
}

async function chooseGameOption(){
  let answer = await prompt({
    type: 'list',
    name: 'game_option',
    message: "Please choose one.",
    choices: [
      {name:'Player vs Computer',value:"player_vs_computer"}, 
      {name: 'Computer vs Computer', value:"computer_vs_computer"}
    ]
  });
  compete(answer.game_option);
}

async function compete(gameOption){
  let player1Label = '';
  let player1Move = '';
  let computerMove = await randomMove();
  if (gameOption === "player_vs_computer"){
    player1Move = await getUserMove();
    player1Label ='You';
  } else if (gameOption === "computer_vs_computer") {
    player1Move = await randomMove();
    player1Label = 'Computer 1';
  } 
  if(player1Move==='') {
    console.log("Something went wrong. Please try again.");
    process.exit();
  }
  console.log(`${player1Move} vs ${computerMove}`)
  if(player1Move === computerMove){
    console.log(`It's a tie! ${player1Label}(${player1Move}) vs Computer(${computerMove})`);
  }else if (player1Move=== 'rock'){
    if (computerMove ==='paper'){
      console.log(`${player1Label} lose. ${player1Label}(${player1Move}) vs Computer(${computerMove})`);
    }else{
      console.log(`${player1Label} win! ${player1Label}(${player1Move}) vs Computer(${computerMove})`);
    }
  }else if (player1Move === 'paper') {
    if (computerMove === 'scissors') {
      console.log(`${player1Label} lose. ${player1Label}(${player1Move}) vs Computer(${computerMove})`);
    } else {
      console.log(`${player1Label} win! ${player1Label}(${player1Move}) vs Computer(${computerMove})`);
    }
  } else if (player1Move === 'scissors') {
    if (computerMove === 'rock') {
      console.log(`${player1Label} lose. ${player1Label}(${player1Move}) vs Computer(${computerMove})`);
    } else {
      console.log(`${player1Label} win! ${player1Label}(${player1Move}) vs Computer(${computerMove})`);
    }
  }
}

async function randomMove(){
  return new Promise((resolve, reject)=>{
    resolve(moves[Math.floor(Math.random() * moves.length)]);
  }); 
}

async function getUserMove(gameOption) {
  let answer = await prompt({
    type: 'list',
    name: 'move',
    message: "Choose your move.",
    choices: [
      { name: 'Rock', value: "rock" },
      { name: 'Paper', value: "paper" },
      { name: 'Scissors', value: "scissors" }
    ]
  });
  return new Promise((resolve, reject) => {
    resolve(answer.move);
  }); 
}

newGame();