import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiCode, FiLock, FiShield } from 'react-icons/fi';

type AuthLayoutProps = {
  title: string;
  description: string;
  children: ReactNode;
};

const features = [
  {
    icon: <FiLock aria-hidden="true" />,
    text: 'JWT based authentication',
  },
  {
    icon: <FiCode aria-hidden="true" />,
    text: 'React, TypeScript and Bootstrap',
  },
  {
    icon: <FiCheckCircle aria-hidden="true" />,
    text: 'Clean validation feedback',
  },
];

function AuthLayout({ title, description, children }: AuthLayoutProps) {
  return (
    <main className="auth-page">
      <div className="container">
        <div className="row min-vh-100 align-items-center justify-content-center g-4 py-4">
          <motion.section
            className="col-lg-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="auth-hero">
              <Link className="auth-logo" to="/signin" aria-label="AuthFlow sign in">
                <span className="auth-logo-icon" aria-hidden="true">
                  <FiShield />
                </span>
                <span>AuthFlow</span>
              </Link>

              <div className="auth-hero-copy">
                <p className="auth-eyebrow">MERN Authentication Project</p>
                <h1>{title}</h1>
                <p>{description}</p>
              </div>

              <div className="auth-illustration" aria-hidden="true">
                <motion.div
                  className="auth-illustration-card"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span />
                  <span />
                  <span />
                </motion.div>
              </div>

              <div className="auth-feature-list">
                {features.map((feature) => (
                  <div className="auth-feature-item" key={feature.text}>
                    {feature.icon}
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section
            className="col-md-10 col-lg-6 col-xl-5"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.08 }}
          >
            {children}
          </motion.section>
        </div>
      </div>
    </main>
  );
}

export default AuthLayout;
