import type { TextareaHTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';
import styles from './textarea.module.css';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', label, error, helperText, id, rows = 4, ...props }, ref) => {
    const generatedId = useId();
    const textareaId = id || generatedId;
    const textareaClasses = [styles.textarea, error && styles['is-error'], className].filter(Boolean).join(' ');

    return (
      <div className={styles.wrapper}>
        {label && (
          <label htmlFor={textareaId} className={styles.label}>
            {label}
            {props.required && <span className={styles.required}>*</span>}
          </label>
        )}

        <textarea ref={ref} id={textareaId} rows={rows} className={textareaClasses} {...props} />

        {error && <span className={styles.error}>{error}</span>}
        {helperText && !error && <span className={styles.helper}>{helperText}</span>}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
