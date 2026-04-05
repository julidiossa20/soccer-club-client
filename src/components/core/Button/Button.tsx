import { useFormStatus } from 'react-dom';
import type { ButtonHTMLAttributes, Ref } from 'react';
import styles from './button.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  ref?: Ref<HTMLButtonElement>;
}

export const Button = ({
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading: propLoading,
  children,
  disabled,
  ref,
  ...props
}: ButtonProps) => {
  const { pending } = useFormStatus();
  const isLoading = propLoading ?? (props.type === 'submit' && pending);

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
};

Button.displayName = 'Button';
