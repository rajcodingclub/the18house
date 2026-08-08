import StoriesMarquee from './StoriesMarquee.jsx';

export default function MenuPageHero() {
  return (
    <section className="menu-page-hero">
      <div className="menu-hero-doodles" aria-hidden="true">
        <div className="menu-doodle doodle-left">
          <img src="/images/cheese-black.svg" alt="" />
        </div>

        <div className="menu-doodle doodle-right">
         <img src="/images/bun-black.svg" alt="" />
        </div>
      </div>

      <div className="menu-hero-content">
        <img className='brand-sub' src="/images/logo-black.png" alt="" />
        <h1 className="menu-hero-title">CRAFTED WITH<br />FLAVOUR</h1>
      </div>

      <StoriesMarquee />
    </section>
  );
}
