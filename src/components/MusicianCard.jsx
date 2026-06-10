import { useNavigate } from 'react-router-dom'

const MusicianCard = ({ musician }) => {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(`/musician/${musician.id}`)
  }

  return (
    <div className="musician-card" onClick={handleCardClick}>
      <div className="card-header">
        <div className="avatar">
          <i className={musician.avatarIcon || 'fas fa-user'}></i>
        </div>
        <h3>{musician.name || 'Без имени'}</h3>
      </div>

      <div className="badges">
        {musician.instruments?.slice(0, 2).map((inst, idx) => (
          <span key={idx} className="instrument-badge">{inst}</span>
        ))}
      </div>

      <div className="badges">
        {musician.genres?.slice(0, 2).map((genre, idx) => (
          <span key={idx} className="genre-badge">{genre}</span>
        ))}
      </div>

      <p className="musician-description">
        {musician.description?.slice(0, 80)}
        {musician.description?.length > 80 ? '...' : ''}
      </p>

      {/* Кнопки — отдельно, чтобы клик по ним не вызывал переход */}
      <div className="card-buttons" onClick={(e) => e.stopPropagation()}>
        <button className="connect-btn">
          <i className="fas fa-plug"></i> Connect
        </button>
        <button className="edit-btn">
          <i className="fas fa-edit"></i> Edit
        </button>
        <button className="delete-btn">
          <i className="fas fa-trash"></i> Delete
        </button>
      </div>
    </div>
  )
}

export default MusicianCard
