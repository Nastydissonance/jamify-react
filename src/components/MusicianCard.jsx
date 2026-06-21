import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import api from '../utils/api'
import { fetchMusicians } from '../store/musiciansSlice'
import Modal from './Modal'
import MusicianForm from './MusicianForm';


const MusicianCard = ({ musician }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const handleMouseEnter = () => {
    // Here I'm loading MusicianPage when cursor is on it
    import('../pages/MusicianPage')
  }

  const handleCardClick = () => {
    navigate(`/musician/${musician.id}`)
  }

  const handleEdit = async (updatedData) => {
    try {
      await api.put(`/musicians/${musician.id}`, { ...updatedData, id: musician.id })
      dispatch(fetchMusicians())
      setIsEditModalOpen(false)
    } catch (err) {
      console.error('Update failed:', err)
      alert('Failed to update musician')
    }
  }

  const handleDelete = async () => {
    try {
      await api.delete(`/musicians/${musician.id}`)
      dispatch(fetchMusicians())
      setIsDeleteModalOpen(false)
    } catch (err) {
      console.error('Delete failed:', err)
      alert('Failed to delete musician')
    }
  }

  return (
    <>
      <div className="musician-card" onClick={handleCardClick} onMouseEnter={handleMouseEnter}>
        <div className="card-header">
          <div className="avatar">
            <i className={musician.avatarIcon || 'fas fa-user'}></i>
          </div>
          <h3>{musician.name || 'No Name'}</h3>
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

        <div className="card-buttons" onClick={(e) => e.stopPropagation()}>
          <button className="connect-btn">
            <i className="fas fa-plug"></i> Connect
          </button>
          <button className="edit-btn" onClick={(e) => { e.stopPropagation(); setIsEditModalOpen(true); }}>
            <i className="fas fa-edit"></i> Edit
          </button>
          <button className="delete-btn" onClick={(e) => { e.stopPropagation(); setIsDeleteModalOpen(true); }}>
            <i className="fas fa-trash"></i> Delete
          </button>
        </div>
      </div>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title={<><i className="fas fa-user-edit"></i> EDIT MUSICIAN</>}>
        <MusicianForm
          initialData={musician}
          onSubmit={handleEdit}
          onClose={() => setIsEditModalOpen(false)}
          isEdit={true}
        />
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title={<><i className="fas fa-user-minus"></i> DELETE MUSICIAN</>}>
        <div className="delete-confirm">
          <p>Are you sure you want to delete <strong>{musician.name}</strong>?</p>
          <p className="delete-warning">This action cannot be undone!</p>
          <div className="delete-buttons">
            <button onClick={() => setIsDeleteModalOpen(false)} className="cancel-btn">Cancel</button>
            <button onClick={handleDelete} className="confirm-delete-btn">Delete Forever</button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default MusicianCard
