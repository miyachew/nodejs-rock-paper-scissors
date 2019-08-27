inquirer = require("inquirer")

module.exports = class rockPaperScissor{
    constructor(){
        this.prompt = inquirer.createPromptModule();
        this.moves = ["rock", "paper","scissors"];
    }

    async newGame() {
        let answer = await this.prompt({
            type: 'confirm',
            name: 'new_game',
            message: "New game?"
        });
        if(answer.new_game !==true){
            console.log("bye!")
            process.exit();
        }
        this.chooseGameOption();
    }

    async chooseGameOption(){
        let answer = await this.prompt({
            type: 'list',
            name: 'game_option',
            message: "Please choose one.",
            choices: [
            {name:'Player vs Computer',value:"player_vs_computer"}, 
            {name: 'Computer vs Computer', value:"computer_vs_computer"}
            ]
        });
        this.compete(answer.game_option);
    }

    async compete(gameOption){
        let player1Label = '';
        let player1Move = '';
        let computerMove = await this.randomMove();
        if (gameOption === "player_vs_computer"){
            player1Move = await this.getUserMove();
            player1Label ='You';
        } else if (gameOption === "computer_vs_computer") {
            player1Move = await this.randomMove();
            player1Label = 'Computer 1';
        } 
        if(player1Move==='') {
            console.log("Something went wrong. Please try again.");
            process.exit();
        }
        
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
        }else{
            console.log("Something went wrong. Please try again.");
            process.exit();
        }
        this.newGame();
    }

    async randomMove(){
        return new Promise((resolve, reject)=>{
            resolve(this.moves[Math.floor(Math.random() * this.moves.length)]);
        }); 
    }

    async getUserMove(gameOption) {
        let answer = await this.prompt({
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
}