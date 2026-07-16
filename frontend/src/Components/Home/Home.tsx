import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import { useEffect, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  FiActivity,
  FiArrowRight,
  FiBarChart2,
  FiCheckCircle,
  FiCode,
  FiCpu,
  FiDatabase,
  FiGlobe,
  FiGrid,
  FiLock,
  FiLogOut,
  FiShield,
  FiSmartphone,
  FiZap,
} from 'react-icons/fi';

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const features = [
  {
    icon: <FiLock aria-hidden="true" />,
    title: 'Secure authentication',
    description: 'JWT-backed access with the existing bcrypt-protected credential flow.',
  },
  {
    icon: <FiCpu aria-hidden="true" />,
    title: 'Fast interface',
    description: 'A responsive frontend surface tuned for quick, repeated sign-in workflows.',
  },
  {
    icon: <FiSmartphone aria-hidden="true" />,
    title: 'Device ready',
    description: 'Layouts stay usable across desktop, tablet, and mobile breakpoints.',
  },
  {
    icon: <FiCode aria-hidden="true" />,
    title: 'Developer friendly',
    description: 'Frontend improvements sit cleanly on top of the current API contract.',
  },
  {
    icon: <FiDatabase aria-hidden="true" />,
    title: 'Data aligned',
    description: 'The UI continues to consume the same user object stored after login.',
  },
  {
    icon: <FiGlobe aria-hidden="true" />,
    title: 'Scalable shell',
    description: 'Reusable patterns make it easier to extend the authenticated experience.',
  },
];

function Home() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('User');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userInfo = localStorage.getItem('user');

    if (!token || !userInfo) {
      navigate('/signin');
      return;
    }

    const user = JSON.parse(userInfo);
    setUserName(user.name || 'User');

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
    <div className="home-page">
      <nav className={`navbar navbar-expand-lg home-nav ${isScrolled ? 'home-nav--scrolled' : ''}`}>
        <div className="container-fluid px-4">
          <Link className="home-brand" to="/home">
            <span className="home-brand__mark" aria-hidden="true">
              <FiShield />
            </span>
            <span>AuthFlow</span>
          </Link>
          <button
            className="navbar-toggler home-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <FiGrid aria-hidden="true" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-lg-center">
              <li className="nav-item">
                <a className="nav-link active" href="#features">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <button className="home-logout" onClick={handleLogout}>
                  <FiLogOut aria-hidden="true" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main>
        <section className="home-hero">
          <span className="home-ribbon home-ribbon--one" aria-hidden="true" />
          <span className="home-ribbon home-ribbon--two" aria-hidden="true" />

          <motion.div
            className="home-hero__content"
            variants={sectionVariants}
            initial="hidden"
            animate="show"
          >
            <div className="home-eyebrow">
              <FiActivity aria-hidden="true" />
              Authenticated workspace
            </div>
            <h1>
              Welcome back, <span>{userName}</span>
            </h1>
            <p>
              Your session is active. This dashboard keeps the same authentication behavior while
              presenting a cleaner, premium frontend shell.
            </p>
            <div className="home-actions">
              <a className="home-button home-button--primary" href="#features">
                Explore features <FiArrowRight aria-hidden="true" />
              </a>
              <a className="home-button home-button--secondary" href="#about">
                Learn more
              </a>
            </div>
          </motion.div>

          <motion.div
            className="home-status"
            variants={sectionVariants}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.12 }}
          >
            <div className="home-status__header">
              <span>Session health</span>
              <FiCheckCircle aria-hidden="true" />
            </div>
            <div className="home-status__signal" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <dl className="home-status__list">
              <div>
                <dt>Token</dt>
                <dd>Stored</dd>
              </div>
              <div>
                <dt>User</dt>
                <dd>Resolved</dd>
              </div>
              <div>
                <dt>Route</dt>
                <dd>Protected</dd>
              </div>
            </dl>
          </motion.div>
        </section>

        <section className="home-stats" aria-label="Platform stats">
          <div className="home-stat">
            <strong>10K+</strong>
            <span>Active users</span>
          </div>
          <div className="home-stat">
            <strong>99.9%</strong>
            <span>Uptime</span>
          </div>
          <div className="home-stat">
            <strong>24/7</strong>
            <span>Support</span>
          </div>
        </section>

        <section className="home-section" id="features">
          <div className="home-section__header">
            <span>Features</span>
            <h2>Authentication UI that feels deliberate.</h2>
          </div>
          <div className="home-feature-grid">
            {features.map((feature) => (
              <motion.article
                className="home-feature"
                key={feature.title}
                variants={sectionVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="home-feature__icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="home-section home-about" id="about">
          <div>
            <div className="home-section__header home-section__header--left">
              <span>About</span>
              <h2>Built around the backend you already have.</h2>
            </div>
            <p>
              The frontend now emphasizes clarity, motion, accessibility, and responsiveness while
              leaving routes, payloads, token storage, and logout behavior exactly where users expect
              them.
            </p>
          </div>

          <div className="home-about__panel">
            <div>
              <FiShield aria-hidden="true" />
              <span>Existing auth API</span>
            </div>
            <div>
              <FiBarChart2 aria-hidden="true" />
              <span>Premium visual system</span>
            </div>
            <div>
              <FiZap aria-hidden="true" />
              <span>Responsive interactions</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <span>AuthFlow</span>
        <p>&copy; 2026 Premium. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
