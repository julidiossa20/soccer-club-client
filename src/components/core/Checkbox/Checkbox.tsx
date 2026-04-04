import type { InputHTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';
import styles from './checkbox.module.css';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = '', label, error, id, ...props }, ref) => {
    const generatedId = useId();
    const checkboxId = id || generatedId;
    const checkboxClasses = [styles.checkbox, error && styles['is-error'], className].filter(Boolean).join(' ');

    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <input ref={ref} type='checkbox' id={checkboxId} className={checkboxClasses} {...props} />
          <label htmlFor={checkboxId} className={styles.label}>
            {label}
          </label>
        </div>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';
