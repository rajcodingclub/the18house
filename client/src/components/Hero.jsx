import { Link } from 'react-router-dom';
import useHeroZoom from '../hooks/useHeroZoom.js';

export default function Hero() {
  useHeroZoom();

  return (
    <section className="hero" id="hero">
      {/* Full-bleed background photo revealed after zoom */}
      <div className="hero-bg">
        <img src="/images/hero.svg" alt="Restaurant Background" />
      </div>

      {/* Initial Stage (Zoom Stage) */}
      <div className="hero-zoom-stage" id="heroStage">
        <p className="intro-eyebrow">
          <img src="/images/logo.svg" alt="The 18 House Logo" />
        </p>

        <h1 className="headline-intro">
          <img className="hero-doodle doodle-left" src="/images/cheese-yellow.svg" alt="" />
          <img className="hero-doodle doodle-right" src="/images/bun-yellow.svg" alt="" />
          Freshly Crafted.<br />Perfectly Served.
        </h1>

        <div className="hero-content hero-content-start">
          <p className="overlay-copy">Modern dining with unforgettable flavors and inspired recipes.</p>
          <div className="hero-image-box" id="heroImageBox">
            <img src="/images/hero.svg" alt="Interior of The 18 House restaurant" />
          </div>

          <a href="#menu" className="btn-learn">
            <span className="btn-learn-label">Learn More</span>
            <span className="btn-learn-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </span>
          </a>
        </div>
      </div>

      {/* Final Overlay Stage (Slides in from top after 1st scroll) */}
      <div className="hero-overlay-final">
        <p className="intro-eyebrow">
          <img src="/images/logo.svg" alt="The 18 House Logo" />
        </p>
        <h2 className="headline-overlay">
          <img className="hero-doodle doodle-left" src="/images/cheese.svg" alt="" />
          <img className="hero-doodle doodle-right" src="/images/bun.svg" alt="" />
          Freshly Crafted.<br />Perfectly Served.
        </h2>
        <div className="hero-content">
          <p className="overlay-copy">Modern dining with unforgettable flavors and inspired recipes.</p>
          <a href="#menu" className="btn-learn">
            <span className="btn-learn-label">Learn More</span>
            <span className="btn-learn-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}