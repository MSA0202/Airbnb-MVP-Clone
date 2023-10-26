import React from 'react';
import './propertyPopup.css'; // Import the CSS file for styling

function PropertyPopup({ property, onClose }) {
  // This component receives the selected property as a prop and a function to close the popup

  return (
    
    <div className="popup-page">
      <div className="property-popup">
        <div className="propertyclose-holder">
          <button className="propertyclose-button" onClick={onClose}>
            X
          </button>
        </div>
        <div className="popup-content">
          <div className="image-holder">
            <img src={property.imageUrl} alt={property.title} />
          </div>
          <h3 className="property-title">{property.title}</h3>
          <p className="property-location">{property.location}</p>
          <p className="property-price">{property.price}</p>
          <h4 className="description-title">Description:</h4>
          <p className="property-description">{property.description}</p>
          <h4 className="amenities-title">Amenities:</h4>
          <ul className="property-amenities">
            {property.amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
          <h4 className="nearby-title">Nearby:</h4>
          <ul className="property-nearby">
            {property.nearby.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          </div>
        </div>
      </div>
  );
}

export default PropertyPopup;
