import { useState, useEffect, useCallback } from 'react'
import './App.css'

const GRID_SIZE = 20
const CELL_SIZE = 20
const INITIAL_SNAKE = [{ x: 10, y: 10 }]
const INITIAL_DIRECTION = { x: 1, y: 0 }
const GAME_SPEED = 150

function App() {
  const [snake, setSnake] = useState(INITIAL_SNAKE)
  const [food, setFood] = useState({ x: 15, y: 15 })
  const [direction, setDirection] = useState(INITIAL_DIRECTION)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('snakeHighScore') || '0')
  })

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    }
    // Make sure food doesn't spawn on snake
    const isOnSnake = snake.some(segment => 
      segment.x === newFood.x && segment.y === newFood.y
    )
    if (isOnSnake) {
      return generateFood()
    }
    return newFood
  }, [snake])

  const checkCollision = useCallback((head) => {
    // Check wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true
    }
    // Check self collision
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        return true
      }
    }
    return false
  }, [snake])

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return

    setSnake(prevSnake => {
      const head = prevSnake[0]
      const newHead = {
        x: head.x + direction.x,
        y: head.y + direction.y
      }

      if (checkCollision(newHead)) {
        setGameOver(true)
        if (score > highScore) {
          setHighScore(score)
          localStorage.setItem('snakeHighScore', score.toString())
        }
        return prevSnake
      }

      const newSnake = [newHead, ...prevSnake]

      // Check if snake ate food
      if (newHead.x === food.x && newHead.y === food.y) {
        setFood(generateFood())
        setScore(prev => prev + 1)
      } else {
        newSnake.pop()
      }

      return newSnake
    })
  }, [direction, food, gameOver, isPaused, checkCollision, generateFood, score, highScore])

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, GAME_SPEED)
    return () => clearInterval(gameInterval)
  }, [moveSnake])

  const handleKeyPress = useCallback((e) => {
    if (gameOver) return

    const key = e.key.toLowerCase()
    const newDirection = { ...direction }

    switch (key) {
      case 'arrowup':
      case 'w':
        if (direction.y === 0) {
          newDirection.x = 0
          newDirection.y = -1
        }
        break
      case 'arrowdown':
      case 's':
        if (direction.y === 0) {
          newDirection.x = 0
          newDirection.y = 1
        }
        break
      case 'arrowleft':
      case 'a':
        if (direction.x === 0) {
          newDirection.x = -1
          newDirection.y = 0
        }
        break
      case 'arrowright':
      case 'd':
        if (direction.x === 0) {
          newDirection.x = 1
          newDirection.y = 0
        }
        break
      case ' ':
        e.preventDefault()
        setIsPaused(prev => !prev)
        break
      default:
        return
    }

    setDirection(newDirection)
  }, [direction, gameOver])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  const resetGame = () => {
    setSnake(INITIAL_SNAKE)
    setFood({ x: 15, y: 15 })
    setDirection(INITIAL_DIRECTION)
    setGameOver(false)
    setScore(0)
    setIsPaused(false)
  }

  const renderCell = (x, y) => {
    const isSnakeHead = snake[0].x === x && snake[0].y === y
    const isSnakeBody = snake.some((segment, index) => 
      segment.x === x && segment.y === y && index > 0
    )
    const isFood = food.x === x && food.y === y

    let cellClass = 'cell'
    if (isSnakeHead) cellClass += ' snake-head'
    else if (isSnakeBody) cellClass += ' snake-body'
    else if (isFood) cellClass += ' food'

    return (
      <div
        key={`${x}-${y}`}
        className={cellClass}
        style={{
          width: `${CELL_SIZE}px`,
          height: `${CELL_SIZE}px`
        }}
      />
    )
  }

  return (
    <div className="app">
      <div className="game-container">
        <div className="game-header">
          <div className="score-board">
            <div className="score">Score: {score}</div>
            <div className="high-score">High Score: {highScore}</div>
          </div>
          {isPaused && !gameOver && (
            <div className="pause-indicator">PAUSED</div>
          )}
        </div>
        
        <div 
          className="game-board"
          style={{
            width: `${GRID_SIZE * CELL_SIZE}px`,
            height: `${GRID_SIZE * CELL_SIZE}px`,
            gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`
          }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => {
            const x = i % GRID_SIZE
            const y = Math.floor(i / GRID_SIZE)
            return renderCell(x, y)
          })}
        </div>

        {gameOver && (
          <div className="game-over">
            <h2>Game Over!</h2>
            <p>Final Score: {score}</p>
            <button onClick={resetGame} className="restart-button">
              Play Again
            </button>
          </div>
        )}

        <div className="controls">
          <p>Use Arrow Keys or WASD to move</p>
          <p>Press Spacebar to pause</p>
        </div>
      </div>
    </div>
  )
}

export default App
