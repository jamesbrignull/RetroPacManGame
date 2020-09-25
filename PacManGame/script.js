const width = 28;
const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
let klaxon = document.getElementById('title')
let squares = []
let score = 0


//28 * 28 = 784
  // 0 - pac-dots
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 - empty

  const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,1,1,1,1,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,1,1,1,1,2,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 
]

function createBoard() {
    for (let i = 0; i < layout.length; i++) {
        let square = document.createElement('div')
        grid.appendChild(square)
        squares.push(square)

        if(layout[i] === 0) {
            squares[i].classList.add('pac-dot')
        } else if (layout[i] === 1) {
            squares[i].classList.add('wall')
        } else if (layout[i] === 2) {
            squares[i].classList.add('ghost-lair')
        }else if (layout[i] === 3) {
            squares[i].classList.add('power-pellet')
        }
    }
}
createBoard();

// PACMAN STARTING POSITION
let pacmanCurrentIndex = 490;
squares[pacmanCurrentIndex].classList.add('pac-man')

// KEYBOARD CONTROLS
 function control(e){
    squares[pacmanCurrentIndex].classList.remove('pac-man')
    switch(e.keyCode) {
        case 40:
        case 83:
            console.log('down')
                if (
                    !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
                    !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') &&
                    pacmanCurrentIndex + width < width*width) {
                    pacmanCurrentIndex += width
                }
            break
        case 38:
        case 87:
            console.log('up')
                if (
                    !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
                    !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
                    pacmanCurrentIndex - width > 0) {
                    pacmanCurrentIndex -= width
                }
            break
        case 37:
        case 65:
            console.log('left')
                if (
                    !squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
                    !squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
                    pacmanCurrentIndex % width !== 0) {
                    pacmanCurrentIndex -= 1
                }
                if (pacmanCurrentIndex === 364) {
                    pacmanCurrentIndex = 391
                }
            break
        case 39:
        case 68:
            console.log('right')
                if (
                    !squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
                    !squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
                    pacmanCurrentIndex % width < width-1) {
                    pacmanCurrentIndex += 1
                }
                if (pacmanCurrentIndex === 391) {
                    pacmanCurrentIndex = 364
                }
            break
    }
    squares[pacmanCurrentIndex].classList.add('pac-man');
    function eatingPacdots() {
        if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
            squares[pacmanCurrentIndex].classList.remove('pac-dot');
            score += 1;
            scoreDisplay.innerHTML = score
        }
    }
    eatingPacdots()
    eatPowerPellet()
    checkGameOver()
    checkWin()
 }
document.addEventListener('keydown', control)

function eatPowerPellet() {
    if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
        squares[pacmanCurrentIndex].classList.remove('power-pellet')
        score += 10
        scoreDisplay.innerHTML = score
        ghosts.forEach(ghost => ghost.isScared = true)

        setInterval(unScareGhosts, 10000)
    }
}

function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false)
}


// GHOSTS
class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.isScared = false
        this.timderId = NaN
    }    
}

const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 404, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 407, 500)
]

ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost')
})

// MOVING GHOSTS
ghosts.forEach(ghost => moveGhosts(ghost))

function moveGhosts(ghost) {
    const directions = [-1, +1, -width, +width]
    let direction = directions[Math.floor(Math.random() * directions.length)]
    console.log(direction)

    ghost.timderId = setInterval(function(){
        if (!squares[ghost.currentIndex + direction].classList.contains('wall') &&
            !squares[ghost.currentIndex + direction].classList.contains('ghost')) {
                squares[ghost.currentIndex].classList.remove(ghost.className)
                squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
                ghost.currentIndex += direction
                squares[ghost.currentIndex].classList.add(ghost.className)
                squares[ghost.currentIndex].classList.add('ghost')
    } else {
        direction = directions[Math.floor(Math.random() * directions.length)]
    }

    if (ghost.isScared) {
        squares[ghost.currentIndex].classList.add('scared-ghost')
    }

    if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
        squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
        ghost.currentIndex = ghost.startIndex
        score +=100
        squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
    }
    checkGameOver()

}, ghost.speed)
}

function checkGameOver() {
    if (squares[pacmanCurrentIndex].classList.contains('ghost') && 
        !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
        ghosts.forEach(ghost => clearInterval(ghost.timderId))
        document.removeEventListener('keydown', control)
        klaxon.innerHTML = 'GAME OVER'
        klaxon.style.color = 'red'

    }
}

function checkWin() {
    if (score === 274) {
        ghosts.forEach(ghost => clearInterval(ghost.timderId))
        document.removeEventListener('keydown', control)
        klaxon.innerHTML = 'YOU WIN!'
        klaxon.style.color = 'green'
    }
}