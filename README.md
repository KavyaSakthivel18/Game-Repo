# 🐍 Snake Game - React

A classic Snake game built with React and Vite, featuring smooth animations, score tracking, and high score persistence.

## 🎮 Features

- Classic Snake gameplay
- Score tracking with local high score storage
- Pause functionality (Press Spacebar)
- Responsive design with beautiful UI
- Smooth animations and visual effects
- Keyboard controls (Arrow Keys or WASD)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📦 Deploy to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI globally:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. For production deployment:
```bash
vercel --prod
```

### Option 2: Deploy via GitHub

1. Push your code to a GitHub repository

2. Go to [vercel.com](https://vercel.com) and sign in

3. Click "New Project"

4. Import your GitHub repository

5. Vercel will automatically detect the Vite configuration and deploy

6. Your app will be live in seconds!

### Option 3: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in

2. Click "Add New Project"

3. Import your Git repository or upload the project folder

4. Vercel will automatically configure the build settings

5. Click "Deploy"

## 🎯 How to Play

- Use **Arrow Keys** or **WASD** to control the snake
- Press **Spacebar** to pause/unpause
- Eat the red food to grow and increase your score
- Avoid hitting the walls or your own tail
- Try to beat your high score!

## 🛠️ Technologies Used

- React 18
- Vite
- CSS3 (with animations)
- LocalStorage (for high score persistence)

## 📝 Project Structure

```
react-snake-game/
├── src/
│   ├── App.jsx          # Main game component
│   ├── App.css          # Game styles
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
└── vercel.json          # Vercel configuration
```

## 🎨 Customization

You can easily customize the game by modifying these constants in `src/App.jsx`:

- `GRID_SIZE`: Change the grid dimensions (default: 20x20)
- `CELL_SIZE`: Change the size of each cell in pixels (default: 20px)
- `GAME_SPEED`: Adjust game speed in milliseconds (default: 150ms)

## 📄 License

This project is open source and available under the MIT License.

---

Enjoy playing! 🎮
