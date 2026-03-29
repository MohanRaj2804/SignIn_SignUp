import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import { useEffect, useState } from 'react';

function Home() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('User');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Get user name from localStorage if available
    const token = localStorage.getItem('token');
    const userInfo = localStorage.getItem('user');
    
    if (!token || !userInfo) {
      navigate('/signin');
      return;
    }

    const user = JSON.parse(userInfo);
    setUserName(user.name || 'User');

    // Handle scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  return (
    <div className="home-container">
      {/* Navigation */}
      <nav className={`navbar navbar-expand-lg navbar-dark custom-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container-fluid px-4">
          <Link className="navbar-brand fw-bold" to="/">
            <span className="brand-icon">🚀</span>
            <span className="brand-text">Premium</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#features">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">About</a>
              </li>
              <li className="nav-item">
                <button className="btn btn-logout ms-2" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="greeting-box">
            <h1 className="hero-title">
              Welcome Back, <span className="user-name">{userName}</span>! 👋
            </h1>
            <p className="hero-subtitle">
              Experience the power of seamless authentication and premium features
            </p>
          </div>

          <div className="hero-buttons">
            <button className="btn btn-primary-custom btn-lg">
              Explore Features
            </button>
            <button className="btn btn-secondary-custom btn-lg">
              Learn More
            </button>
          </div>

          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>

        <div className="hero-illustration">
          <div className="illustration-card">
            <div className="card-icon">⭐</div>
            <div className="card-text">Secure</div>
          </div>
          <div className="illustration-card">
            <div className="card-icon">⚡</div>
            <div className="card-text">Fast</div>
          </div>
          <div className="illustration-card">
            <div className="card-icon">🎯</div>
            <div className="card-text">Reliable</div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4 stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="col-md-4 stat-item">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Uptime</div>
            </div>
            <div className="col-md-4 stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className="container">
          <div className="section-header">
            <h2>Our Features</h2>
            <div className="header-underline"></div>
          </div>

          <div className="row g-4">
            {/* Feature Card 1 */}
            <div className="col-md-6 col-lg-4">
              <div className="feature-card">
                <div className="feature-icon">🔐</div>
                <h3 className="feature-title">Secure Authentication</h3>
                <p className="feature-description">
                  Enterprise-grade security with JWT tokens and bcrypt password hashing
                </p>
                <div className="feature-link">Learn more →</div>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="col-md-6 col-lg-4">
              <div className="feature-card">
                <div className="feature-icon">⚙️</div>
                <h3 className="feature-title">Easy Setup</h3>
                <p className="feature-description">
                  Simple and intuitive interface that takes minutes to set up
                </p>
                <div className="feature-link">Learn more →</div>
              </div>
            </div>

            {/* Feature Card 3 */}
            <div className="col-md-6 col-lg-4">
              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h3 className="feature-title">Responsive Design</h3>
                <p className="feature-description">
                  Works seamlessly on all devices, from mobile to desktop
                </p>
                <div className="feature-link">Learn more →</div>
              </div>
            </div>

            {/* Feature Card 4 */}
            <div className="col-md-6 col-lg-4">
              <div className="feature-card">
                <div className="feature-icon">🚀</div>
                <h3 className="feature-title">Lightning Fast</h3>
                <p className="feature-description">
                  Optimized performance with zero compromise on speed
                </p>
                <div className="feature-link">Learn more →</div>
              </div>
            </div>

            {/* Feature Card 5 */}
            <div className="col-md-6 col-lg-4">
              <div className="feature-card">
                <div className="feature-icon">🔧</div>
                <h3 className="feature-title">Developer Friendly</h3>
                <p className="feature-description">
                  Clean APIs and comprehensive documentation for developers
                </p>
                <div className="feature-link">Learn more →</div>
              </div>
            </div>

            {/* Feature Card 6 */}
            <div className="col-md-6 col-lg-4">
              <div className="feature-card">
                <div className="feature-icon">🌟</div>
                <h3 className="feature-title">Premium Support</h3>
                <p className="feature-description">
                  Dedicated support team available round the clock
                </p>
                <div className="feature-link">Learn more →</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section" id="about">
        <div className="container">
          <div className="section-header">
            <h2>About Us</h2>
            <div className="header-underline"></div>
          </div>

          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="about-content">
                <h3>Why Choose Premium?</h3>
                <p>
                  We provide industry-leading authentication solutions trusted by thousands of developers worldwide. 
                  Our platform combines security, performance, and simplicity into one powerful package.
                </p>
                <ul className="about-list">
                  <li>✓ Industry-leading security standards</li>
                  <li>✓ 99.9% uptime guarantee</li>
                  <li>✓ Scalable infrastructure</li>
                  <li>✓ Global edge network</li>
                </ul>
                <button className="btn btn-primary-custom btn-lg mt-4">
                  Get Started
                </button>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="about-illustration">
                <div className="illustration-box">
                  <div className="illustration-item item-1">📊</div>
                  <div className="illustration-item item-2">🔒</div>
                  <div className="illustration-item item-3">💡</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to get started?</h2>
          <p>Join thousands of developers using Premium today</p>
          <div className="cta-buttons">
            <button className="btn btn-light btn-lg">
              Explore Now
            </button>
            <button className="btn btn-outline-light btn-lg">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4 footer-section">
              <h5>Premium</h5>
              <p>Enterprise authentication at scale</p>
            </div>
            <div className="col-md-4 footer-section">
              <h5>Quick Links</h5>
              <ul className="footer-links">
                <li><a href="#features">Features</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#">Documentation</a></li>
              </ul>
            </div>
            <div className="col-md-4 footer-section">
              <h5>Connect</h5>
              <div className="social-links">
                <a href="#" className="social-icon">f</a>
                <a href="#" className="social-icon">t</a>
                <a href="#" className="social-icon">in</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2026 Premium. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
