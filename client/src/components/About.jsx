export default function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-bg-doodles" aria-hidden="true">
       

        <div className="doodle doodle-croissant">
          <img src="/images/bun-black.svg" alt="" />
        </div>

        <div className="doodle doodle-cheese">
          <img src="/images/cheese-black.svg" alt="" />
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
