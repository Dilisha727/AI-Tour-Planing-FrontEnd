import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Welcome from './components/Welcome';
import Journey from './components/Journey';
import Map from './components/Map';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ItineraryPage from './components/ItineraryPage'; // Import the itinerary page component

function App() {
  return (
    <Router>
      <div>
        {/* Header and Footer components stay outside of Routes to display on all pages */}
        <Header />
        
        <Routes>
          {/* Homepage Route */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Welcome />
                <Journey />
                <Map />
                <Testimonials />
              </>
            }
          />

          {/* Itinerary Page Route */}
          <Route path="/itinerary" element={<ItineraryPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
