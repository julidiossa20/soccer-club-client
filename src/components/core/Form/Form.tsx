import { Button } from '../Button/Button';
import { FormField } from './FormField';
import type { FormProps, SchemaField } from './types';

import styles from './form.module.css';

export const Form = <T extends SchemaField[]>({
  schema,
  values,
  errors = {},
  onChange,
  onSubmit,
  columns = 1,
  isLoading = false,
  submitLabel = 'Guardar',
  onCancel,
  cancelLabel = 'Volver',
  className = '',
}: FormProps<T>) => {
  const fieldsClass = [styles.fields, columns === 2 && styles['cols-2']].filter(Boolean).join(' ');

  return (
    <form className={`${styles.form} ${className}`} onSubmit={onSubmit} noValidate>
      <div className={fieldsClass}>
        {schema.map((field) => (
          <FormField
            key={field.key}
            field={field}
            value={values[field.key]}
            error={errors[field.key]}
            onChange={onChange}
          />
        ))}
      </div>

      <div className={styles.actions}>
        {onCancel && (
          <Button type='button' variant='outline' size='md' onClick={onCancel} disabled={isLoading}>
            {cancelLabel}
          </Button>
        )}
        <Button type='submit' variant='primary' size='md' isLoading={isLoading}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

Form.displayName = 'Form';
