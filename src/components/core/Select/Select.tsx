import type { SelectHTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';
import styles from './select.module.css';

export interface Option {
  label: string;
  value: string | number;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Option[];
  helperText?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', label, error, helperText, options, id, ...props }, ref) => {
    const generatedId = useId();
    const selectId = id || generatedId;
    const selectClasses = [styles.select, error && styles['is-error'], className].filter(Boolean).join(' ');

    return (
      <div className={styles.wrapper}>
        {label && (
          <label htmlFor={selectId} className={styles.label}>
            {label}
            {props.required && <span className={styles.required}>*</span>}
          </label>
        )}

        <div className={styles.container}>
          <select ref={ref} id={selectId} className={selectClasses} {...props}>
            <option value='' disabled hidden>
              Selecciona una opción
            </option>
            {options.map((opt) => (
              <option key={String(opt.value)} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className={styles.caret} />
        </div>

        {error && <span className={styles.error}>{error}</span>}
        {helperText && !error && <span className={styles.helper}>{helperText}</span>}
      </div>
    );
  },
);

Select.displayName = 'Select';
