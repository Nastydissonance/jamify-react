import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../utils/api'

const MusicianPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [musician, setMusician] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMusician = async () => {
      try {
        setLoading(true)
        const response = await api.get(`/musicians/${id}`)
        setMusician(response.data)
        setError(null)
      } catch (err) {
        console.error('Error fetching musician:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMusician()
  }, [id])

  if (loading) {
    return <div className="loader">💀 ЗАГРУЗКА ДАННЫХ МУЗЫКАНТА... 💀</div>
  }

  if (error || !musician) {
    return (
      <div className="error">
        ⚠️ ОШИБКА: {error || 'Музыкант не найден'} ⚠️
        <div>
          <button onClick={() => navigate('/')} className="back-btn" style={{ marginTop: '20px' }}>
            ← Вернуться к списку
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="musician-page">
      <button onClick={() => navigate('/')} className="back-btn">
        ← Back to Gallery
      </button>

      <div className="musician-page-card">
        <div className="musician-page-header">
          <div className="musician-page-avatar">
            <i className={musician.avatarIcon || 'fas fa-user'}></i>
          </div>
          <h1>{musician.name}</h1>
        </div>

        <div className="musician-page-section">
          <h2><i className="fas fa-guitar"></i> Instruments</h2>
          <div className="tags-container">
            {musician.instruments?.map((inst, idx) => (
              <span key={idx} className="instrument-badge large">{inst}</span>
            ))}
          </div>
        </div>

        <div className="musician-page-section">
          <h2><i className="fas fa-headphones"></i> Genres</h2>
          <div className="tags-container">
            {musician.genres?.map((genre, idx) => (
              <span key={idx} className="genre-badge large">{genre}</span>
            ))}
          </div>
        </div>

        <div className="musician-page-section">
          <h2><i className="fas fa-align-left"></i> Bio / Description</h2>
          <p className="musician-page-description">{musician.description}</p>
        </div>

        <div className="musician-page-buttons">
          <button className="connect-btn large">
            <i className="fas fa-plug"></i> Connect
          </button>
          <button className="edit-btn large">
            <i className="fas fa-edit"></i> Edit
          </button>
          <button className="delete-btn large">
            <i className="fas fa-trash"></i> Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default MusicianPage
