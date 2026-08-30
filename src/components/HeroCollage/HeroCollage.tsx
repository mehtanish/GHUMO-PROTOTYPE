import React from 'react';
import './HeroCollage.css';

interface HeroCollageProps {
  images: string[];
}

export const HeroCollage: React.FC<HeroCollageProps> = ({ images }) => {
  return (
    <div className="hero-collage-container">
      {images.map((img, idx) => (
        <div key={idx} className="hero-collage-image-wrapper">
          <img src={img} alt={`Collage image ${idx + 1}`} className="hero-collage-image" />
        </div>
      ))}
    </div>
  );
};

export default HeroCollage;
