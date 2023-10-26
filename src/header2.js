import React, { useState } from 'react';
import './header2.css'; // You can create a CSS file for styling
import { LuSettings2 } from 'react-icons/lu';
import { BiMap } from 'react-icons/bi';
import {BsHouse} from 'react-icons/bs';
import FilterPopup from './filterPopup';

function Header2({ onMapButtonClick, showMap, onApplyFilter, onClearFilters }) {
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [filtersApplied, setFiltersApplied] = useState(false); // New state variable

  const handleFilter = () => {
    setShowFilterPopup(true);
  };

  const handleMapToggle = () => {
    onMapButtonClick(); // Call the toggleMap function from MainPage
  };

  const applyFilter = (newFilters) => {
    setAppliedFilters(newFilters);
    onApplyFilter(newFilters);
    setFiltersApplied(Object.keys(newFilters).length > 0); // Check if filters are applied
  };

  const clearFilters = () => {
    setAppliedFilters({});
    onClearFilters();
    setFiltersApplied(false); // No filters applied after clearing
  };

  return (
    <div className="Header2">
      <div className="button-container">
        <button onClick={handleFilter} className="header2-button">
        <LuSettings2 /> {filtersApplied  ? 'Filters Applied' : 'Filter'}
        </button>
        <button onClick={handleMapToggle} className="header2-button">
          {showMap ? (
            <>
              <BsHouse /> Properties
            </>
          ) : (
            <>
              <BiMap /> Map
            </>
          )}
        </button>
      </div>
      {showFilterPopup && (
        <FilterPopup
          onApplyFilter={applyFilter}
          onClose={() => setShowFilterPopup(false)}
          onClearFilters={clearFilters}
          initialFilters={appliedFilters} // Pass the applied filters
        />
      )}
    </div>
  );
}

export default Header2;