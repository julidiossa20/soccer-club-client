import { Input } from '../Input/Input';
import { Textarea } from '../Textarea/Textarea';
import { Checkbox } from '../Checkbox/Checkbox';
import { Select } from '../Select/Select';
import type { SchemaField, FieldValue } from './types';
import styles from './form-field.module.css';

interface FormFieldProps {
  field: SchemaField;
  value: FieldValue;
  error?: string | string[];
  onChange: (key: string, value: FieldValue) => void;
}

// Normaliza error a string simple para componentes que no aceptan array
const toSingleError = (error?: string | string[]) => (typeof error === 'string' ? error : error?.[0]);

// Normaliza error a array para Input
const toErrorArray = (error?: string | string[]) => (Array.isArray(error) ? error : error ? [error] : undefined);

export const FormField = ({ field, value, error, onChange }: FormFieldProps) => {
  const colSpanClass = field.colSpan === 2 ? styles['col-span-2'] : undefined;

  if (field.type === 'checkbox') {
    return (
      <div className={colSpanClass}>
        <Checkbox
          label={field.label}
          checked={Boolean(value)}
          disabled={field.disabled}
          error={toSingleError(error)}
          onChange={(e) => onChange(field.key, e.target.checked)}
        />
      </div>
    );
  }

  if (field.type === 'select') {
    return (
      <div className={colSpanClass}>
        <Select
          label={field.label}
          options={field.options}
          value={String(value ?? '')}
          required={field.required}
          disabled={field.disabled}
          helperText={field.helperText}
          error={toSingleError(error)}
          onChange={(e) => onChange(field.key, e.target.value)}
        />
      </div>
    );
  }

  if (field.type === 'textarea') {
    return (
      <div className={colSpanClass}>
        <Textarea
          label={field.label}
          value={String(value ?? '')}
          required={field.required}
          disabled={field.disabled}
          placeholder={field.placeholder}
          helperText={field.helperText}
          rows={field.rows}
          error={toSingleError(error)}
          onChange={(e) => onChange(field.key, e.target.value)}
        />
      </div>
    );
  }

  if (field.type === 'number') {
    return (
      <div className={colSpanClass}>
        <Input
          label={field.label}
          type='number'
          value={String(value ?? '')}
          required={field.required}
          disabled={field.disabled}
          placeholder={field.placeholder}
          helperText={field.helperText}
          leftIcon={field.leftIcon}
          rightIcon={field.rightIcon}
          min={field.min}
          max={field.max}
          step={field.step}
          error={toErrorArray(error)}
          onChange={(e) => onChange(field.key, e.target.value)}
        />
      </div>
    );
  }

  if (field.type === 'date') {
    return (
      <div className={colSpanClass}>
        <Input
          label={field.label}
          type='date'
          value={String(value ?? '')}
          required={field.required}
          disabled={field.disabled}
          placeholder={field.placeholder}
          helperText={field.helperText}
          leftIcon={field.leftIcon}
          rightIcon={field.rightIcon}
          min={field.min}
          max={field.max}
          error={toErrorArray(error)}
          onChange={(e) => onChange(field.key, e.target.value)}
        />
      </div>
    );
  }

  // text | email | password
  return (
    <div className={colSpanClass}>
      <Input
        label={field.label}
        type={field.type}
        value={String(value ?? '')}
        required={field.required}
        disabled={field.disabled}
        placeholder={field.placeholder}
        helperText={field.helperText}
        leftIcon={field.leftIcon}
        rightIcon={field.rightIcon}
        error={toErrorArray(error)}
        onChange={(e) => onChange(field.key, e.target.value)}
      />
    </div>
  );
};
