import { Input } from '../Input/Input';
import { Textarea } from '../Textarea/Textarea';
import { Checkbox } from '../Checkbox/Checkbox';
import { Select } from '../Select/Select';
import type { SchemaField, FieldValue } from './types';
import styles from './form-field.module.css';

interface FormFieldProps {
  field: SchemaField;
  value?: FieldValue;
  error?: string | string[];
  onChange?: (key: string, value: FieldValue) => void;
}

// Normaliza error a string simple para componentes que no aceptan array
const toSingleError = (error?: string | string[]) => (typeof error === 'string' ? error : error?.[0]);

// Normaliza error a array para Input
const toErrorArray = (error?: string | string[]) => (Array.isArray(error) ? error : error ? [error] : undefined);

export const FormField = ({ field, value, error, onChange }: FormFieldProps) => {
  const colSpanClass = field.colSpan === 2 ? styles['col-span-2'] : undefined;

  const handleChange = (val: FieldValue) => {
    onChange?.(field.key, val);
  };

  const commonProps = {
    name: field.key,
    label: field.label,
    required: field.required,
    disabled: field.disabled,
    placeholder: field.placeholder,
    helperText: field.helperText,
  };

  if (field.type === 'checkbox') {
    return (
      <div className={colSpanClass}>
        <Checkbox
          {...commonProps}
          checked={value !== undefined ? Boolean(value) : undefined}
          defaultChecked={value === undefined ? false : undefined}
          error={toSingleError(error)}
          onChange={(e) => handleChange(e.target.checked)}
        />
      </div>
    );
  }

  if (field.type === 'select') {
    return (
      <div className={colSpanClass}>
        <Select
          {...commonProps}
          options={field.options}
          value={value !== undefined ? String(value ?? '') : undefined}
          defaultValue={value === undefined ? '' : undefined}
          error={toSingleError(error)}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    );
  }

  if (field.type === 'textarea') {
    return (
      <div className={colSpanClass}>
        <Textarea
          {...commonProps}
          value={value !== undefined ? String(value ?? '') : undefined}
          defaultValue={value === undefined ? '' : undefined}
          rows={field.rows}
          error={toSingleError(error)}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    );
  }

  if (field.type === 'number') {
    return (
      <div className={colSpanClass}>
        <Input
          {...commonProps}
          type='number'
          value={value !== undefined ? String(value ?? '') : undefined}
          defaultValue={value === undefined ? '' : undefined}
          leftIcon={field.leftIcon}
          rightIcon={field.rightIcon}
          min={field.min}
          max={field.max}
          step={field.step}
          error={toErrorArray(error)}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    );
  }

  if (field.type === 'date') {
    return (
      <div className={colSpanClass}>
        <Input
          {...commonProps}
          type='date'
          value={value !== undefined ? String(value ?? '') : undefined}
          defaultValue={value === undefined ? '' : undefined}
          leftIcon={field.leftIcon}
          rightIcon={field.rightIcon}
          min={field.min}
          max={field.max}
          error={toErrorArray(error)}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    );
  }

  // text | email | password
  return (
    <div className={colSpanClass}>
      <Input
        {...commonProps}
        type={field.type}
        value={value !== undefined ? String(value ?? '') : undefined}
        defaultValue={value === undefined ? '' : undefined}
        leftIcon={field.leftIcon}
        rightIcon={field.rightIcon}
        error={toErrorArray(error)}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
