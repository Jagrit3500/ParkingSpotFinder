import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
      setIsSubmitting(false);
      return;
    }
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };
  
  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p className="lead">We'd love to hear from you. Get in touch with our team.</p>
        </div>
      </section>
      
      <section className="contact-info">
        <div className="container">
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
              <p className="info-note">Available Mon-Fri, 9am-6pm</p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3>Email</h3>
              <p>support@parkingspotfinder.com</p>
              <p className="info-note">We'll respond within 24 hours</p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3>Office</h3>
              <p>123 Parking Avenue, Suite 456<br />San Francisco, CA 94107</p>
              <p className="info-note">Open for appointments only</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="contact-form-section">
        <div className="container">
          <div className="form-container">
            <div className="form-header">
              <h2>Send us a message</h2>
              <p>Fill out the form below and we'll get back to you as soon as possible.</p>
            </div>
            
            {submitSuccess ? (
              <div className="success-message">
                <div className="success-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3>Message Sent!</h3>
                <p>Thank you for your message. We'll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                {error && <div className="error-message">{error}</div>}
                
                <div className="form-group">
                  <label htmlFor="name">Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please provide details about your inquiry..."
                    rows="5"
                    required
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="submit-button" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
      
      <section className="map-section">
        <div className="map-container">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0558009376115!2d-122.4159095!3d37.7749295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808580867397afc9%3A0xa3d65202344afef0!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1631739053597!5m2!1sen!2s" 
            width="100%" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy"
            title="Office Location"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default Contact; 