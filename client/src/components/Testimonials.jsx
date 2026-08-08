import { useEffect, useRef, useState } from 'react';

// SET 1 (Initial Cards)
const reviewsSet1 = [
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

// SET 2 (Cards that slide up on scroll)
const reviewsSet2 = [
  {
    key: 'justin',
    cardClass: 'card-top-left',
    text: "An outstanding experience from start to finish! Every dish was packed with authentic flavors, beautifully presented, and made with fresh, high-quality ingredients. The portions were generous, the service was prompt, and everything arrived hot and perfectly cooked. It's rare to find a place that consistently delivers both exceptional taste and great value.",
    avatar: '/images/avatar-3.svg',
    name: 'Justin Geidt'
  },
  {
    key: 'haylie-lubin',
    cardClass: 'card-top-right',
    text: "Fresh ingredients, rich flavors, and excellent presentation. You can really tell they care about quality.",
    avatar: '/images/avatar-2.svg',
    name: 'Haylie Lubin'
  },
  {
    key: 'miracle',
    cardClass: 'card-bottom-center',
    text: "This restaurant has quickly become one of my favorites. The food is incredibly flavorful, perfectly seasoned, and clearly prepared with great attention to detail. Whether you're dining in or ordering online, the quality remains consistently excellent. The staff is courteous, the service is reliable, and every meal feels like it's been made with genuine care. If you're looking for delicious food and a memorable dining experience, this place is definitely worth visiting!",
    avatar: '/images/avatar-1.svg',
    name: 'Miracle Herwitz'
  }
];

export default function Testimonials({ style }) {
  const sectionRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
// Replace handleScroll inside useEffect in Testimonials.jsx:
const handleScroll = () => {
  if (!sectionRef.current) return;
  const rect = sectionRef.current.getBoundingClientRect();

  // Calculates the scroll ratio of the section (0 = entering bottom, 1 = fully scrolled up)
  const scrolledRatio = (window.innerHeight - rect.top) / rect.height;

  // Triggers card switch when section is scrolled up 90% (0.9)
  if (scrolledRatio >= 0.7) {
    setIsScrolled(true);
  } else {
    setIsScrolled(false);
  }
};

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`testimonials-section ${isScrolled ? 'is-scrolled' : ''}`}
      id="testimonials"
      style={style}
    >
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
          {/* SET 1: Slides UP and OUT */}
          {reviewsSet1.map((review) => (
            <div className={`testimonial-card card-set-1 ${review.cardClass}`} key={review.key}>
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

          {/* SET 2: Slides UP FROM BOTTOM into view */}
          {reviewsSet2.map((review) => (
            <div className={`testimonial-card card-set-2 ${review.cardClass}`} key={review.key}>
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