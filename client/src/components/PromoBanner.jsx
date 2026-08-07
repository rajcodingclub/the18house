export default function PromoBanner() {
  return (
    <section className="promo-banner-section">
      <div className="promo-banner-content">
        <div className="promo-eyebrow-wrap">
          <svg className="promo-doodle" width="32" height="24" viewBox="0 0 32 24" fill="none">
            <path d="M4 22L10 12M14 18L16 4M24 20L20 8" stroke="#f4e02c" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <span className="promo-eyebrow">WE ARE OPEN</span>
        </div>

        <h2 className="promo-headline">
          GRAB YOU DISH NOW<br />AND GET 50% OFF
        </h2>

        <p className="promo-tagline">ON SWIGGY &amp; ZOMATO</p>
      </div>
    </section>
  );
}
