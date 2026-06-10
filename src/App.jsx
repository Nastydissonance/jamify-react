import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MusicianPage from './pages/MusicianPage'

function App() {
  return (
    <div className="app">
      <div className="glow-bg"></div>
      <div className="cyber-grid"></div>
      <div className="cyber-glow"></div>

      <header className="cyber-header">
        <div className="container">
          <h1>💀 JAMIFY 💀</h1>
          <p className="glitch" data-text="Cyberpunk Gallery">Cyberpunk Gallery</p>
        </div>
      </header>

      <main>
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/musician/:id" element={<MusicianPage />} />
          </Routes>
        </div>
      </main>

      <footer className="cyber-footer">
        <div className="container">
          <p>⚡ NECROSAMURAI PRODUCTIONS ⚡</p>
        </div>
      </footer>
    </div>
  )
}

export default App
