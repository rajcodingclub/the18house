export default function MenuFilterBar({ categories, selectedCategory, onCategoryChange, searchQuery, onSearchChange }) {
  return (
    <div className="menu-filter-bar">
      <div className="menu-filter-container">
        <div className="filter-dropdown-wrap">
          <select
            id="categorySelect"
            className="filter-select"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="all">ALL CATEGORIES</option>
            {categories.map((cat) => (
              <option value={cat.id} key={cat.id}>
                {cat.name} ({cat.dishes ? cat.dishes.length : 0})
              </option>
            ))}
          </select>
          <span className="dropdown-arrow">v</span>
        </div>

        <div className="filter-search-wrap">
          <input
            type="text"
            id="menuSearchInput"
            className="filter-search-input"
            placeholder="SEARCH"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <span className="search-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
