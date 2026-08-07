const storyItems = [
  { src: '/images/story-1.svg', alt: 'Poke Salad Bowl', className: 'item-tall-1' },
  { src: '/images/story-2.svg', alt: 'French Toast', className: 'item-short-1' },
  { src: '/images/story-3.svg', alt: 'Pancake Stack', className: 'item-tall-2' },
  { src: '/images/story-4.svg', alt: 'Raspberry Cake', className: 'item-medium-1' },
  { src: '/images/story-5.svg', alt: 'Asian Curries Spread', className: 'item-tall-3' },
  { src: '/images/story-6.svg', alt: 'Plated Salmon', className: 'item-medium-2' }
];

// Rendered twice back-to-back so the CSS marquee animation loops seamlessly.
function StoryItems({ keyPrefix }) {
  return storyItems.map((item) => (
    <div className={`story-item ${item.className}`} key={`${keyPrefix}-${item.className}`}>
      <img src={item.src} alt={item.alt} />
    </div>
  ));
}

export default function StoriesMarquee() {
  return (
    <div className="stories-marquee">
      <div className="stories-marquee-track">
        <StoryItems keyPrefix="a" />
        <StoryItems keyPrefix="b" />
      </div>
    </div>
  );
}
