import React from 'react';
import Link from '@components/ui/link';

const HeroBanner: React.FC = () => {
  return (
    <div className="hero-banner">
      <div className="hero-banner__bg" />
      <div className="hero-banner__overlay" />
      
      <div className="hero-banner__content">
        <span className="hero-banner__eyebrow">
          NEW COLLECTION
        </span>
        <h1 className="hero-banner__heading">
          Fall Winter 2026
        </h1>
        <div className="hero-banner__actions">
          <Link
            href="/search?q=women"
            className="hero-banner__link"
          >
            FOR HER
          </Link>
          <Link
            href="/search?q=men"
            className="hero-banner__link"
          >
            FOR HIM
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
