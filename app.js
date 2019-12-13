// Winner?
let winnerX = false
let winnerO = false

//remaining moves? 
let remaining = true

//the board
let board
let oArray = []
let xArray = []

//count X 
let diagonalCountO = 0

//Grabs needed elements
const boardEl = document.querySelector('#board')
const message = document.querySelector('#message')
const start = document.querySelector('.start')
const reset = document.querySelector('.reset')

//players
let players = [
  'X',
  'O'
]
//----------------------------------------------------



//creates board array to keep track of positions of each players mark on the board
//----------------------------------------------------
const setBoard = () => {
  
  let rows = [...boardEl.childNodes].filter(val => val.nodeName === 'DIV')
  
  let tempArr = []
  let boxes = []
  
  for(row of rows) {
    tempArr = [...row.childNodes]
    tempArr = tempArr.filter(val => val.nodeName === 'DIV')
    boxes.push(tempArr)
  }

  return boxes
}


board = setBoard()


//sets the position of player 1's "X" when placed
//----------------------------------------------------
const setX = (event) => {

  for(i in board) {
    for(j in board) {
      if(event.target.innerHTML === '') {
        if(board[i][j] === event.target) {
          board[i][j].innerHTML = `<span>${players[0]}</span>`
          xArray.push(event.target.innerText)
        }
      }
    }
  }
}


//sets the position of player 2's "O" when placed
//----------------------------------------------------
const setO = (event) => {
  for(i in board) {
    for(j in board) {
      if(event.target.innerHTML === '') {
        if(board[i][j] === event.target) {
          board[i][j].innerHTML = `<span>${players[1]}</span>`
          oArray.push(event.target.innerText)
        }
      }
    }
  }
}




//keeps track if there are no more moves left
//----------------------------------------------------
const movesLeft = () => {
  for(i in board) {
    for(j in board) {
      if(board[i][j].innerText === '') {
        remaining = true
        break
      } else {
        remaining = false
      }
    }
  }
}


//Prints message when no moves remain
//----------------------------------------------------
const victoryMessage = (player) => {
    const victory = `
    <div id="victory">
      <h1>Player ${player} Wins!</h1>
    </div>
    `
    message.innerHTML += victory
}


//checks if there is a winner
//----------------------------------------------------
const checkWinner = (player) => {
  let tempArr 
  let colArr = [
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],
  ]
  
  let leftCount = 0
  let downCount = 0
  let diagonalCount = 0
  
  
  for(i = 0; i < board.length; i++) {
    for(j = 0; j < board[i].length; j++) {
      tempArr = board[i]
      if(leftCount < 3){
        if(player === tempArr[j].innerText) {
          leftCount++
        } else {
          leftCount = 0;
        }
      }
      if(leftCount === 3) {
        return true
      }
    }
  }
  
  for(i = 0; i < colArr.length; i++) {
    for(j = 0; j < colArr[i].length; j++) {
      tempArr = colArr[i]
      if(downCount < 3){
        if(player === tempArr[j].innerText) {
          downCount++

        } else {
          downCount = 0;
        }
      }
      if(downCount === 3) {
        return true
      }
    }
  }
  
  if(board[0][0].innerText === player) {
    for(i = 0; i < board.length; i++) {
      if(diagonalCount < 3) {
        if(board[i][i].innerText === player) {
          diagonalCount++
          if(diagonalCount === 3) {
            return true
          }
        } else {
          diagonalCount = 0;
        }
      }
    }
  } else if(board[0][board.length-1].innerText === player) {
    for(j = 0; j < board.length; j++) {
      if(diagonalCount < 3) {
        if(board[j][(board.length-1)-j].innerText === player) {
          diagonalCount++
          if(diagonalCount === 3) {
            return true
          }
        } else {
          diagonalCount = 0;
        }
      }
    }
  } 
  
}
  

//Keeps track of each players turn
//----------------------------------------------------
const playerOne = (event) => {
  if(event.target.innerHTML === '') {
    boardEl.removeEventListener('click', playerOne)
    boardEl.addEventListener('click', playerTwo)
  }
  setX(event)
  
  if(checkWinner(players[0])) {
    boardEl.removeEventListener('click', playerTwo)
    victoryMessage(players[0])
  }
  
}

const playerTwo = (event) => {
  if(event.target.innerHTML === '') {
    boardEl.removeEventListener('click', playerTwo)
    boardEl.addEventListener('click', playerOne)
  }
  setO(event)
  
  
  if(checkWinner(players[1])) {
    boardEl.removeEventListener('click', playerOne)
    victoryMessage(players[1])
  }
  
}


//Adds functionality to button to start game
//---------------------------------------------------
const startGame = () => {
  boardEl.addEventListener('click', playerOne)
  for(i in board) {
    for(j in board) {
      board[i][j].innerHTML = ''
    }
  }
}


//Adds functionality to button to reset the game
//---------------------------------------------------
const resetGame = () => {
  for(i in board) {
    for(j in board) {
      board[i][j].innerHTML = ''
    }
  }
}

start.addEventListener('click', startGame)
reset.addEventListener('click', resetGame)