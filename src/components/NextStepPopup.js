import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './PopupModal.css';

const NextStepPopup = ({ show, handleClose }) => {
  const navigate = useNavigate(); // Initialize navigate

  // Function to handle the itinerary generation button click
  const handleGenerateItinerary = () => {
    handleClose(); // Close the modal
    navigate('/itinerary'); // Navigate to the itinerary page
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg" className="custom-next-step-modal">
      <Modal.Header closeButton>
        <Modal.Title>Customize Your Trip</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          {/* Form Column */}
          <Col xs={12} md={8}>
            <h5 className="section-title">Hotel Preferences</h5>
            <Form.Group className="mb-3 narrow-form-group">
              <Form.Label>What type of accommodation are you looking for?</Form.Label>
              <Form.Select>
                <option>Luxury Hotel</option>
                <option>Standard Hotel</option>
                <option>Budget Hotel</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3 narrow-form-group">
              <Form.Label>What is your preferred hotel star rating?</Form.Label>
              <Form.Select>
                <option>5-Star</option>
                <option>4-Star</option>
                <option>3-Star</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3 narrow-form-group">
              <Form.Label>Price Range</Form.Label>
              <div className="d-flex align-items-center">
                <span>$18</span>
                <Form.Range min="18" max="5000" className="mx-3" />
                <span>$5000</span>
              </div>
            </Form.Group>

            <h5 className="section-title">Customize Your Trip More</h5>
            <Form.Group className="mb-3 narrow-form-group">
              <Form.Label>Interests and Preferences</Form.Label>
              <div className="tag-container">
                <Button variant="outline-secondary" className="tag">Cultural sites</Button>
                <Button variant="outline-secondary" className="tag">Adventure activities</Button>
                <Button variant="outline-secondary" className="tag">Nature and wildlife</Button>
                <Button variant="outline-secondary" className="tag">Beach and relaxation</Button>
                <Button variant="outline-secondary" className="tag">City tours</Button>
              </div>
            </Form.Group>
            <Form.Group className="mb-3 narrow-form-group">
              <Form.Label>Must-Visit Places</Form.Label>
              <Form.Control type="text" placeholder="Enter places/activities" />
            </Form.Group>
            <Form.Group className="mb-3 narrow-form-group">
              <Form.Label>Any Places to Avoid</Form.Label>
              <Form.Control type="text" placeholder="Enter places" />
            </Form.Group>
          </Col>

          {/* Image Column */}
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
