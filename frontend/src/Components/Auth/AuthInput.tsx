import type { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

type AuthInputProps = {
  icon: ReactNode;
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperId?: string;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
} & Pick<InputHTMLAttributes<HTMLInputElement>, 'type' | 'placeholder' | 'autoComplete' | 'required'>;

function AuthInput({
  icon,
  id,
  label,
  name,
  value,
  onChange,
  error = false,
  helperId,
  showPasswordToggle = false,
  showPassword = false,
  onTogglePassword,
  type = 'text',
  placeholder,
  autoComplete,
  required,
}: AuthInputProps) {
  return (
    <div className="auth-field">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <div className="auth-input-group">
        <span className="auth-input-icon" aria-hidden="true">
          {icon}
        </span>
        <input
          className={`form-control auth-input ${error ? 'is-invalid' : ''}`}
          id={id}
          name={name}
          type={showPasswordToggle ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          aria-invalid={error}
          aria-describedby={helperId}
          autoComplete={autoComplete}
          required={required}
        />
        {showPasswordToggle && (
          <button
            type="button"
            className="auth-password-btn"
            onClick={onTogglePassword}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
          </button>
        )}
      </div>
    </div>
  );
}

export default AuthInput;
