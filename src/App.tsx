import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage/LoginPage'; // ← проверь путь

const HomePage = lazy(() => import('./pages/HomePage'));
const MusicianPage = lazy(() => import('./pages/MusicianPage'));

// ============================================================
// COMPONENT
// ============================================================

function App() {
  return (
    <Suspense fallback={<div className="loader">Loading...</div>}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/musician/:id"
          element={
            <ProtectedRoute>
              <MusicianPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;
