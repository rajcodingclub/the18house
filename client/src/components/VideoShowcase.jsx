import { useEffect, useRef, useState } from 'react';

export default function VideoShowcase() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsExpanded(true);
            video
              .play()
              .then(() => setIsPlaying(true))
              .catch(() => {});
          } else {
            setIsExpanded(false);
          }
        });
      },
      { threshold: 0.7 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }

  return (
    <section ref={sectionRef} className={`video-section${isExpanded ? ' is-expanded' : ''}`} id="video-showcase">
      <div className="video-wrapper">
        <video ref={videoRef} className="main-video" loop muted playsInline poster="/images/video-poster.svg">
          <source src="/images/vid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="video-overlay" />

        <button className="video-play-btn" aria-label="Toggle Video Playback" onClick={togglePlayback}>
          <svg className="icon-play" viewBox="0 0 24 24" fill="currentColor" style={{ display: isPlaying ? 'none' : 'block' }}>
            <path d="M8 5v14l11-7z" />
          </svg>
          <svg className="icon-pause" viewBox="0 0 24 24" fill="currentColor" style={{ display: isPlaying ? 'block' : 'none' }}>
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        </button>

        <div className="video-caption">
          <span className="eyebrow">The Art Of Plating</span>
          <h3 className="video-title">Crafted With Precision</h3>
        </div>
      </div>
    </section>
  );
}
