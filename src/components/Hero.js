import React from 'react';
import bannerImage from '../image/Container.png';

const Hero = () => {
  return (
    <div className="hero-section" style={{
      backgroundImage: `url(${bannerImage})`, // Correct way to set backgroundImage 
      backgroundSize: 'cover', 
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      textAlign: 'center'
    }}>
    
    </div>
  );
};

export default Hero;
