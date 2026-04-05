import { Form as RouterForm, useActionData } from 'react-router-dom';
import { Button } from '../Button/Button';
import { FormField } from './FormField';
import type { FormProps, SchemaField } from './types';

import styles from './form.module.css';

export const Form = <T extends SchemaField[]>({
  schema,
  values = {},
  errors: propErrors,
  onChange,
  onSubmit,
  method,
  action,
  columns = 1,
  isLoading = false,
  submitLabel = 'Guardar',
  onCancel,
  cancelLabel = 'Volver',
  className = '',
}: FormProps<T>) => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const actionData = (useActionData() as { errors?: Record<string, string | string[]> } | undefined) ?? {};
  const errors = propErrors ?? actionData.errors ?? {};

  const fieldsClass = [styles.fields, columns === 2 && styles['cols-2']].filter(Boolean).join(' ');

  const FormElement = (method ? RouterForm : 'form') as 'form';

  const formProps: React.ComponentProps<typeof RouterForm> & React.FormHTMLAttributes<HTMLFormElement> = {
    className: `${styles.form} ${className}`,
    onSubmit,
    noValidate: true,
  };

  if (method) {
    formProps.method = method;
    formProps.action = action;
  }

  return (
    <FormElement {...formProps}>
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
    </FormElement>
  );
};

Form.displayName = 'Form';
