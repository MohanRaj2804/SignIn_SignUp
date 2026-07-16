import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import { useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import axios from 'axios';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import {
  FiAlertCircle,
  FiArrowRight,
  FiCheckCircle,
  FiEye,
  FiEyeOff,
  FiKey,
  FiLock,
  FiMail,
  FiShield,
  FiUser,
  FiUserPlus,
} from 'react-icons/fi';

const pageVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.06,
    },
  },
};

const liftVariants: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const strengthLabels = ['Add a password', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'];
const strengthClasses = ['empty', 'weak', 'fair', 'good', 'strong', 'excellent'];

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const navigate = useNavigate();

  const passwordStrength = useMemo(() => {
    const value = formData.password;
    const checks = [
      value.length >= 6,
      value.length >= 10,
      /[a-z]/.test(value) && /[A-Z]/.test(value),
      /\d/.test(value),
      /[^A-Za-z0-9]/.test(value),
    ];
    const score = checks.filter(Boolean).length;

    return {
      score,
      label: value ? strengthLabels[score] : strengthLabels[0],
      className: strengthClasses[score],
      width: value ? `${Math.max(score, 1) * 20}%` : '0%',
    };
  }, [formData.password]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updated = { ...formData, [e.target.name]: e.target.value };
    setFormData(updated);

    if (e.target.name === 'confirmPassword' || e.target.name === 'password') {
      setPasswordMatch(updated.password === updated.confirmPassword);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/signup`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      navigate('/home');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.message || 'Registration failed.');
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

      <motion.div className="auth-shell auth-shell--signup" variants={liftVariants}>
        <section className="auth-hero" aria-labelledby="signup-hero-title">
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
              <FiUserPlus aria-hidden="true" />
              New secure account
            </span>
            <h1 className="auth-title" id="signup-hero-title">
              Create access
              <span className="auth-title__accent">with intention.</span>
            </h1>
            <p className="auth-copy">
              A focused registration experience that keeps the existing backend payload exactly as it is:
              name, email, and password.
            </p>
            <div className="auth-hero-actions">
              <Link to="/signin" className="auth-hero-link">
                Already have an account <FiArrowRight aria-hidden="true" />
              </Link>
            </div>
          </motion.div>

          <motion.div className="auth-feature-grid" variants={liftVariants}>
            <div className="auth-feature">
              <FiKey aria-hidden="true" />
              <strong>Strength meter</strong>
              <span>Visual password guidance.</span>
            </div>
            <div className="auth-feature">
              <FiShield aria-hidden="true" />
              <strong>Secure</strong>
              <span>JWT + bcrypt protected.</span>
            </div>
            <div className="auth-feature">
              <FiUserPlus aria-hidden="true" />
              <strong>Simple</strong>
              <span>Name, email, password only.</span>
            </div>
          </motion.div>
        </section>

        <section className="auth-card-panel" aria-labelledby="signup-title">
          <motion.div className="auth-card" variants={liftVariants}>
            <header className="auth-card__header">
              <p className="auth-kicker">
                <FiUserPlus aria-hidden="true" />
                Sign up
              </p>
              <h2 id="signup-title">Create your account</h2>
              <p>Complete the fields below to register.</p>
            </header>

            <form onSubmit={handleSubmit} className="auth-form" noValidate>
              <motion.div className="auth-floating-field" variants={liftVariants}>
                <FiUser className="auth-field-icon" aria-hidden="true" />
                <input
                  type="text"
                  className="auth-input"
                  id="signup-name"
                  name="name"
                  placeholder=" "
                  value={formData.name}
                  onChange={handleChange}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? 'signup-error' : undefined}
                  autoComplete="name"
                  required
                />
                <label htmlFor="signup-name">Full name</label>
              </motion.div>

              <motion.div className="auth-floating-field" variants={liftVariants}>
                <FiMail className="auth-field-icon" aria-hidden="true" />
                <input
                  type="email"
                  className="auth-input"
                  id="signup-email"
                  name="email"
                  placeholder=" "
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? 'signup-error' : undefined}
                  autoComplete="email"
                  required
                />
                <label htmlFor="signup-email">Email address</label>
              </motion.div>

              <motion.div className="auth-floating-field" variants={liftVariants}>
                <FiLock className="auth-field-icon" aria-hidden="true" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="auth-input"
                  id="signup-password"
                  name="password"
                  placeholder=" "
                  value={formData.password}
                  onChange={handleChange}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? 'signup-error signup-strength' : 'signup-strength'}
                  autoComplete="new-password"
                  required
                />
                <label htmlFor="signup-password">Password</label>
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
                </button>
              </motion.div>

              <div
                className="auth-strength"
                id="signup-strength"
                role="meter"
                aria-valuemin={0}
                aria-valuemax={5}
                aria-valuenow={passwordStrength.score}
                aria-label={`Password strength: ${passwordStrength.label}`}
              >
                <div className="auth-strength__meta">
                  <span>Password strength</span>
                  <strong>{passwordStrength.label}</strong>
                </div>
                <div className="auth-strength__track">
                  <span
                    className={`auth-strength__bar auth-strength__bar--${passwordStrength.className}`}
                    style={{ width: passwordStrength.width }}
                  />
                </div>
              </div>

              <motion.div className="auth-floating-field" variants={liftVariants}>
                <FiKey className="auth-field-icon" aria-hidden="true" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="auth-input"
                  id="signup-confirm-password"
                  name="confirmPassword"
                  placeholder=" "
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  aria-invalid={Boolean(formData.confirmPassword && !passwordMatch)}
                  aria-describedby={error ? 'signup-error' : undefined}
                  autoComplete="new-password"
                  required
                />
                <label htmlFor="signup-confirm-password">Confirm password</label>
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowConfirmPassword((current) => !current)}
                  aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                >
                  {showConfirmPassword ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
                </button>
              </motion.div>

              <AnimatePresence>
                {formData.confirmPassword && (
                  <motion.div
                    className={`auth-match ${passwordMatch ? 'auth-match--ok' : 'auth-match--bad'}`}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                  >
                    {passwordMatch ? <FiCheckCircle aria-hidden="true" /> : <FiAlertCircle aria-hidden="true" />}
                    <span>{passwordMatch ? 'Passwords match' : 'Passwords do not match'}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {error && (
                  <motion.div
                    id="signup-error"
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
                    Creating account
                  </>
                ) : (
                  <>
                    Create account <FiArrowRight aria-hidden="true" />
                  </>
                )}
              </motion.button>
            </form>

            <p className="auth-footer">
              Already have an account? <Link to="/signin">Sign in</Link>
            </p>
          </motion.div>
        </section>
      </motion.div>
    </motion.main>
  );
}

export default SignUp;
