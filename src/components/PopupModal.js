import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { DateRange } from 'react-date-range';
import { format, addDays } from 'date-fns';
import NextStepPopup from './NextStepPopup'; // Import the second modal component
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './PopupModal.css';

const PopupModal = ({ show, handleClose }) => {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [budget, setBudget] = useState(18);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showNextPopup, setShowNextPopup] = useState(false); // State for the second popup

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 0),
      key: 'selection',
    },
  ]);

  const handleDateRangeChange = (ranges) => {
    const { selection } = ranges;
    setDateRange([selection]);
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const formattedDateRange = dateRange[0].startDate && dateRange[0].endDate
    ? `${format(dateRange[0].startDate, 'dd MMM')} - ${format(dateRange[0].endDate, 'dd MMM')}`
    : '📅 Choose a Day/Date range, up to 30 Days';

  const handleNextClick = () => {
    setShowNextPopup(true); // Show the second modal
    handleClose(); // Close the first modal
  };

  return (
    <>
      {/* First Modal */}
      <Modal show={show} onHide={handleClose} centered size="lg" className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Plan Your Dream Trip</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-layout">
          <Row>
            <Col xs={12} md={8} className="left-content">
              <div onClick={toggleDatePicker} className="styled-date-picker">
                {formattedDateRange}
              </div>
              {showDatePicker && (
                <div className="date-picker-container">
                  <DateRange
                    ranges={dateRange}
                    onChange={handleDateRangeChange}
                    moveRangeOnFirstSelection={false}
                    rangeColors={['#3d91ff']}
                    showDateDisplay={false}
                    months={1}
                    direction="horizontal"
                    weekStartsOn={0}
                  />
                </div>
              )}
             
              {/* Additional Form Fields */}
              <Form.Group className="mt-3">
                <Form.Label>Select start time</Form.Label>
                <Form.Control type="time" />
              </Form.Group>
              <Form.Check className="mt-2" label="I am flexible 1-2 days" />

              {/* Budget Range */}
              <h5 className="mt-4">Budget Range</h5>
              <div className="d-flex align-items-center">
                <Form.Control
                  type="range"
                  min="18"
                  max="5000"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="me-2"
                />
                <span>${budget}</span>
              </div>

              {/* Travel Companions */}
              <h5 className="mt-4">Travel Companions</h5>
              <div className="d-flex align-items-center mb-2">
                <Form.Label className="me-2">Adults:</Form.Label>
                <Button onClick={() => setAdults(Math.max(1, adults - 1))}>-</Button>
                <span className="mx-2">{adults}</span>
                <Button onClick={() => setAdults(adults + 1)}>+</Button>
              </div>
              <div className="d-flex align-items-center mb-2">
                <Form.Label className="me-2">Children:</Form.Label>
                <Button onClick={() => setChildren(Math.max(0, children - 1))}>-</Button>
                <span className="mx-2">{children}</span>
                <Button onClick={() => setChildren(children + 1)}>+</Button>
              </div>

              {/* Flight Preferences */}
              <h5>Flight Preferences</h5>
              <Form.Group className="mb-3">
                <Form.Label>Flight Class:</Form.Label>
                <Form.Select>
                  <option>Economy</option>
                  <option>Business</option>
                  <option>First Class</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Flight Type:</Form.Label>
                <Form.Select>
                  <option>Direct flight only</option>
                  <option>Layovers allowed</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Robot Image on the Right */}
            <Col xs={12} md={4} className="right-content">
              <img src={require('../image/Pop01.png')} alt="Robot" className="robot-image" />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Back
          </Button>
          <Button variant="primary" onClick={handleNextClick}>
            Next
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Second Modal (Next Step) */}
      <NextStepPopup show={showNextPopup} handleClose={() => setShowNextPopup(false)} />
    </>
  );
};

export default PopupModal;
