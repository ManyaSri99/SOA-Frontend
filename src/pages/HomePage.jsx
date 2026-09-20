import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import RoomCard from '../components/RoomCard';
import { roomService } from '../services/roomService';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      label: 'Grand escapes',
      title: 'Find your next perfect stay in minutes.',
      description: 'Discover modern rooms, smart pricing, and effortless booking experiences across every destination.',
      background: 'linear-gradient(135deg, rgba(9,15,35,0.8), rgba(30,64,175,0.78))'
    },
    {
      label: 'Weekend picks',
      title: 'Book a stylish stay for your next break.',
      description: 'From riverfront escapes to business-ready suites, discover the perfect room for your pace.',
      background: 'linear-gradient(135deg, rgba(11,37,66,0.82), rgba(14,165,233,0.78))'
    },
    {
      label: 'Premium living',
      title: 'Comfort, convenience and memorable city stays.',
      description: 'Enjoy premium features, flexible check-ins and unforgettable hospitality in the places you love.',
      background: 'linear-gradient(135deg, rgba(36,36,74,0.82), rgba(99,102,241,0.72))'
    }
  ];

  const highlights = [
    { label: 'Cities', value: '18+' },
    { label: 'Rooms', value: '1.2k' },
    { label: 'Guest rating', value: '4.9/5' }
  ];

  const featuredCities = [
    { city: 'Vijayawada', tag: 'Riverfront', staying: '₹2,399 / night' },
    { city: 'Mangalgiri', tag: 'Heritage stay', staying: '₹1,899 / night' },
    { city: 'Gooty', tag: 'Hill views', staying: '₹2,199 / night' },
    { city: 'Tenali', tag: 'Business hub', staying: '₹2,299 / night' }
  ];

  const guestFeatures = ['Instant room discovery', 'Smart pricing and stays', 'Flexible booking flow'];

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await roomService.getRooms({ limit: 6 });
        setRooms(Array.isArray(response) ? response : response.content || []);
      } catch (error) {
        console.error('Failed to load rooms', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setActiveSlide((current) => (current + 1) % slides.length);
  const prevSlide = () => setActiveSlide((current) => (current - 1 + slides.length) % slides.length);

  return (
    <div className="home-page">
      <section className="travel-banner">
        <div className="travel-banner-inner" style={{ background: slides[activeSlide].background }}>
          <div className="travel-banner-content">
            <div className="banner-copy">
              <span className="eyebrow">{slides[activeSlide].label}</span>
              <h1>{slides[activeSlide].title}</h1>
              <p>{slides[activeSlide].description}</p>
              <div className="hero-actions">
                <Link className="btn btn-primary" to="/search">Explore Rooms</Link>
                <Link className="btn btn-light" to="/login">Login</Link>
                <Link className="btn btn-outline btn-light-outline" to="/register">Register</Link>
              </div>
              <div className="hero-stats">
                {highlights.map((item) => (
                  <div key={item.label} className="stat-pill">
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="banner-visual" aria-label="Hotel building illustration">
              <div className="banner-visual-card card-top">
                <span className="mini-tag">Available</span>
                <strong>Business Studio</strong>
                <small>₹3,199 / night</small>
              </div>

              <div className="building-scene">
                <div className="building-glow" />
                <div className="building-block">
                  <span className="window" />
                  <span className="window" />
                  <span className="window" />
                  <span className="window" />
                  <span className="window" />
                  <span className="window" />
                  <span className="window" />
                  <span className="window" />
                  <span className="window" />
                  <span className="window" />
                  <span className="window" />
                  <span className="window" />
                </div>
                <div className="building-door" />
              </div>

              <div className="banner-visual-card card-bottom">
                <span className="mini-tag success">Smart pick</span>
                <strong>City View Suite</strong>
                <small>₹2,499 / night</small>
              </div>
            </div>
          </div>

          <div className="banner-controls">
            <button type="button" className="carousel-btn" onClick={prevSlide} aria-label="Previous slide">‹</button>
            <div className="slide-dots" aria-label="Slideshow navigation">
              {slides.map((slide, index) => (
                <button
                  key={slide.label}
                  type="button"
                  className={index === activeSlide ? 'dot active' : 'dot'}
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Show slide ${index + 1}`}
                />
              ))}
            </div>
            <button type="button" className="carousel-btn" onClick={nextSlide} aria-label="Next slide">›</button>
          </div>
        </div>
      </section>

      <section className="popular-destinations">
        <div className="section-header compact-header">
          <div>
            <span className="eyebrow eyebrow-dark">Stay in style</span>
            <h2>Choose a destination that fits your pace</h2>
          </div>
          <Link to="/search">Browse all stays</Link>
        </div>

        <div className="destination-track">
          {featuredCities.map((item) => (
            <div key={item.city} className="destination-card">
              <div className="destination-visual" />
              <div className="destination-copy">
                <span>{item.tag}</span>
                <strong>{item.city}</strong>
                <small>{item.staying}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="feature-panel">
        <div className="feature-copy">
          <span className="eyebrow eyebrow-dark">Why guests choose us</span>
          <h2>Comfortable stays, smarter booking, simpler trips.</h2>
        </div>
        <ul className="feature-list">
          {guestFeatures.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </section>

      <section className="section-block">
        <div className="section-header">
          <h2>Featured rooms</h2>
          <Link to="/search">View all</Link>
        </div>
        {loading ? <LoadingSpinner label="Loading rooms..." /> : (
          <div className="rooms-grid">
            {rooms.map((room) => (
              <RoomCard key={room.id || room.roomId} room={room} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
