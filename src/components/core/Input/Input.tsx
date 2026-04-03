import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import styles from './input.module.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string[];
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const inputClasses = [
      styles.input,
      leftIcon && styles['left-icon'],
      rightIcon && styles['right-icon'],
      error && styles['is-error'],
    ]
      .filter(Boolean)
      .join(' ');
    return (
      <div className={styles.input__wrapper}>
        {label && (
          <label htmlFor={inputId} className={styles.input__label}>
            {label}
            {props.required && <span className={styles['input__label-required']}>*</span>}
          </label>
        )}

        <div className={styles.input__container}>
          {leftIcon && <span className={`${styles.input__icon} ${styles.left}`}>{leftIcon}</span>}

          <input ref={ref} id={inputId} className={inputClasses} {...props} />

          {rightIcon && <span className={`${styles.input__icon} ${styles.right}`}>{rightIcon}</span>}
        </div>

        {error && (
          <ul className={styles.input__error}>
            {error.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        )}
        {helperText && !error && <span className={styles.input__helper}>{helperText}</span>}
      </div>
    );
  },
);

Input.displayName = 'Input';
