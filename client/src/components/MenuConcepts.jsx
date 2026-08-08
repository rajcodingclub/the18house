import useInViewClass from '../hooks/useInViewClass.js';

const concepts = [
  {
    key: 'tawa-marshal',
    title: 'THE18HOUSE',
    image: '/images/menu1.svg',
    alt: 'THE18HOUSE dishes spread',
    layout: 'left',
    delay: '0.1s',
    text: "THE18HOUSE is where your cravings get loud, your cheat days go legendary, and every bite is an unforgettable flavor explosion. Juicy, drippy, double-stacked perfection, Feastria is where flavor, fun, and indulgence collide in every single bite.",
    exploreHref: '#explore-tawa'
  },
  {
    key: 'chai-curry-chugli',
    title: 'CHAI CURRY CHUGLI',
    image: '/images/menu2.svg',
    alt: 'Chai Curry Chugli tea and spices',
    layout: 'left',
    delay: '0.25s',
    text: 'At Chai Curry Chugli, we serve bold Indian comfort food with signature chais, tandoori parathas, loaded Maggi, flavorful Indo-Chinese favorites, and aromatic biryanis—crafted fresh to satisfy cravings and bring people together over great food.',
    exploreHref: '#explore-chai'
  },
  {
    key: 'bull-roll',
    title: 'BULL ROLL',
    image: '/images/menu3.svg',
    alt: 'Bull Roll Kathi Rolls',
    layout: 'right',
    delay: '0.4s',
    text: "At Bull Roll, we craft fresh vegetarian rolls filled with premium ingredients, bold flavors, and signature sauces, all wrapped in perfectly flaky parathas. Inspired by India's street food culture, every roll is made to satisfy every craving.",
    exploreHref: '#explore-bull'
  },
  {
    key: 'biryani-marshal',
    title: 'BIRYANI MARSHAL',
    image: '/images/menu4.svg',
    alt: 'Biryani Marshal Handi',
    layout: 'right',
    delay: '0.55s',
    text: 'At Biryani Marshal, every biryani is slow-cooked with fragrant basmati rice, premium ingredients, and authentic Indian spices. Inspired by the legendary biryanis of India, we bring timeless flavors to your table with a modern touch.',
    exploreHref: '#explore-biryani'
  }
];

function MenuCard({ concept }) {
  const media = (
    <div className="card-media">
      <img src={concept.image} alt={concept.alt} />
    </div>
  );

  const content = (
    <div className="card-content">
      <h3 className="card-title">{concept.title}</h3>
      <div className="card-meta">
        <span className="we-got">WE GOT</span>
        <span className="stars">★★★★★</span>
      </div>
      <p className="card-text">{concept.text}</p>
      <a href={concept.exploreHref} className="btn-explore">
        <span>EXPLORE NOW</span>
        <span className="arrow">&gt;</span>
      </a>
      <div className="delivery-apps">
        <a href="#" className="app-btn" aria-label="Zomato">
          <img src="/images/zomato-icon.svg" alt="Zomato" />
        </a>
        <a href="#" className="app-btn" aria-label="Swiggy">
          <img src="/images/swiggy-icon.svg" alt="Swiggy" />
        </a>
      </div>
    </div>
  );

  const cardClass = concept.layout === 'left' ? 'menu-card card-img-left animate-from-left' : 'menu-card card-img-right animate-from-left';

  return (
    <div className={cardClass} style={{ '--delay': concept.delay }}>
      {concept.layout === 'left' ? (
        <>
          {media}
          {content}
        </>
      ) : (
        <>
          {content}
          {media}
        </>
      )}
    </div>
  );
}

export default function MenuConcepts() {
  const sectionRef = useInViewClass('is-visible');

  return (
    <section ref={sectionRef} className="our-menu-section" id="menu">
      <div className="menu-container">
        <div className="menu-header animate-from-top">
          <span className="menu-script-title">Our Menu</span>
          <h2 className="menu-main-title">EXPLORE THE<br />FLAVOURS</h2>
        </div>

        <div className="menu-grid">
          {concepts.map((concept) => (
            <MenuCard key={concept.key} concept={concept} />
          ))}
        </div>
      </div>
    </section>
  );
}
