import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PopupModal.css';

const NextStepPopup = ({ show, handleClose, formData }) => {
  const navigate = useNavigate();

  const [accommodationType, setAccommodationType] = useState('');
  const [hotelRating, setHotelRating] = useState('');
  const [interests, setInterests] = useState([]);
  const [mustVisit, setMustVisit] = useState('');
  const [avoid, setAvoid] = useState('');

  const toggleInterest = (interest) => {
    setInterests((prevInterests) =>
      prevInterests.includes(interest) ? prevInterests.filter((i) => i !== interest) : [...prevInterests, interest]
    );
  };
const handleGenerateItinerary = async () => {
  // Ensure formData exists; otherwise, provide an empty object
  const requestData = {
    ...formData, // this includes budget from PopupModal
    accommodationType,
    hotelRating,
    interests,
    mustVisit,
    avoid,
  };
  

  try {
    const response = await axios.post('http://localhost:5000/generate-itinerary', requestData);
    const itinerary = response.data.itinerary;
    navigate('/itinerary', { state: { itinerary } });
  } catch (error) {
    console.error('Error generating itinerary:', error);
  }

  handleClose();
};

  return (
    <Modal show={show} onHide={handleClose} centered size="lg" className="custom-next-step-modal">
      <Modal.Header closeButton>
        <Modal.Title>Customize Your Trip</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xs={12} md={8}>
            <h5 className="section-title">Hotel Preferences</h5>
            <Form.Group className="mb-3">
              <Form.Label>What type of accommodation are you looking for?</Form.Label>
              <Form.Select onChange={(e) => setAccommodationType(e.target.value)}>
                <option value="">Select</option>
                <option value="Luxury Hotel">Luxury Hotel</option>
                <option value="Standard Hotel">Standard Hotel</option>
                <option value="Budget Hotel">Budget Hotel</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>What is your preferred hotel star rating?</Form.Label>
              <Form.Select onChange={(e) => setHotelRating(e.target.value)}>
                <option value="">Select</option>
                <option value="5-Star">5-Star</option>
                <option value="4-Star">4-Star</option>
                <option value="3-Star">3-Star</option>
              </Form.Select>
            </Form.Group>

            <h5 className="section-title">Customize Your Trip More</h5>
            <Form.Group className="mb-3">
              <Form.Label>Interests and Preferences</Form.Label>
              <div className="tag-container">
                {['Cultural sites', 'Adventure activities', 'Nature and wildlife', 'Beach and relaxation', 'City tours'].map((interest) => (
                  <Button
                    key={interest}
                    variant="outline-secondary"
                    className={`tag ${interests.includes(interest) ? 'active' : ''}`}
                    onClick={() => toggleInterest(interest)}
                  >
                    {interest}
                  </Button>
                ))}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Must-Visit Places</Form.Label>
              <Form.Control type="text" placeholder="Enter places/activities" value={mustVisit} onChange={(e) => setMustVisit(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Any Places to Avoid</Form.Label>
              <Form.Control type="text" placeholder="Enter places" value={avoid} onChange={(e) => setAvoid(e.target.value)} />
            </Form.Group>
          </Col>

          <Col xs={12} md={4} className="d-flex align-items-center justify-content-center">
            <img src={require('../image/Pop2.png')} alt="Robot" className="robot-image" />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Back
        </Button>
        <Button variant="success" onClick={handleGenerateItinerary}>
          Generate my itinerary
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NextStepPopup;
