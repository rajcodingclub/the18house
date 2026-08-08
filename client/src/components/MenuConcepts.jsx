import useInViewClass from '../hooks/useInViewClass.js';

const concepts = [
  {
    key: 'starter',
    title: 'STARTER',
    image: '/images/menu1.svg', // Roll / Wrap image
    alt: 'Starters',
    layout: 'right', // Content on Left, Image on Right
    delay: '0.1s',
    text: "At The18House, we serve delicious starters made with fresh ingredients, bold flavors, and signature seasonings. Inspired by India's food culture, every starter brings the perfect blend of taste, texture, and satisfaction.",
    exploreHref: '#explore-starter'
  },
  {
    key: 'chinese',
    title: 'CHINESE',
    image: '/images/menu2.svg', // Clay pot / Bowl image
    alt: 'Chinese dishes',
    layout: 'right', // Content on Left, Image on Right
    delay: '0.25s',
    text: 'At The18House, our Chinese dishes are made with fresh ingredients, bold flavors, and signature sauces. Inspired by classic Chinese cuisine, every dish brings the perfect blend of authentic taste, rich texture, and satisfaction to your table.',
    exploreHref: '#explore-chinese'
  },
  {
    key: 'main-course',
    title: 'MAIN COURSE',
    image: '/images/menu3.svg', // Chai / Tea glasses image
    alt: 'Main Course dishes',
    layout: 'left', // Image on Left, Content on Right
    delay: '0.4s',
    text: 'At The18House, our main course is made with fresh ingredients, rich flavors, and signature spices. From comforting classics to flavorful favorites, every dish brings the perfect blend of taste, texture, and satisfaction to your table.',
    exploreHref: '#explore-main'
  },
  {
    key: 'biryani',
    title: 'BIRYANI',
    image: '/images/menu4.svg', // Chinese food spread image
    alt: 'Biryani dishes',
    layout: 'left', // Image on Left, Content on Right
    delay: '0.55s',
    text: 'At The18House, our biryanis are made with fragrant rice, fresh ingredients, rich spices, and bold flavors. Every biryani is slow-cooked to perfection, bringing a delicious blend of aroma, authentic taste, rich texture, and satisfaction to your table.',
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