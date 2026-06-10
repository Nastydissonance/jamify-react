import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMusicians } from '../store/musiciansSlice'
import MusicianCard from '../components/MusicianCard'

const HomePage = () => {
  const dispatch = useDispatch()
  const { items: musicians, status, error } = useSelector((state) => state.musicians)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMusicians())
    }
  }, [status, dispatch])

  if (status === 'loading') {
    return <div className="loader">💀 ЗАГРУЗКА КИБЕРПАНКА... 💀</div>
  }

  if (status === 'failed') {
    return <div className="error">⚠️ ОШИБКА: {error} ⚠️</div>
  }

  if (status === 'succeeded' && (!musicians || musicians.length === 0)) {
    return <div className="empty">🎸 НИКОГО НЕ НАЙДЕНО 🎸</div>
  }

  return (
    <div className="cards-grid">
      {musicians.map((musician) => (
        <MusicianCard key={musician.id} musician={musician} />
      ))}
    </div>
  )
}

export default HomePage
