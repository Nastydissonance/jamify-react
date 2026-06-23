import { useState, useEffect } from 'react'

const MusicianForm = ({ initialData, onSubmit, onClose, isEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    avatarIcon: 'fas fa-user',
    genres: [],
    instruments: [],
    description: ''
  })

  const [genreInput, setGenreInput] = useState('')
  const [instrumentInput, setInstrumentInput] = useState('')

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        avatarIcon: initialData.avatarIcon || 'fas fa-user',
        genres: initialData.genres || [],
        instruments: initialData.instruments || [],
        description: initialData.description || ''
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const addGenre = () => {
    if (genreInput.trim() && !formData.genres.includes(genreInput.trim())) {
      setFormData({
        ...formData,
        genres: [...formData.genres, genreInput.trim()]
      })
      setGenreInput('')
    }
  }

  const removeGenre = (genre) => {
    setFormData({
      ...formData,
      genres: formData.genres.filter(g => g !== genre)
    })
  }

  const addInstrument = () => {
    if (instrumentInput.trim() && !formData.instruments.includes(instrumentInput.trim())) {
      setFormData({
        ...formData,
        instruments: [...formData.instruments, instrumentInput.trim()]
      })
      setInstrumentInput('')
    }
  }

  const removeInstrument = (instrument) => {
    setFormData({
      ...formData,
      instruments: formData.instruments.filter(i => i !== instrument)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label><i className="fas fa-user"></i> Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label><i className="fas fa-tag"></i> Avatar Icon (FontAwesome class)</label>
        <input
          type="text"
          name="avatarIcon"
          value={formData.avatarIcon}
          onChange={handleChange}
          placeholder="fas fa-user"
        />
      </div>

      <div className="form-group">
        <label><i className="fas fa-headphones"></i> Genres</label>
        <div className="tag-input-group">
          <input
            type="text"
            value={genreInput}
            onChange={(e) => setGenreInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addGenre())}
            placeholder="Add genre and press Enter"
          />
          <button type="button" onClick={addGenre} className="add-tag-btn">+</button>
        </div>
        <div className="tags-container">
          {formData.genres.map((genre, idx) => (
            <span key={idx} className="genre-badge">
              {genre}
              <button type="button" onClick={() => removeGenre(genre)} className="remove-tag">×</button>
            </span>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label><i className="fas fa-guitar"></i> Instruments</label>
        <div className="tag-input-group">
          <input
            type="text"
            value={instrumentInput}
            onChange={(e) => setInstrumentInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInstrument())}
            placeholder="Add instrument and press Enter"
          />
          <button type="button" onClick={addInstrument} className="add-tag-btn">+</button>
        </div>
        <div className="tags-container">
          {formData.instruments.map((instrument, idx) => (
            <span key={idx} className="instrument-badge">
              {instrument}
              <button type="button" onClick={() => removeInstrument(instrument)} className="remove-tag">×</button>
            </span>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label><i className="fas fa-align-left"></i> Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
        />
      </div>

      <div className="form-actions" style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
        <button type="button" className="cancel-btn" onClick={onClose} style={{ flex: 1 }}>
          <i className="fas fa-times"></i> CANCEL
        </button>

        <button type="submit" className="tag" style={{ width: '100%', justifyContent: 'center' }}>
          {isEdit ? (
            <><i className="fas fa-save"></i> UPDATE MUSICIAN</>
          ) : (
            <><i className="fas fa-user-plus"></i> ADD MUSICIAN</>
          )}
        </button>
      </div>
    </form>
  )
}

export default MusicianForm
