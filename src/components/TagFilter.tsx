import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { toggleFilter, clearFilters } from '../store/musiciansSlice';
import { Musician } from '../types';

// ============================================================
// TYPES (NO PROPS, EVERYTHING IS FROM STORE)
// ============================================================

// Component doesn't take props. It uses hooks directly

// ============================================================
// COMPONENT
// ============================================================

const TagFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: musicians, selectedFilters } = useAppSelector(
    (state) => state.musicians
  );

  // Собираем все теги из всех музыкантов
  const allTags = new Set<string>();
  musicians.forEach((musician: Musician) => {
    musician.genres?.forEach((genre: string) => allTags.add(genre));
    musician.instruments?.forEach((instrument: string) => allTags.add(instrument));
  });
  const tagsList = Array.from(allTags).sort();

  if (tagsList.length === 0) return null;

  return (
    <div className="tags-block">
      <h2 className="tags-header">🎧 FILTER BY GENRE / INSTRUMENT</h2>
      <p className="tags-paragraph">
        Click on tags to find your cyberpunk crew
      </p>
      <div className="tag-cloud">
        {tagsList.map((tag: string) => (
          <button
            key={tag}
            className={`tag ${selectedFilters.includes(tag) ? 'tag-active' : ''}`}
            onClick={() => dispatch(toggleFilter(tag))}
          >
            {tag}
          </button>
        ))}
      </div>
      {selectedFilters.length > 0 && (
        <button
          className="clear-filters-btn"
          onClick={() => dispatch(clearFilters())}
        >
          🗑️ CLEAR ALL FILTERS
        </button>
      )}
    </div>
  );
};

export default TagFilter;
