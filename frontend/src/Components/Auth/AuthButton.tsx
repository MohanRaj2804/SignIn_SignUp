import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

type AuthButtonProps = {
  children: ReactNode;
  loadingText: string;
  loading: boolean;
};

function AuthButton({ children, loadingText, loading }: AuthButtonProps) {
  return (
    <motion.button
      type="submit"
      className="btn btn-primary auth-submit-btn w-100"
      disabled={loading}
      whileHover={{ y: loading ? 0 : -1 }}
      whileTap={{ scale: loading ? 1 : 0.98 }}
    >
      {loading ? (
        <>
          <span className="spinner-border spinner-border-sm" aria-hidden="true" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </motion.button>
  );
}

export default AuthButton;
