import Nav from '../components/Nav.jsx';
import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import VideoShowcase from '../components/VideoShowcase.jsx';
import MenuConcepts from '../components/MenuConcepts.jsx';
import StoriesSection from '../components/StoriesSection.jsx';
import Testimonials from '../components/Testimonials.jsx';
import BookingSection from '../components/BookingSection.jsx';
import WhatsAppFloat from '../components/WhatsAppFloat.jsx';
import Footer from '../components/Footer.jsx';
import useScrollAnimations from '../hooks/useScrollAnimations.js';

export default function Home() {
  useScrollAnimations();

  return (
    <>
      <Nav />
      <Hero />
      <About />
      <VideoShowcase />
      <MenuConcepts />
      <StoriesSection />
      <Testimonials />
      <BookingSection />
      <WhatsAppFloat />
      <Footer />
    </>
  );
}
