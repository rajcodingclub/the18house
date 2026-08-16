import { useState } from 'react';
import { api } from '../api/client.js';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');
  const year = new Date().getFullYear();

  async function handleSubscribe(e) {
    e.preventDefault();
    setStatus('submitting');
    setFeedback('');

    try {
      const res = await api.subscribe(email);
      setStatus('success');
      setFeedback(res.message || 'Subscribed!');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setFeedback(err.message || 'Something went wrong.');
    }
  }

  return (
    <footer className="site-footer">
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>FRESHLY CRAFTED. PERFECTLY SERVED.</span>
          <span>FRESHLY CRAFTED. PERFECTLY SERVED.</span>
          <span>FRESHLY CRAFTED. PERFECTLY SERVED.</span>
          <span>FRESHLY CRAFTED. PERFECTLY SERVED.</span>
        </div>
      </div>

      <div className="footer-contact">
        <div className="footer-contact-wrap">
          <span className="eyebrow">BOOK NOW</span>
          <form className="subscribe-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" aria-label="Subscribe" disabled={status === 'submitting'}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </form>
          {feedback && (
            <p style={{ marginTop: '10px', fontSize: '0.85rem', color: status === 'error' ? '#c0392b' : 'inherit' }}>
              {feedback}
            </p>
          )}
        </div>
      </div>

      <div className="footer-columns">
        <div className="footer-col">
          <h4>CONTACT</h4>
          <p><a href="tel:+919876567854">+91-9876567854</a></p>
          <p><a href="mailto:the18house@gmail.com">THE18HOUSE@GMAIL.COM</a></p>
           
          <p>Ground Floor, Parveen Yadav Complex,<br />The 18th House, Offosite Seimens, Sector 18,<br />Sarhol, Gurugram, Haryana 122015</p>
        </div>

        <div className="footer-col">
          <h4>ORDER NOW</h4>
          <div className="order-buttons">
            <a href="https://www.zomato.com/ncr/the-18th-house-sector-18-faridabad/order" className="order-btn zomato">ORDER ON ZOMATO</a>
            <a href="https://www.swiggy.com/city/gurgaon/the-eighteenth-house-palam-vihar-rest1419980" className="order-btn swiggy">ORDER ON SWIGGY</a>
          </div>
        </div>

        <div className="footer-col">
          <h4>SOCIAL MEDIA</h4>
          <p><a href="#" target="_blank" rel="noopener noreferrer">INSTAGRAM</a></p>
        </div>
      </div>

      <div className="footer-bottom-wrap">
        <div className="footer-bottom">&copy; {year} the18house</div>
      </div>
    </footer>
  );
}
