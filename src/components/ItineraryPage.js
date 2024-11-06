import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './ItineraryPage.css';

const ItineraryPage = () => {
  const location = useLocation();
  const { itinerary } = location.state || {}; // Get the itinerary data from location state

  // Split each day's details based on "### Day" and map them into individual day objects
  const days = itinerary
    ? itinerary.split("### Day").slice(1).map((section, index) => {
        const [title, ...contentLines] = section.trim().split('\n');
        return {
          day: `Day ${index + 1}: ${title.trim()}`,
          content: contentLines.join('\n').trim(),
        };
      })
    : [];

  const [activeDay, setActiveDay] = useState(days.length > 0 ? days[0].day : '');

  if (!itinerary) {
    return (
      <Container className="itinerary-page">
        <h2>Itinerary Not Found</h2>
        <p>Please go back to the form and generate an itinerary.</p>
      </Container>
    );
  }

  return (
    <Container fluid className="itinerary-page">
      <h2 className="page-title">Your Customized Sri Lanka Itinerary</h2>

      {/* Day Navigation */}
      <Row className="mb-4 day-navigation">
        <div className="day-scroll-container">
          {days.map(({ day }) => (
            <Button
              key={day}
              onClick={() => setActiveDay(day)}
              className={activeDay === day ? 'active-day-button' : 'day-button'}
            >
              {day}
            </Button>
          ))}
        </div>
      </Row>

      <Row className="content-section">
        {/* Main Itinerary Content */}
        <Col md={8}>
          {days
            .filter(({ day }) => day === activeDay)
            .map(({ day, content }, index) => (
              <div key={index} className="day-section">
                <h3 className="day-title">{day}</h3>
                <div className="day-content">
                  {content
                    .split('\n')
                    .map((line, i) => (
                      <p key={i}>{line.trim()}</p>
                    ))}
                </div>
              </div>
            ))}
        </Col>

        {/* Sidebar with Weather, Map, and Hotels */}
        <Col md={4} className="sidebar">
          <div className="sidebar-section weather-section">
            <h5>Weather Information</h5>
            <p>24°C - Cloudy</p>
            <p>High: 29°C, Low: 23°C</p>
            <p>Rain expected tomorrow (80% chance)</p>
            <img src={require('../image/Pop2.png')} alt="Weather Forecast" className="weather-chart" />
          </div>

          <div className="sidebar-section map-section">
            <h5>Map of Locations</h5>
            <img src={require('../image/Pop2.png')} alt="Map of Itinerary Locations" className="map-image" />
          </div>

          <div className="sidebar-section hotels-section">
            <h5>Recommended Hotels</h5>
            <ul className="hotel-list">
              <li>Niketh Villa Kandy - $284 <button className="availability-button">Check Availability</button></li>
              <li>Vendu Maliga Edge - $156 <button className="availability-button">Check Availability</button></li>
              <li>Mystique Hideout - $127 <button className="availability-button">Check Availability</button></li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ItineraryPage;
