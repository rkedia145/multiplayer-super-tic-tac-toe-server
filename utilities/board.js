class Board{
    constructor(isCurrBoard) {
        this.board = new Array(9).fill(null);
        this.winStates = [
            [0, 1, 2], [3, 4, 5],[6, 7, 8],
            [0, 3, 6], [1, 4, 7],[2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ]
        this.end = false
        this.turn = 'X'
        this.switch = new Map([['X', 'O'], ['O', 'X']])
        this.isCurrBoard = isCurrBoard
        this.boardResult = 'U'
    }

    move(index, piece){
        if (!this.board[index] && !this.end){
            const newState = [...this.board]
            newState.splice(index, 1, piece)
            this.board = newState

            if (this.checkWinner(piece)) {
                this.boardResult = piece
            } else if (this.checkDraw()) {
                this.boardResult = 'D'
            }
        }
    }

    switchTurn(){
        this.turn = this.switch.get(this.turn)
    }

    checkWinner(player){
        return this.winStates.some(state =>(
          state.every((position => this.board[position] === player))
        ))
    }
    
    checkDraw(){
        return this.board.every(value => value !== null)
    }

    reset(){
        this.board = new Array(9).fill(null)
        this.turn = 'X'
    }
}

module.exports = Board