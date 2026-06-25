import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/store';
import { fetchMusicians } from '../store/musiciansSlice';
import api from '../utils/api';
import Modal from '../components/Modal';
import MusicianForm from '../components/MusicianForm';
import { Musician } from '../types';

// ============================================================
// TYPES
// ============================================================


// ============================================================
// COMPONENT
// ============================================================

const MusicianPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [musician, setMusician] = useState<Musician | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  // ============================================================
  // DATA FETCHING
  // ============================================================

  const fetchMusician = async (): Promise<void> => {
    if (!id) {
      setError('Musician ID not provided');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await api.get<Musician>(`/musicians/${id}`);
      setMusician(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to load musician');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMusician();
  }, [id]);

  // ============================================================
  // HANDLERS
  // ============================================================

  const handleEdit = async (updatedData: Omit<Musician, 'id'>): Promise<void> => {
    if (!id) return;

    try {
      await api.put(`/musicians/${id}`, { ...updatedData, id: parseInt(id, 10) });
      await fetchMusician();
      dispatch(fetchMusicians());
      setIsEditModalOpen(false);
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update musician');
    }
  };

  const handleDelete = async (): Promise<void> => {
    if (!id) return;

    try {
      await api.delete(`/musicians/${id}`);
      dispatch(fetchMusicians());
      navigate('/');
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete musician');
    }
  };

  // ============================================================
  // RENDER
  // ============================================================

  if (loading) {
    return <div className="loader">💀 LOADING MUSICIAN DATA... 💀</div>;
  }

  if (error || !musician) {
    return (
      <div className="error">
        ⚠️ ERROR: {error || 'Musician not found'} ⚠️
        <div>
          <button
            onClick={() => navigate('/')}
            className="back-btn"
            style={{ marginTop: '20px' }}
          >
            ← Back to Gallery
          </button>
        </div>
      </div>
    );
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
          <h2>
            <i className="fas fa-guitar"></i> Instruments
          </h2>
          <div className="tags-container">
            {musician.instruments?.map((inst: string, idx: number) => (
              <span key={idx} className="instrument-badge large">
                {inst}
              </span>
            ))}
          </div>
        </div>

        <div className="musician-page-section">
          <h2>
            <i className="fas fa-headphones"></i> Genres
          </h2>
          <div className="tags-container">
            {musician.genres?.map((genre: string, idx: number) => (
              <span key={idx} className="genre-badge large">
                {genre}
              </span>
            ))}
          </div>
        </div>

        <div className="musician-page-section">
          <h2>
            <i className="fas fa-align-left"></i> Bio / Description
          </h2>
          <p className="musician-page-description">{musician.description}</p>
        </div>

        <div className="musician-page-buttons">
          <button className="connect-btn large">
            <i className="fas fa-plug"></i> Connect
          </button>
          <button
            className="edit-btn large"
            onClick={() => setIsEditModalOpen(true)}
          >
            <i className="fas fa-edit"></i> Edit
          </button>
          <button
            className="delete-btn large"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <i className="fas fa-trash"></i> Delete
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="✏️ EDIT MUSICIAN"
      >
        <MusicianForm
          initialData={musician}
          onSubmit={handleEdit}
          onClose={() => setIsEditModalOpen(false)}
          isEdit={true}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="⚠️ DELETE MUSICIAN"
      >
        <div className="delete-confirm">
          <p>
            Are you sure you want to delete <strong>{musician.name}</strong>?
          </p>
          <p className="delete-warning">This action cannot be undone!</p>
          <div className="delete-buttons">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="cancel-btn"
            >
              Cancel
            </button>
            <button onClick={handleDelete} className="confirm-delete-btn">
              Delete Forever
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MusicianPage;
