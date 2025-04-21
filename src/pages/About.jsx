import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <h1>About Parking Spot Finder</h1>
          <p className="lead">Making parking simple and stress-free for everyone.</p>
        </div>
      </section>

      <section className="about-mission">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>At Parking Spot Finder, we're committed to solving one of urban life's most persistent challenges: finding a parking spot when you need it.</p>
              <p>Our mission is to connect drivers with available parking spaces in real-time, reducing traffic congestion, driver frustration, and environmental impact from cars circling for parking.</p>
            </div>
            <div className="mission-image">
              <img src="/images/mission.jpg" alt="Parking Spot Finder Mission" />
            </div>
          </div>
        </div>
      </section>

      <section className="about-story">
        <div className="container">
          <h2>Our Story</h2>
          <div className="story-timeline">
            <div className="timeline-item">
              <div className="timeline-year">2018</div>
              <div className="timeline-content">
                <h3>The Beginning</h3>
                <p>Parking Spot Finder was founded by a group of urban planners and software engineers who experienced firsthand the frustration of finding parking in busy city centers.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2019</div>
              <div className="timeline-content">
                <h3>Beta Launch</h3>
                <p>We launched our first pilot program in three cities, partnering with local parking garages and municipalities to test our technology.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2020</div>
              <div className="timeline-content">
                <h3>Nationwide Expansion</h3>
                <p>After a successful beta, we expanded to major metropolitan areas across the country, growing our network of parking partners.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2023</div>
              <div className="timeline-content">
                <h3>Today</h3>
                <p>Now serving over 50 cities with more than 500,000 monthly users, we continue to innovate and improve the parking experience.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="container">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3>Innovation</h3>
              <p>We're constantly exploring new technologies and approaches to make parking smarter and more efficient.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3>Fairness</h3>
              <p>We believe in transparent pricing and equal access to parking resources for all drivers.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3>Sustainability</h3>
              <p>Our services help reduce emissions by minimizing the time cars spend searching for parking.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3>Community</h3>
              <p>We work closely with local businesses, residents, and city officials to create parking solutions that benefit everyone.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 