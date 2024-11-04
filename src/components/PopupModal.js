import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { DateRange } from 'react-date-range';
import { format, addDays } from 'date-fns';
import NextStepPopup from './NextStepPopup';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './PopupModal.css';

const PopupModal = ({ show, handleClose }) => {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [budget, setBudget] = useState(18);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showNextPopup, setShowNextPopup] = useState(false);
  const [dateRange, setDateRange] = useState([
    { startDate: new Date(), endDate: addDays(new Date(), 0), key: 'selection' }
  ]);
  const [startTime, setStartTime] = useState('');

  const handleDateRangeChange = (ranges) => {
    const { selection } = ranges;
    setDateRange([selection]);
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const formattedDateRange = dateRange[0].startDate && dateRange[0].endDate
    ? `${format(dateRange[0].startDate, 'dd MMM')} - ${format(dateRange[0].endDate, 'dd MMM')}`
    : '📅 Choose a Day/Date range';

  const handleNextClick = () => {
    setShowNextPopup(true);
    handleClose();
  };

  return (
    <>
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
                    rangeColors={['#3d91ff']}
                    showDateDisplay={false}
                    months={1}
                    direction="horizontal"
                  />
                </div>
              )}
             
              <Form.Group className="mt-3">
                <Form.Label>Select start time</Form.Label>
                <Form.Control type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
              </Form.Group>

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
            </Col>

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

      <NextStepPopup
        show={showNextPopup}
        handleClose={() => setShowNextPopup(false)}
        formData={{
          dateRange,
          startTime,
          budget,
          adults,
          children
        }}
      />
    </>
  );
};

export default PopupModal;
