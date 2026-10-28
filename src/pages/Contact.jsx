import { useState } from 'react';
import { axiosInstance } from '../api/profileApi';
import './Contact.css';

const FEEDBACK_TYPES = [
  { value: 'general', label: '💬 General' },
  { value: 'design', label: '🎨 Design' },
  { value: 'bug', label: '🐞 Bug' },
  { value: 'idea', label: '💡 Idea' },
];

const INITIAL_FORM = {
  name: '',
  email: '',
  type: 'general',
  rating: 0,
  message: '',
};

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // native "required" doesn't work on the star buttons
    if (!form.rating) {
      setStatus('rating');
      return;
    }

    setIsSubmitting(true);
    setStatus('');

    try {
      // payload: { name, email, type, rating, message }
      await axiosInstance.post('/api/feedback', form);
      setStatus('success');
      setForm(INITIAL_FORM);
    } catch (error) {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact">
      <div className="contact-container">
        <div className="contact-header">
          <h2>Get In Touch</h2>
          <p>Have a project in mind or just want to chat? I'd love to hear from you!</p>
        </div>

        <div className="contact-content">
          {/* ---------- YOUR INFO ---------- */}
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">📧</div>
              <h3>Email</h3>
              <p>swaroopav21@outlook.com</p>
            </div>

            <div className="info-card">
              <div className="info-icon linkedin">in</div>
              <h3>LinkedIn</h3>
              <a
                href="https://www.linkedin.com/in/swaroop-a-v-386067211/"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Profile
              </a>
            </div>

            <div className="info-card">
              <div className="info-icon">📍</div>
              <h3>Location</h3>
              <p>Bangalore, India</p>
            </div>
          </div>

          {/* ---------- FEEDBACK ---------- */}
          <div className="feedback-container">
            <h3 className="feedback-title">Leave Feedback</h3>
            <p className="feedback-subtitle">
              Thoughts on this portfolio? I'd love to hear them.
            </p>

            <form onSubmit={handleSubmit} className="feedback-form">
              {/* rating */}
              <div className="form-group">
                <label id="rating-label">How was your experience? *</label>
                <div className="star-rating" role="radiogroup" aria-labelledby="rating-label">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      role="radio"
                      aria-checked={form.rating === n}
                      aria-label={`${n} star${n > 1 ? 's' : ''}`}
                      className={`star ${n <= form.rating ? 'active' : ''}`}
                      onClick={() => {
                        setForm({ ...form, rating: n });
                        if (status === 'rating') setStatus('');
                      }}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              {/* feedback type */}
              <div className="form-group">
                <label id="type-label">Feedback type</label>
                <div className="chip-group" role="radiogroup" aria-labelledby="type-label">
                  {FEEDBACK_TYPES.map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      role="radio"
                      aria-checked={form.type === t.value}
                      className={`chip ${form.type === t.value ? 'active' : ''}`}
                      onClick={() => setForm({ ...form, type: t.value })}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* message */}
              <div className="form-group">
                <label htmlFor="message">Your feedback *</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  minLength={10}
                  maxLength={2000}
                  rows={5}
                  placeholder="What did you like? What could be better?"
                />
              </div>

              {/* optional details */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name (optional)</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    maxLength={100}
                    placeholder="Anonymous"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email (optional)</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="If you'd like a reply"
                  />
                </div>
              </div>

              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Feedback'}
              </button>

              {status === 'rating' && (
                <div className="status-message error">
                  ⭐ Please pick a star rating first.
                </div>
              )}

              {status === 'success' && (
                <div className="status-message success">
                  ✅ Thanks for your feedback!
                </div>
              )}

              {status === 'error' && (
                <div className="status-message error">
                  ❌ Something went wrong. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}