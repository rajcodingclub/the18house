export default function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-bg-doodles" aria-hidden="true">
        <svg className="wavy-loop" viewBox="0 0 1000 500" fill="none" stroke="#0b2b1b" strokeWidth="0.8" strokeDasharray="3 3">
          <path d="M 150 120 C 20 200, 40 420, 200 450 C 450 520, 800 480, 880 320 C 950 180, 850 30, 680 20 C 450 10, 100 80, 180 280 C 220 380, 400 460, 650 440" />
        </svg>

        <div className="doodle doodle-croissant">
          <svg viewBox="0 0 64 64" fill="none" stroke="#0b2b1b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 40 C10 24, 26 12, 46 16 C55 18, 58 28, 50 38 C40 48, 24 48, 12 40 Z" />
            <path d="M20 28 C26 21, 38 21, 44 28" />
            <path d="M26 35 C30 30, 38 31, 41 36" />
          </svg>
        </div>

        <div className="doodle doodle-cheese">
          <svg viewBox="0 0 64 64" fill="none" stroke="#0b2b1b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 46 L48 48 L42 22 Z" />
            <path d="M8 46 L14 16 L42 22" />
            <circle cx="22" cy="36" r="3" />
            <circle cx="35" cy="38" r="2.5" />
            <circle cx="26" cy="26" r="2" />
          </svg>
        </div>
      </div>

      <div className="about-container">
        <div className="about-header animate-from-top">
          <span className="about-script-title">About Us</span>
        </div>

        <div className="about-text-content">
          <p className="about-line animate-from-left" style={{ '--delay': '0.1s' }}>
            At The Family Table,
            <span className="inline-thumb"><img src="/images/about-1.svg" alt="Cooking feast" /></span>
            We Believe Great
          </p>

          <p className="about-line animate-from-right" style={{ '--delay': '0.25s' }}>
            Food Is
            <span className="inline-thumb"><img src="/images/about-2.svg" alt="Dishes spread" /></span>
            <strong className="highlight-text">More Than A Meal</strong>
            <span className="inline-thumb"><img src="/images/about-3.svg" alt="Table feast" /></span>
            It&apos;s Five
          </p>

          <p className="about-line animate-from-left" style={{ '--delay': '0.4s' }}>
            Kitchens That
            <span className="inline-thumb"><img src="/images/about-4.svg" alt="Salad spread" /></span>
            Somehow Became
          </p>

          <p className="about-line animate-from-right" style={{ '--delay': '0.55s' }}>
            <span className="inline-thumb"><img src="/images/about-5.svg" alt="Plated dish" /></span>
            One Family.
          </p>
        </div>
      </div>
    </section>
  );
}
