import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqCategories = [
    {
      title: "General Questions",
      faqs: [
        {
          question: "What is Parking Spot Finder?",
          answer: "Parking Spot Finder is a platform that connects drivers with available parking spaces in real-time. Our service allows you to find, reserve, and pay for parking spots in advance or on-the-go, saving you time and reducing the stress of finding parking in busy areas."
        },
        {
          question: "How does Parking Spot Finder work?",
          answer: "Our platform uses real-time data from parking facilities, street sensors, and user reports to show available parking spots on a map. Users can search for parking near their destination, compare prices, reserve spots, and navigate directly to their chosen location. You can make reservations ahead of time or find a spot when you need it."
        },
        {
          question: "Is Parking Spot Finder available in my city?",
          answer: "We currently operate in over 50 major cities across the country and are continuously expanding. Check our app or website for the most up-to-date list of locations where our service is available. If we're not in your city yet, sign up for notifications, and we'll let you know when we arrive!"
        },
        {
          question: "Do I need to create an account to use Parking Spot Finder?",
          answer: "While you can browse available parking spots without an account, you'll need to create one to make reservations and payments. Account creation is free, quick, and only requires basic information and a valid payment method for bookings."
        }
      ]
    },
    {
      title: "Reservations & Bookings",
      faqs: [
        {
          question: "How far in advance can I book a parking spot?",
          answer: "Most parking locations allow bookings up to 30 days in advance, though this can vary depending on the specific facility. Some locations may offer booking windows as short as same-day only or as long as several months. The booking window will be clearly displayed when you select a parking location."
        },
        {
          question: "Can I cancel my parking reservation?",
          answer: "Yes, you can cancel a reservation through your account. Our cancellation policy varies by location and how far in advance you cancel. Many locations offer full refunds if canceled more than 24 hours in advance, while others may have different policies. The specific cancellation terms will be shown before you complete your booking."
        },
        {
          question: "What happens if I arrive earlier or stay later than my reservation?",
          answer: "If you arrive earlier than your reservation time, you may need to wait until your reserved spot becomes available, or you might be subject to standard hourly rates for the additional time. If you stay longer than your reservation, additional charges will typically apply based on the location's standard rates. You can often extend your reservation through the app if needed."
        },
        {
          question: "How do I access my reserved parking spot?",
          answer: "After making a reservation, you'll receive a QR code or access code in your email and app. For garages and lots, you'll typically scan this code at the entrance or enter it at a kiosk. For some locations, your license plate may be automatically recognized. Specific access instructions will be provided with your reservation confirmation."
        }
      ]
    },
    {
      title: "Payments & Pricing",
      faqs: [
        {
          question: "How does pricing work?",
          answer: "Pricing varies by location, time of day, and duration. We display the exact price before you confirm your booking, with no hidden fees. Some locations offer discounted rates for advance bookings or longer durations. You can compare prices across different parking options to find the best deal for your needs."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit and debit cards, including Visa, MasterCard, American Express, and Discover. Many locations also support digital wallets like Apple Pay, Google Pay, and PayPal. All payments are processed securely through our encrypted payment system."
        },
        {
          question: "Do I get a receipt for my parking?",
          answer: "Yes, we automatically email a receipt to the address associated with your account after each transaction. You can also view and download all your receipts from the 'Transaction History' section of your account dashboard."
        },
        {
          question: "Is there a fee to use Parking Spot Finder?",
          answer: "Our basic service is free to use. We may charge a small convenience fee for some bookings, which will always be clearly displayed before you confirm your reservation. We also offer a premium subscription with additional benefits like discounted rates and priority reservations."
        }
      ]
    },
    {
      title: "Technical Support",
      faqs: [
        {
          question: "The app isn't working properly. What should I do?",
          answer: "First, try closing and reopening the app. If that doesn't work, check that you have the latest version installed and that your device meets the minimum requirements. Clearing your cache or reinstalling the app often resolves most issues. If problems persist, contact our support team with details about your device and the specific issue you're experiencing."
        },
        {
          question: "How do I report an incorrect parking spot listing?",
          answer: "If you notice any inaccuracies in a parking listing (price, availability, location, etc.), please use the 'Report Issue' button on the spot's detail page. Include as much detail as possible about what's incorrect, and our team will investigate and update the information accordingly."
        },
        {
          question: "What should I do if I can't access my reserved spot?",
          answer: "If you're having trouble accessing your reserved spot, first verify you're at the correct location using the directions in the app. If you're in the right place but still having issues, use the 'Get Help' button in the app for immediate assistance, or call the parking facility's direct number (available in your reservation details). Our support team is also available to help resolve access issues."
        },
        {
          question: "Can I use Parking Spot Finder on multiple devices?",
          answer: "Yes, you can log into your Parking Spot Finder account on multiple devices simultaneously. Your account information, reservations, and payment methods will sync across all devices. However, for security reasons, you may occasionally be asked to verify your identity when logging in from a new device."
        }
      ]
    }
  ];

  return (
    <div className="faq-page">
      <section className="faq-hero">
        <div className="container">
          <h1>Frequently Asked Questions</h1>
          <p className="lead">Find answers to the most common questions about Parking Spot Finder.</p>
        </div>
      </section>

      <section className="faq-content">
        <div className="container">
          <div className="faq-search">
            <input 
              type="text" 
              placeholder="Search for answers..." 
              className="search-input"
            />
            <button className="search-button">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          <div className="faq-categories">
            {faqCategories.map((category, categoryIndex) => (
              <div className="faq-category" key={categoryIndex}>
                <h2>{category.title}</h2>
                <div className="faq-list">
                  {category.faqs.map((faq, faqIndex) => {
                    const index = `${categoryIndex}-${faqIndex}`;
                    return (
                      <div 
                        className={`faq-item ${activeIndex === index ? 'active' : ''}`} 
                        key={index}
                      >
                        <div 
                          className="faq-question" 
                          onClick={() => toggleAccordion(index)}
                        >
                          <h3>{faq.question}</h3>
                          <span className="faq-icon">
                            {activeIndex === index ? 
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg> : 
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            }
                          </span>
                        </div>
                        <div className="faq-answer">
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-contact">
        <div className="container">
          <div className="contact-content">
            <h2>Didn't find an answer?</h2>
            <p>Our support team is here to help you with any other questions you might have.</p>
            <div className="contact-buttons">
              <a href="/contact" className="btn-primary">Contact Support</a>
              <a href="mailto:support@parkingspotfinder.com" className="btn-link">Email Us</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ; 