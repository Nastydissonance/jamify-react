import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const HomePage = lazy(() => import("./pages/HomePage"))
const MusicianPage = lazy(() => import("./pages/MusicianPage"))

function App() {
  return (
    <Suspense fallback={<div className="loader">Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/musician/:id" element={<MusicianPage />} />
      </Routes>
    </Suspense>
  );
}

export default App
