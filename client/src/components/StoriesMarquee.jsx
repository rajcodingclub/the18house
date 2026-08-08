import { useEffect, useState } from 'react';
import { api } from '../api/client.js';

// Shown until the admin adds real stories via the dashboard, so the
// marquee never looks empty on a fresh install.
const fallbackStories = [
  { _id: 'fallback-1', imageUrl: '/images/story-1.svg', title: 'Poke Salad Bowl' },
  { _id: 'fallback-2', imageUrl: '/images/story-2.svg', title: 'French Toast' },
  { _id: 'fallback-3', imageUrl: '/images/story-3.svg', title: 'Pancake Stack' },
  { _id: 'fallback-4', imageUrl: '/images/story-4.svg', title: 'Raspberry Cake' },
  { _id: 'fallback-5', imageUrl: '/images/story-5.svg', title: 'Asian Curries Spread' },
  { _id: 'fallback-6', imageUrl: '/images/story-6.svg', title: 'Plated Salmon' }
];

const sizeClasses = ['item-tall-1', 'item-short-1', 'item-tall-2', 'item-medium-1', 'item-tall-3', 'item-medium-2'];

// Rendered twice back-to-back so the CSS marquee animation loops seamlessly.
function StoryItems({ items, keyPrefix }) {
  return items.map((item, idx) => (
    <div className={`story-item ${sizeClasses[idx % sizeClasses.length]}`} key={`${keyPrefix}-${item._id}`}>
      <img src={item.imageUrl} alt={item.title} />
    </div>
  ));
}

export default function StoriesMarquee() {
  const [stories, setStories] = useState(fallbackStories);

  useEffect(() => {
    let cancelled = false;

    api
      .getStories()
      .then((res) => {
        if (!cancelled && res.stories && res.stories.length > 0) {
          setStories(res.stories);
        }
      })
      .catch(() => {
        // Keep the fallback set on any error (e.g. API not reachable yet)
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="stories-marquee">
      <div className="stories-marquee-track">
        <StoryItems items={stories} keyPrefix="a" />
        <StoryItems items={stories} keyPrefix="b" />
      </div>
    </div>
  );
}
