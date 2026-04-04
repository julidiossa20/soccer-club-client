import type { ReactNode } from 'react';
import type { Option } from '../Select/Select';

// Valor posible de un campo del formulario
export type FieldValue = string | number | boolean;

// Valores del formulario: un objeto genérico indexado por las keys del schema
export type FormValues<T extends SchemaField[]> = Record<T[number]['key'], FieldValue>;

// Errores por campo
export type FormErrors<T extends SchemaField[]> = Partial<Record<T[number]['key'], string | string[]>>;

// ─── Base ────────────────────────────────────────────────────────────────────

interface BaseField {
  key: string;
  label: string;
  required?: boolean;
  helperText?: string;
  disabled?: boolean;
  placeholder?: string;
  /** Cuántas columnas ocupa en el grid. Default: 1 */
  colSpan?: 1 | 2;
}

// ─── Campos de texto con soporte de iconos ────────────────────────────────────

interface BaseInputField extends BaseField {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export interface TextField extends BaseInputField {
  type: 'text';
}

export interface EmailField extends BaseInputField {
  type: 'email';
}

export interface PasswordField extends BaseInputField {
  type: 'password';
}

export interface NumberField extends BaseInputField {
  type: 'number';
  min?: number;
  max?: number;
  step?: number;
}

export interface DateField extends BaseInputField {
  type: 'date';
  min?: string;
  max?: string;
}

// ─── Textarea ─────────────────────────────────────────────────────────────────

export interface TextareaField extends BaseField {
  type: 'textarea';
  rows?: number;
}

// ─── Checkbox ─────────────────────────────────────────────────────────────────

export interface CheckboxField extends BaseField {
  type: 'checkbox';
}

// ─── Select ───────────────────────────────────────────────────────────────────

export interface SelectField extends BaseField {
  type: 'select';
  options: Option[];
}

// ─── Union discriminada completa ──────────────────────────────────────────────

export type SchemaField =
  | TextField
  | EmailField
  | PasswordField
  | NumberField
  | DateField
  | TextareaField
  | CheckboxField
  | SelectField;

export type FieldType = SchemaField['type'];

// ─── Props del componente Form ────────────────────────────────────────────────

export interface FormProps<T extends SchemaField[]> {
  schema: T;
  values: Record<string, FieldValue>;
  errors?: Record<string, string | string[]>;
  onChange: (key: string, value: FieldValue) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  /** Número de columnas del grid. Default: 1 */
  columns?: 1 | 2;
  isLoading?: boolean;
  submitLabel?: string;
  onCancel?: () => void;
  cancelLabel?: string;
  className?: string;
}
