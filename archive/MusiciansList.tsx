import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMusicians } from '../store/musiciansSlice'

const MusiciansList = () => {
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
      {musicians && musicians.map((musician) => (
        <div key={musician.id} className="musician-card">
          <h3>{musician.name}</h3>
          <p>Instruments: {musician.instruments?.join(', ')}</p>
          <p>Genres: {musician.genres?.join(', ')}</p>
          <p>{musician.description}</p>
        </div>
      ))}
    </div>
  )
}

export default MusiciansList
