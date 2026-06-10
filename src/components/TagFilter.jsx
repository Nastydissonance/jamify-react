import { useDispatch, useSelector } from 'react-redux'
import { toggleFilter, clearFilters } from '../store/musiciansSlice'

const TagFilter = () => {
  const dispatch = useDispatch()
  const { items: musicians, selectedFilters } = useSelector((state) => state.musicians)


  const allTags = new Set()
  musicians.forEach(musician => {
    musician.genres?.forEach(genre => allTags.add(genre))
    musician.instruments?.forEach(instrument => allTags.add(instrument))
  })
  const tagsList = Array.from(allTags).sort()

  if (tagsList.length === 0) return null

  return (
    <div className="tags-block">
      <h2 className="tags-header">🎧 FILTER BY GENRE / INSTRUMENT</h2>
      <p className="tags-paragraph">
        Click on tags to find your cyberpunk crew
      </p>
      <div className="tag-cloud">
        {tagsList.map(tag => (
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
        <button className="clear-filters-btn" onClick={() => dispatch(clearFilters())}>
          🗑️ CLEAR ALL FILTERS
        </button>
      )}
    </div>
  )
}

export default TagFilter
