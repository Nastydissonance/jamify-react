import { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';
import { fetchMusicians } from '../store/musiciansSlice';
import api from '../utils/api';
import MusicianCard from '../components/MusicianCard';
import Modal from '../components/Modal';
import TagFilter from '../components/TagFilter';
import MusicianForm from '../components/MusicianForm';
import { Musician } from '../types';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { items: musicians, status, error, selectedFilters } = useAppSelector(
    (state) => state.musicians
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMusicians());
    }
  }, [status, dispatch]);

  const handleCreate = useCallback(
    async (newMusician: Omit<Musician, 'id'>) => {
      try {
        await api.post('/musicians', newMusician);
        dispatch(fetchMusicians());
        setIsAddModalOpen(false);
      } catch (err) {
        console.error('Create failed:', err);
        alert('Failed to create musician');
      }
    },
    [dispatch]
  );

  const filteredMusicians = useMemo(() => {
    if (selectedFilters.length === 0) return musicians;

    return musicians.filter((musician) => {
      const musicianTags = [
        ...(musician.genres || []),
        ...(musician.instruments || []),
      ];
      return selectedFilters.some((filter) => musicianTags.includes(filter));
    });
  }, [musicians, selectedFilters]);

  if (status === 'loading') {
    return <div className="loader">💀 CYBERPUNK IS LOADING... 💀</div>;
  }

  if (status === 'failed') {
    return <div className="error">⚠️ ERROR: {error} ⚠️</div>;
  }

  return (
    <>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button
          className="add-musician-btn"
          onClick={() => setIsAddModalOpen(true)}
        >
          <i className="fas fa-plus"></i> ADD NEW MUSICIAN
        </button>
      </div>

      <TagFilter />

      {filteredMusicians.length === 0 ? (
        <div className="empty">NOBODY FOUND BY YOUR FILTERS</div>
      ) : (
        <div className="cards-grid">
          {filteredMusicians.map((musician) => (
            <MusicianCard key={musician.id} musician={musician} />
          ))}
        </div>
      )}

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={
          <>
            <i className="fas fa-user-plus"></i> CREATE MUSICIAN
          </>
        }
      >
        <MusicianForm
          onSubmit={handleCreate}
          onClose={() => setIsAddModalOpen(false)}
          isEdit={false}
        />
      </Modal>
    </>
  );
};

export default HomePage;
