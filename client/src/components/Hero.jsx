import { Link } from 'react-router-dom';
import useHeroZoom from '../hooks/useHeroZoom.js';

export default function Hero() {
  useHeroZoom();

  return (
    <section className="hero" id="hero">
      <nav className="hero-nav">
        <a href="#booking" className="nav-mark">CONTACT US</a>
        <Link to="/menu" className="nav-mark">Menu</Link>
      </nav>

      {/* full-bleed copy of the same photo, revealed once the zoom starts */}
      <div className="hero-bg">
        <img src="/images/hero.svg" alt="" />
      </div>

      <div className="hero-zoom-stage" id="heroStage">
        <p className="intro-eyebrow">
          <svg viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
            <path d="M2 14 L11 2 M6 10 L13 4 M9 13 L15 6" />
          </svg>
          The 18 House
        </p>

        <h1 className="headline-intro">
          <svg className="hero-doodle doodle-left" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M8 46 L30 12 L56 40 L40 52 Z" />
            <circle cx="30" cy="34" r="2.4" fill="currentColor" stroke="none" />
            <circle cx="22" cy="42" r="2" fill="currentColor" stroke="none" />
            <circle cx="38" cy="42" r="2" fill="currentColor" stroke="none" />
          </svg>
          <svg className="hero-doodle doodle-right" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M10 40c6-14 20-22 34-18 8 2 12 10 8 16-4 7-16 8-24 4" />
            <path d="M18 34c4-8 12-13 20-11" />
            <path d="M22 40c3-6 9-10 15-9" />
          </svg>
          Freshly Crafted.<br />Perfectly Served.
        </h1>

        <div className="hero-content">
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

      <div className="hero-overlay-final">
        <p className="intro-eyebrow">
          <svg viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
            <path d="M2 14 L11 2 M6 10 L13 4 M9 13 L15 6" />
          </svg>
          Tawa Marshal Presents
        </p>
        <h2 className="headline-overlay">
          <svg className="hero-doodle doodle-left" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M8 46 L30 12 L56 40 L40 52 Z" />
            <circle cx="30" cy="34" r="2.4" fill="currentColor" stroke="none" />
            <circle cx="22" cy="42" r="2" fill="currentColor" stroke="none" />
            <circle cx="38" cy="42" r="2" fill="currentColor" stroke="none" />
          </svg>
          <svg className="hero-doodle doodle-right" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M10 40c6-14 20-22 34-18 8 2 12 10 8 16-4 7-16 8-24 4" />
            <path d="M18 34c4-8 12-13 20-11" />
            <path d="M22 40c3-6 9-10 15-9" />
          </svg>
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
