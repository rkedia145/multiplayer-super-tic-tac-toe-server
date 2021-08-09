const Board = require('./board')

class SuperBoard {
    constructor() {
        this.game = new Array(9).fill(null);
        this.winStates = [
            [0, 1, 2], [3, 4, 5],[6, 7, 8],
            [0, 3, 6], [1, 4, 7],[2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ]
        this.end = false
        this.turn = 'X'
        this.switch = new Map([['X', 'O'], ['O', 'X']])
        this.currBoard = 4
        this.gameResult = 'U';
        this.prevCoordinate = {'prevBoard': -1, 'prevIndex': -1}
        for (let i = 0; i < 9; i++) {
            this.game[i] = new Board(i==this.currBoard)
        }
        // console.log("IN CONSTRUCTOR: ", this.game)
        this.enabledBoards = [this.currBoard]
    }

    updateEnabledBoards(){
        if (this.game[this.currBoard].boardResult == 'U') {
            this.enabledBoards = [this.currBoard]
        } else {
            const enabledBoards = new Array()
            for (let i = 0; i < 9; i++) {
                if (this.game[i].boardResult == 'U') {
                    enabledBoards.push(i)
                }
            }
            this.enabledBoards = enabledBoards
        }
    }

    move(boardIndex, index, piece){
        if (!this.game[boardIndex].board[index] && !this.end && this.enabledBoards.includes(boardIndex)){
            this.game[boardIndex].move(index, piece)
            this.prevCoordinate = {'prevBoard': boardIndex, 'prevIndex': index}
            this.currBoard = index
            this.updateEnabledBoards()
        }
    }

    switchTurn(){
        this.turn = this.switch.get(this.turn)
        for (let i = 0; i < 9; i++){
            this.game[i].switchTurn()
        }
    }

    checkWinner(player){
        return this.winStates.some(state =>(
          state.every(p => this.game[p].boardResult == player)
        ))
    }
    
    checkDraw(){
        return this.game.every(board => board.boardResult !== 'U')
    }

    reset(){
        this.game = new Array(9).fill(null)
        this.turn = 'X'
        this.end = false
        this.currBoard = 4
        this.gameResult = 'U';
        this.prevCoordinate = {'prevBoard': -1, 'prevIndex': -1}
        for (let i = 0; i < 9; i++) {
            this.game[i] = new Board(i==this.currBoard)
        }
    }
}

module.exports = SuperBoard