import React, { useState, useEffect } from 'react';
import './filterPopup.css'; // Create a CSS file for styling

function FilterPopup({ onApplyFilter, onClose, onClearFilters, initialFilters }) {
  const [filters, setFilters] = useState(initialFilters || {});
  const [minPrice, setMinPrice] = useState(filters.minPrice || '');
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice || '');
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState(filters.propertyTypes || []);
  const [selectedMinBeds, setSelectedMinBeds] = useState(filters.minBeds || '');
  const [selectedMinBathrooms, setSelectedMinBathrooms] = useState(filters.minBathrooms || '');
  const [selectedAmenities, setSelectedAmenities] = useState(filters.amenities || []);


  useEffect(() => {
    setFilters({
      minPrice: parseFloat(minPrice),
      maxPrice: parseFloat(maxPrice),
      minBeds: selectedMinBeds,
      minBathrooms: selectedMinBathrooms,
      propertyTypes: selectedPropertyTypes,
      amenities: selectedAmenities,
    });
  }, [minPrice, maxPrice, selectedMinBeds, selectedMinBathrooms , selectedPropertyTypes, selectedAmenities]);


  const togglePropertyType = (propertyType) => {
    if (selectedPropertyTypes.includes(propertyType)) {
      setSelectedPropertyTypes(
        selectedPropertyTypes.filter((type) => type !== propertyType)
      );
    } else {
      setSelectedPropertyTypes([...selectedPropertyTypes, propertyType]);
    }
  };

  const isPropertyTypeSelected = (propertyType) =>
    selectedPropertyTypes.includes(propertyType);


    const toggleAmenity = (amenity) => {
      if (selectedAmenities.includes(amenity)) {
        setSelectedAmenities(selectedAmenities.filter((selected) => selected !== amenity));
      } else {
        setSelectedAmenities([...selectedAmenities, amenity]);
      }
    };
  
    const isAmenitySelected = (amenity) => selectedAmenities.includes(amenity);

  const handleApplyFilter = () => {
    onApplyFilter(filters);
    onClose();
  };

  const handleSelectMinBeds = (beds) => {
    setSelectedMinBeds(beds);
  };

  const handleSelectMinBathrooms = (bathrooms) => {
    setSelectedMinBathrooms(bathrooms);
  };


  const handleClearFilters = () => {
    setFilters({});
    setMinPrice('');
    setMaxPrice('');
    setSelectedMinBeds('');
    setSelectedPropertyTypes([]);
    setSelectedAmenities([])
    onClearFilters(); // Notify the parent component to clear filters
    onClose(); // Close the popup
  };
  return (
    <div className="filter-page">
     <div className="filter-popup">
     <header className="filter-header">
          <h2 className="filter-heading">Filter</h2>
          <button className="filterclose-button" onClick={onClose}>
            X
          </button>
        </header>
        <div className="filter-content">
          <div className="price-range"> 
          <h3 className="pricerange-heading">
            Price Range
            </h3>
            <div className="price-block">             
            <div className="min-block">
            <div className="min-label">Minimum</div>
            <div className="min-price">
            <span aria-hidden="true">R</span>
              <input
              aria-label="R"
                    className='min-price'
                    type="numeric"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </div>
            </div>
            <span>&#8212;</span>
            <div className="max-block">
            <div className="max-label">Maximum</div>
            <div className="max-price">
            <span aria-hidden="true">R</span>
              <input
              aria-label="R"
              className='max-price'
              type="numeric"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
            </div>
            </div>
            </div>

            <div className="property-type">
            <h3 className="propertytype-heading">Property Type</h3>
            <div className="property-type-options">
              <button
                className={`property-type-button ${
                  isPropertyTypeSelected('House') ? 'selected' : ''
                }`}
                onClick={() => togglePropertyType('House')}
              >
                House
              </button>
              <button
                className={`property-type-button ${
                  isPropertyTypeSelected('Apartment') ? 'selected' : ''
                }`}
                onClick={() => togglePropertyType('Apartment')}
              >
                Apartment
              </button>
              <button
                className={`property-type-button ${
                  isPropertyTypeSelected('Villa') ? 'selected' : ''
                }`}
                onClick={() => togglePropertyType('Villa')}
              >
                Villa
              </button>
              <button
                className={`property-type-button ${
                  isPropertyTypeSelected('Cabin') ? 'selected' : ''
                }`}
                onClick={() => togglePropertyType('Cabin')}
              >
                Cabin
              </button>
            </div>
          </div>

          <div className="rooms">
            <h3 className="rooms-heading">Beds & Bathrooms</h3>
            <div className="beds-heading">Beds</div>
            <div className="beds-options">
            <button
                className={`beds-type-button ${selectedMinBeds === '' ? 'selected' : ''}`}
                onClick={() => handleSelectMinBeds('')}
              >
                Any
              </button>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((beds) => (
                <button
                    key={beds}
                    className={`beds-type-button ${selectedMinBeds === beds ? 'selected' : ''}`}
                    onClick={() => handleSelectMinBeds(beds)}
                  >
                    {beds === 8 ? '8+' : beds}
                  </button>
                 ))}
                </div>

                <div className="bathrooms-heading">Bathrooms</div>
                <div className="bathrooms-options">
                <button
                    className={`bathrooms-type-button ${selectedMinBathrooms === '' ? 'selected' : ''}`}
                    onClick={() => handleSelectMinBathrooms('')}
                  >
                    Any
                  </button>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((bathrooms) => (
                    <button
                    key={bathrooms}
                    className={`bathrooms-type-button ${selectedMinBathrooms === bathrooms ? 'selected' : ''}`}
                    onClick={() => handleSelectMinBathrooms(bathrooms)}
                  >
                    {bathrooms === 8 ? '8+' : bathrooms}
                  </button>
                  ))}
            </div>
          </div>
          <div className="amenities">
          <h3 className="amenities-heading">Amenities</h3>
          <div className="amenities-options">
            <label>
              <input
                type="checkbox"
                checked={isAmenitySelected('Free Wi-Fi')}
                onChange={() => toggleAmenity('Free Wi-Fi')}
              />
              Free Wi-Fi
            </label>
            <label>
              <input
                type="checkbox"
                checked={isAmenitySelected('Swimming Pool')}
                onChange={() => toggleAmenity('Swimming Pool')}
              />
              Swimming Pool
            </label>
            <label>
              <input
                type="checkbox"
                checked={isAmenitySelected('Gym')}
                onChange={() => toggleAmenity('Gym')}
              />
              Gym
            </label>
            <label>
              <input
                type="checkbox"
                checked={isAmenitySelected('Parking')}
                onChange={() => toggleAmenity('Parking')}
              />
              Parking
            </label>
            <label>
              <input
                type="checkbox"
                checked={isAmenitySelected('Air Conditioning')}
                onChange={() => toggleAmenity('Air Conditioning')}
              />
              Air Conditioning
            </label>
            <label>
              <input
                type="checkbox"
                checked={isAmenitySelected('Fireplace')}
                onChange={() => toggleAmenity('Fireplace')}
              />
              Fireplace
            </label>
            <label>
              <input
                type="checkbox"
                checked={isAmenitySelected('Beachfront')}
                onChange={() => toggleAmenity('Beachfront')}
              />
              Beachfront
            </label>
            <label>
              <input
                type="checkbox"
                checked={isAmenitySelected('Hiking Trails')}
                onChange={() => toggleAmenity('Hiking Trails')}
              />
              Hiking
            </label>
            <label>
              <input
                type="checkbox"
                checked={isAmenitySelected('BBQ Grill')}
                onChange={() => toggleAmenity('BBQ Grill')}
              />
              BBQ
            </label>
            <label>
              <input
                type="checkbox"
                checked={isAmenitySelected('Views')}
                onChange={() => toggleAmenity('Views')}
              />
              Views
            </label>
            
            </div>
        </div>
        </div>




        <footer className="filter-footer">
          <button className="clear-button" onClick={handleClearFilters}>
            Clear All
          </button>
          <button className="apply-button" onClick={handleApplyFilter}>
            Apply Filter
          </button>
        </footer>
      </div>
    </div>
  );
}

export default FilterPopup;
