import StoriesMarquee from './StoriesMarquee.jsx';

export default function MenuPageHero() {
  return (
    <section className="menu-page-hero">
      <div className="menu-hero-doodles" aria-hidden="true">
        <div className="menu-doodle doodle-left">
          <svg viewBox="0 0 64 64" fill="none" stroke="#0b2b1b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 46 L48 48 L42 22 Z" />
            <path d="M8 46 L14 16 L42 22" />
            <circle cx="22" cy="36" r="3" />
            <circle cx="35" cy="38" r="2.5" />
            <circle cx="26" cy="26" r="2" />
          </svg>
        </div>

        <div className="menu-doodle doodle-right">
          <svg viewBox="0 0 64 64" fill="none" stroke="#0b2b1b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 40 C10 24, 26 12, 46 16 C55 18, 58 28, 50 38 C40 48, 24 48, 12 40 Z" />
            <path d="M20 28 C26 21, 38 21, 44 28" />
            <path d="M26 35 C30 30, 38 31, 41 36" />
          </svg>
        </div>
      </div>

      <div className="menu-hero-content">
        <div className="brand-spark">
          <svg width="34" height="24" viewBox="0 0 32 24" fill="none">
            <path d="M4 22L10 12M14 18L16 4M24 20L20 8" stroke="#0b2b1b" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <span className="brand-sub">THE 18 HOUSE</span>
        <h1 className="menu-hero-title">CRAFTED WITH<br />FLAVOUR</h1>
      </div>

      <StoriesMarquee />
    </section>
  );
}
