import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import styles from './button.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const variantClasses = {
      primary: styles['variant-primary'],
      secondary: styles['variant-secondary'],
      outline: styles['variant-outline'],
      ghost: styles['variant-ghost'],
      danger: styles['variant-danger'],
    };
    const sizeClasses = {
      sm: styles['size-sm'],
      md: styles['size-md'],
      lg: styles['size-lg'],
    };

    const classes = [
      styles.button,
      variantClasses[variant],
      sizeClasses[size],
      isLoading && styles['is-loading'],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button ref={ref} disabled={isLoading || disabled} className={classes} {...props}>
        {isLoading && <span className={styles.spinner} />}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
