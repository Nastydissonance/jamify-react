import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMusicians } from '../store/musiciansSlice'
import api from '../utils/api'
import MusicianCard from '../components/MusicianCard'
import Modal from '../components/Modal'
import MusicianForm from '../components/MusicianForm'
import TagFilter from '../components/TagFilter'  // ← добавляем импорт

const HomePage = () => {
  const dispatch = useDispatch()
  const { items: musicians, status, error, selectedFilters } = useSelector((state) => state.musicians)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMusicians())
    }
  }, [status, dispatch])

  const handleCreate = async (newMusician) => {
    try {
      await api.post('/musicians', newMusician)
      dispatch(fetchMusicians())
      setIsAddModalOpen(false)
    } catch (err) {
      console.error('Create failed:', err)
      alert('Failed to create musician')
    }
  }

  // Filter musicians by tags
  const filteredMusicians = selectedFilters.length === 0
    ? musicians
    : musicians.filter(musician => {
      const musicianTags = [
        ...(musician.genres || []),
        ...(musician.instruments || [])
      ]
      return selectedFilters.some(filter => musicianTags.includes(filter))
    })

  if (status === 'loading') {
    return <div className="loader">💀 ЗАГРУЗКА КИБЕРПАНКА... 💀</div>
  }

  if (status === 'failed') {
    return <div className="error">⚠️ ОШИБКА: {error} ⚠️</div>
  }

  return (
    <>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button className="add-musician-btn" onClick={() => setIsAddModalOpen(true)}>
          <i className="fas fa-plus"></i> ADD NEW MUSICIAN
        </button>
      </div>

      <TagFilter />  {/* ← add filters component */}

      {filteredMusicians.length === 0 ? (
        <div className="empty">🎸 NOBODY FOUND BY YOUR FILTERS  🎸</div>
      ) : (
        <div className="cards-grid">
          {filteredMusicians.map((musician) => (
            <MusicianCard key={musician.id} musician={musician} />
          ))}
        </div>
      )}

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="✨ CREATE NEW MUSICIAN">
        <MusicianForm
          onSubmit={handleCreate}
          onClose={() => setIsAddModalOpen(false)}
          isEdit={false}
        />
      </Modal>
    </>
  )
}

export default HomePage
