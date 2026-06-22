import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import api from '../utils/api'
import { fetchMusicians } from '../store/musiciansSlice'
import Modal from '../components/Modal'
import MusicianForm from '../components/MusicianForm'

const MusicianPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [musician, setMusician] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const fetchMusician = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/musicians/${id}`)
      setMusician(response.data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMusician()
  }, [id])

  const handleEdit = async (updatedData) => {
    try {
      await api.put(`/musicians/${id}`, { ...updatedData, id: parseInt(id) })
      await fetchMusician()
      dispatch(fetchMusicians())
      setIsEditModalOpen(false)
    } catch (err) {
      console.error('Update failed:', err)
      alert('Failed to update musician')
    }
  }

  const handleDelete = async () => {
    try {
      await api.delete(`/musicians/${id}`)
      dispatch(fetchMusicians())
      navigate('/')
    } catch (err) {
      console.error('Delete failed:', err)
      alert('Failed to delete musician')
    }
  }

  if (loading) {
    return <div className="loader">💀 LOADING MUSICIAN DATA... 💀</div>
  }

  if (error || !musician) {
    return (
      <div className="error">
        ⚠️ ERROR: {error || 'Musician not found'} ⚠️
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
          <button className="edit-btn large" onClick={() => setIsEditModalOpen(true)}>
            <i className="fas fa-edit"></i> Edit
          </button>
          <button className="delete-btn large" onClick={() => setIsDeleteModalOpen(true)}>
            <i className="fas fa-trash"></i> Delete
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="✏️ EDIT MUSICIAN">
        <MusicianForm
          initialData={musician}
          onSubmit={handleEdit}
          onClose={() => setIsEditModalOpen(false)}
          isEdit={true}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="⚠️ DELETE MUSICIAN">
        <div className="delete-confirm">
          <p>Are you sure you want to delete <strong>{musician.name}</strong>?</p>
          <p className="delete-warning">This action cannot be undone!</p>
          <div className="delete-buttons">
            <button onClick={() => setIsDeleteModalOpen(false)} className="cancel-btn">Cancel</button>
            <button onClick={handleDelete} className="confirm-delete-btn">Delete Forever</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default MusicianPage
