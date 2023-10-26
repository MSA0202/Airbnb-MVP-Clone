import React, { useState } from 'react';
import './header.css';
import { RxHamburgerMenu } from 'react-icons/rx';
import { BsPersonCircle } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';
import BookingDatePicker from './booking'; // Import your Calendar component here


function Header({onDateSelect, onLocationSearch , onLogout, loggedInUser  }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); // State to control the calendar visibility
  const [locationQuery, setLocationQuery] = useState(''); // State to store the location search query

  
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const [, setStartDate] = useState(null); //initialise start and end dates
  const [, setEndDate] = useState(null);

  const handleDateSelect = (startDate, endDate) => { //a function to collect the start and end date
    setStartDate(startDate);
    setEndDate(endDate);
    setIsCalendarOpen(false);// set calendar to closed
    onDateSelect(startDate,endDate); //to pass dates selected from the calendar
  };
  
  const handleLocationInputChange = (e) => {
    // Update the locationQuery state when the input value changes
    console.log('Input Value:', e.target.value);
    setLocationQuery(e.target.value);
  };

  const handleLocationSearch = () => {
    // Trigger the location search with the query
    console.log('Location Query Triggered from header:', locationQuery);
    onLocationSearch(locationQuery);
  }

  const handleLogoutClick = () => {
    onLogout(); // Call the logout function passed from App.js
  };

  return (
    <div className="header">
    <div className="header__left">
      <img src="logo.png" alt="Logo" className="header__logo" />
    </div>
    <div className="header__middle">
      {isCalendarOpen ? (
        // Render the datepicker when the calendar is open
        <div className="datepicker-popup">
          <div className="datepicker-popup-content">
            <BookingDatePicker onDateSelect={handleDateSelect} onLocationSearch={handleLocationSearch} change={handleLocationInputChange} query = {locationQuery} />

          </div>
        </div>
      ) : (
        // Render the search button when the calendar is closed
        <button className="header__searchButton" onClick={toggleCalendar}>
          <div className="header__searchText">Search</div>
          <div className="header__searchHolder">
            <div className="header__searchIcon">
              <AiOutlineSearch />
            </div>
          </div>
        </button>
      )}
    </div>
    <div className="header__right">
      <button
        className={`header__profileButton ${isPopupOpen ? 'active' : ''}`}
        onClick={togglePopup}
      >
        <RxHamburgerMenu /> <BsPersonCircle className=".BsPersonCircle" />
      </button>
      {isPopupOpen && (
        <div className="header__popup">
      <div className="welcome-message">
        {loggedInUser && <p >Welcome  {loggedInUser.email
                  .split('@')[0]
                  .charAt(0)
                  .toUpperCase() +
                  loggedInUser.email.split('@')[0].slice(1)}{' '}</p>}
      </div>

          <button className="logout-button" onClick={handleLogoutClick}>
        Logout
      </button>
        </div>
      )}
    </div>
  </div>
);
}

export default Header;