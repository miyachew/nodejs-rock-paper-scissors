const RockPaperScissor = require("../src/RockPaperScissor.js");
const inquirer = require('inquirer');

const game = new RockPaperScissor();


global.console = {
  log: jest.fn(),
  info: jest.fn(),
  error: jest.fn()
}


describe('Test get winner function', () => {
    test('Player1: rock, computer: scissors, player 1 label: computer 1', () => {
        return game.getWinner("rock", "scissors", "computer 1").then(winner => {
            expect(winner).toBe('computer 1');
        });
    });

    test('Player1: scissors, computer: scissors, player 1 label: computer 1', () => {
        return game.getWinner("scissors", "scissors", "computer 1").then(winner => {
            expect(winner).toBe('no one');
        });
    });

    test('Player1: paper, computer: scissors, player 1 label: computer 1', () => {
        return game.getWinner("paper", "scissors", "computer 1").then(winner => {
            expect(winner).toBe('computer');
        });
    });

    test('Player1: rock, computer: rock, player 1 label: player 1', () => {
        return game.getWinner("rock", "rock", "player 1").then(winner => {
            expect(winner).toBe('no one');
        });
    });

    test('Player1: scissors, computer: rock, player 1 label: player 1', () => {
        return game.getWinner("scissors", "rock", "player 1").then(winner => {
            expect(winner).toBe('computer');
        });
    });

    test('Player1: paper, computer: rock, player 1 label: player 1', () => {
        return game.getWinner("paper", "rock", "player 1").then(winner => {
            expect(winner).toBe('player 1');
        });
    });

    test('Player1: rock, computer: paper, player 1 label: player 1', () => {
        return game.getWinner("rock", "paper", "player 1").then(winner => {
            expect(winner).toBe('computer');
        });
    });

    test('Player1: scissors, computer: paper, player 1 label: player 1', () => {
        return game.getWinner("scissors", "paper", "player 1").then(winner => {
            expect(winner).toBe('player 1');
        });
    });

    test('Player1: paper, computer: paper, player 1 label: player 1', () => {
        return game.getWinner("paper", "paper", "player 1").then(winner => {
            expect(winner).toBe('no one');
        });
    });
})

describe('Test if printResult function console.log result as expected', () => {
    test('test 1', () => {
        game.printResult('no one', 'player1Label', 'player1Move','computerMove');
        expect(global.console.log).toHaveBeenCalledWith(
            'Winner: no one. player1Label(player1Move) vs Computer(computerMove)'
        )
    })

    test('test 2', () => {
        game.printResult('computer 1', 'player2Label', 'player2Move','computer2Move');
        expect(global.console.log).toHaveBeenCalledWith(
            'Winner: computer 1. player2Label(player2Move) vs Computer(computer2Move)'
        )
    })
})

test('Test if randomMove function return value within game.moves', () => {
    expect(game.moves).toContain(game.randomMove());
});

