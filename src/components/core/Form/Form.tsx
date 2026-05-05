import { Form as RouterForm, useActionData, useSubmit } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '../Button/Button';
import { FormField } from './FormField';
import type { FormProps, SchemaField } from './types';

import styles from './form.module.css';

export const Form = <T extends SchemaField[], K extends object>({
  schema,
  values = {},
  errors: propErrors,
  onChange,
  // _onSubmit,
  method,
  action,
  columns = 1,
  isLoading = false,
  submitLabel = 'Guardar',
  actionType = 'save',
  onCancel,
  cancelLabel = 'Volver',
  className = '',
  data,
  onActionSuccess,
  onActionError,
}: FormProps<T, K>) => {
  const submit = useSubmit();
  const actionData = useActionData<{ success?: boolean; errors?: Record<string, string | string[]> } | undefined>();
  const errors = propErrors ?? actionData?.errors ?? {};

  useEffect(() => {
    if (actionData && onActionSuccess && onActionError) {
      if (actionData.success) {
        void onActionSuccess();
      } else if (actionData.errors) {
        void onActionError();
      }
    }
  }, [actionData, onActionError, onActionSuccess]);

  const fieldsClass = [styles.fields, columns === 2 && styles['cols-2']].filter(Boolean).join(' ');

  const FormElement = (method ? RouterForm : 'form') as 'form';

  const formProps: React.ComponentProps<typeof RouterForm> & React.FormHTMLAttributes<HTMLFormElement> = {
    className: `${styles.form} ${className}`,
    // onSubmit,
    noValidate: true,
  };

  if (method) {
    formProps.method = method;
    formProps.action = action;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    formData.append('actionType', actionType);
    formData.append('data', JSON.stringify(data));

    void submit(formData, {
      method: method || 'post',
      action: action,
    });
  };

  return (
    <FormElement {...formProps} onSubmit={handleSubmit}>
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
