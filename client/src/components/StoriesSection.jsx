import StoriesMarquee from './StoriesMarquee.jsx';

export default function StoriesSection() {
  return (
    <section className="stories-section" id="stories">
      <div className="stories-container">
        <div className="stories-header">
          <span className="stories-script-title">Follow The Flavor</span>
          <h2 className="stories-main-title">STORIES, SPECIALS &amp;<br />SIGNATURE DISHES</h2>
        </div>

        <StoriesMarquee />
      </div>
    </section>
  );
}
