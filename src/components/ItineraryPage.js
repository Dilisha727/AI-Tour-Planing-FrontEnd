import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './ItineraryPage.css';

const ItineraryPage = () => {
  const [activeDay, setActiveDay] = useState('Day 1');
  const days = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Flight Availability', 'Hotels'];

  return (
    <Container fluid className="itinerary-page">
      {/* Navigation for days and options */}
      <Row className="mb-4 day-navigation">
        <div className="day-scroll-container">
          {days.map((day) => (
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

      {/* Main Content and Hotel Recommendations Side by Side */}
      <Row className="itinerary-section">
        <Col md={8}>
          <h2 className="section-title">1. Travel to Sigiriya</h2>
          <p>
            Sigiriya, also known as the "Lion Rock," is an ancient rock fortress located in the central Matale District of Sri Lanka. Built in the 5th century by King Kasyapa, this UNESCO World Heritage Site features a massive rock plateau that rises 200 meters (660 feet) above the surrounding landscape.
          </p>
          <h5>Best Time to Visit:</h5>
          <ul>
            <li>Morning (7:00 AM - 9:00 AM): Early morning is the best time to visit Sigiriya to avoid the midday heat and large crowds.</li>
            <li>Late Afternoon (4:00 PM - 5:00 PM): Visiting later in the day is another option, as temperatures cool down, and the sunset offers beautiful views from the top.</li>
          </ul>

          <h5>Clothing Recommendations:</h5>
          <ul>
            <li>Light, Breathable Clothing</li>
            <li>Good Walking Shoes</li>
            <li>Sun Protection (hats, sunscreen)</li>
            <li>Modesty in Temples</li>
          </ul>

          <h5>Visit Sigiriya Village Tour</h5>
          <p>
            The Sigiriya Village tour is among the best experiences to be enjoyed during your visit. Visitors can appreciate the natural beauty and the simple lifestyle of the local villagers.
          </p>

          {/* Add images */}
          <Row className="image-gallery">
            <Col xs={6} md={4}><img src={require('../image/Pop01.png')} alt="Sigiriya 1" /></Col>
          </Row>
        </Col>

        {/* Right Side Content */}
        <Col md={4}>
          {/* Weather and Map Section */}
          <div className="weather-section">
            <h5>Weather</h5>
            <p>27°C | Precipitation: 17% | Humidity: 85% | Wind: 10 km/h</p>
            <img src={require('../image/Pop01.png')} alt="Weather Chart" className="weather-chart" />
          </div>
          <div className="map-section mt-4">
            <h5>Map</h5>
            <img src={require('../image/Pop01.png')} alt="Sri Lanka Map" className="map-image" />
          </div>

          {/* Hotel Recommendations Section */}
          <div className="hotel-recommendations mt-4">
            <h5>Hotel Recommendations</h5>
            <ul>
              <li>
                Niketh Villa Kandy - $284 <Button variant="link">See availability</Button>
              </li>
              <li>
                Vendu Maliga Edge - $156 <Button variant="link">See availability</Button>
              </li>
              <li>
                Mystique Hideout - $127 <Button variant="link">See availability</Button>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ItineraryPage;
