import { useState } from 'react';
import { api } from '../api/client.js';

const initialForm = { name: '', email: '', phone: '', date: '', time: '', message: '' };

export default function BookingSection() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [feedback, setFeedback] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    setFeedback('');

    try {
      const res = await api.createBooking(form);
      setStatus('success');
      setFeedback(res.message || 'Booking received! We will confirm shortly.');
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
      setFeedback(err.message || 'Something went wrong. Please try again.');
    }
  }

  return (
    <section className="booking-section" id="booking">
      <div className="booking-container">
        <div className="booking-header animate-from-top">
          <span className="booking-script-title">Booking</span>
          <h2 className="booking-main-title">RESERVE YOUR<br />TABLE</h2>
          <p className="booking-subtitle">
            Plan your visit and enjoy a memorable dining experience with exceptional food and warm hospitality.
          </p>
        </div>

        <div className="booking-content-grid">
          <div className="booking-media animate-from-left">
            <img src="/images/booking-pancakes.svg" alt="Pancakes with syrup pouring" />
          </div>

          <div className="booking-form-wrap animate-from-right">
            <h3 className="form-title">REACH OUT TO US—WE&apos;D LOVE TO HEAR FROM YOU!</h3>

            <form className="booking-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="full-name">NAME</label>
                <input
                  type="text"
                  id="full-name"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row-2col">
                <div className="form-group">
                  <label htmlFor="email">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">PHONE</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row-2col">
                <div className="form-group">
                  <label htmlFor="date">DATE</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    placeholder="mm/dd/yyyy"
                    value={form.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="time">TIME</label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    placeholder="00:00 AM/PM"
                    value={form.time}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">MESSAGE</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Message"
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              <div className="form-action">
                <button type="submit" className="btn-book" disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'BOOKING…' : 'BOOK NOW'}
                </button>
              </div>

              {feedback && (
                <p
                  className="form-feedback"
                  style={{ marginTop: '12px', color: status === 'error' ? '#c0392b' : '#0b2b1b' }}
                  role="status"
                >
                  {feedback}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
