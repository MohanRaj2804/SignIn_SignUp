import { Link, useNavigate } from 'react-router-dom';
import './SignIn.css';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import axios from 'axios';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import {
  FiAlertCircle,
  FiArrowRight,
  FiCheckCircle,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiShield,
} from 'react-icons/fi';

const pageVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const liftVariants: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/signin`, {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      navigate('/home');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.message || 'SignIn failed');
      } else {
        setError('Something went wrong. Try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.main className="auth-page" variants={pageVariants} initial="hidden" animate="show">
      <span className="auth-ribbon auth-ribbon--one" aria-hidden="true" />
      <span className="auth-ribbon auth-ribbon--two" aria-hidden="true" />

      <motion.div className="auth-shell auth-shell--signin" variants={liftVariants}>
        <section className="auth-hero" aria-labelledby="signin-hero-title">
          <motion.div variants={liftVariants}>
            <Link className="auth-brand" to="/signin" aria-label="AuthFlow sign in">
              <span className="auth-brand__mark" aria-hidden="true">
                <FiShield />
              </span>
              <span>AuthFlow</span>
            </Link>
          </motion.div>

          <motion.div variants={liftVariants}>
            <span className="auth-eyebrow">
              <FiShield aria-hidden="true" />
              Secure access
            </span>
            <h1 className="auth-title" id="signin-hero-title">
              Welcome back
              <span className="auth-title__accent">to your workspace.</span>
            </h1>
            <p className="auth-copy">
              A calm, premium authentication surface built around the same email and password flow
              your backend already supports.
            </p>
            <div className="auth-hero-actions">
              <Link to="/signup" className="auth-hero-link">
                Create account <FiArrowRight aria-hidden="true" />
              </Link>
            </div>
          </motion.div>

          <motion.div className="auth-feature-grid" variants={liftVariants}>
            <div className="auth-feature">
              <FiLock aria-hidden="true" />
              <strong>Encrypted</strong>
              <span>JWT-secured credential flow.</span>
            </div>
            <div className="auth-feature">
              <FiCheckCircle aria-hidden="true" />
              <strong>Validated</strong>
              <span>Client-side checks on every field.</span>
            </div>
            <div className="auth-feature">
              <FiShield aria-hidden="true" />
              <strong>Protected</strong>
              <span>bcrypt password hashing.</span>
            </div>
          </motion.div>
        </section>

        <section className="auth-card-panel" aria-labelledby="signin-title">
          <motion.div className="auth-card" variants={liftVariants}>
            <header className="auth-card__header">
              <p className="auth-kicker">
                <FiShield aria-hidden="true" />
                Sign in
              </p>
              <h2 id="signin-title">Access your account</h2>
              <p>Enter your registered email and password.</p>
            </header>

            <form onSubmit={handleSubmit} className="auth-form" noValidate>
              <motion.div className="auth-floating-field" variants={liftVariants}>
                <FiMail className="auth-field-icon" aria-hidden="true" />
                <input
                  type="email"
                  className="auth-input"
                  id="signin-email"
                  name="email"
                  placeholder=" "
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? 'signin-error' : undefined}
                  autoComplete="email"
                  required
                />
                <label htmlFor="signin-email">Email address</label>
              </motion.div>

              <motion.div className="auth-floating-field" variants={liftVariants}>
                <FiLock className="auth-field-icon" aria-hidden="true" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="auth-input"
                  id="signin-password"
                  name="password"
                  placeholder=" "
                  value={formData.password}
                  onChange={handleChange}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? 'signin-error' : undefined}
                  autoComplete="current-password"
                  required
                />
                <label htmlFor="signin-password">Password</label>
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
                </button>
              </motion.div>

              <div className="auth-row">
                <label className="auth-check">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
                <a href="#" className="auth-forgot" onClick={(e) => e.preventDefault()}>
                  Forgot password?
                </a>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    id="signin-error"
                    className="auth-alert auth-alert--error"
                    role="alert"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: [0, -8, 8, -4, 0] }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.32 }}
                  >
                    <FiAlertCircle aria-hidden="true" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                className="auth-button"
                disabled={loading}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <>
                    <span className="auth-spinner" aria-hidden="true" />
                    Signing in
                  </>
                ) : (
                  <>
                    Sign in <FiArrowRight aria-hidden="true" />
                  </>
                )}
              </motion.button>
            </form>

            <p className="auth-footer">
              New here? <Link to="/signup">Create an account</Link>
            </p>
          </motion.div>
        </section>
      </motion.div>
    </motion.main>
  );
}

export default SignIn;
