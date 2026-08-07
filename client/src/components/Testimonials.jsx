const reviews = [
  {
    key: 'giana',
    cardClass: 'card-left',
    text: "Fresh ingredients, rich flavors, and excellent presentation. You can really tell they care about quality. I'll definitely be ordering again.",
    avatar: '/images/avatar-1.svg',
    name: 'Giana George'
  },
  {
    key: 'lydia',
    cardClass: 'card-right',
    text: "Absolutely amazing food! The flavors were authentic, the portions were generous, and everything arrived fresh and hot. One of the best dining experiences I've had.",
    avatar: '/images/avatar-2.svg',
    name: 'Lydia Baptista'
  },
  {
    key: 'haylie',
    cardClass: 'card-bottom',
    text: 'The quality and taste exceeded my expectations. Every dish was perfectly prepared, and the service was fast and friendly. Highly recommended!',
    avatar: '/images/avatar-3.svg',
    name: 'Haylie Torff'
  }
];

export default function Testimonials({ style }) {
  return (
    <section className="testimonials-section" id="testimonials" style={style}>
      <div className="testimonials-container">
        <div className="testimonials-header">
          <div className="eyebrow-wrapper">
            <svg className="doodle-spark" width="32" height="24" viewBox="0 0 32 24" fill="none">
              <path d="M4 22L10 12M14 18L16 4M24 20L20 8" stroke="#f4e02c" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span className="testimonials-eyebrow">WHAT OUR GUESTS SAY</span>
          </div>
          <h2 className="testimonials-title">REAL STORIES<br />REAL FLAVORS</h2>
        </div>

        <div className="testimonials-grid">
          {reviews.map((review) => (
            <div className={`testimonial-card ${review.cardClass}`} key={review.key}>
              <div className="card-top">
                <span className="we-got">WE GOT</span>
                <span className="stars">★★★★★</span>
              </div>
              <p className="review-text">&quot;{review.text}&quot;</p>
              <div className="reviewer-info">
                <img src={review.avatar} alt={review.name} className="reviewer-avatar" />
                <span className="reviewer-name">{review.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
