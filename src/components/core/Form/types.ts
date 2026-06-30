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

export interface TelField extends BaseInputField {
  type: 'tel';
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

export interface SelectField extends BaseInputField {
  type: 'select';
  options: Option[];
}

// ─── Union discriminada completa ──────────────────────────────────────────────

export type SchemaField =
  | TextField
  | EmailField
  | PasswordField
  | TelField
  | NumberField
  | DateField
  | TextareaField
  | CheckboxField
  | SelectField;

export type FieldType = SchemaField['type'];

// ─── Props del componente Form ────────────────────────────────────────────────

export interface FormProps<T extends SchemaField[], K extends object> {
  schema: T;
  data: K | null;
  /** Valores actuales del formulario (opcional si es no controlado) */
  values?: Record<string, unknown>;
  /** Errores por campo */
  errors?: Record<string, string | string[]>;
  /** Handler de cambio (opcional si es no controlado) */
  onChange?: (key: string, value: FieldValue) => void;
  /** Handler de envío (opcional si se usa React Router action) */
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  /** Método HTTP para React Router Form (post, get, put, etc) */
  method?: 'post' | 'get' | 'put' | 'patch' | 'delete';
  /** Action URL para React Router */
  action?: string;
  /** Número de columnas del grid. Default: 1 */
  columns?: 1 | 2;
  /** Estado de carga manual (el botón usa useFormStatus por defecto) */
  isLoading?: boolean;
  submitLabel?: string;
  actionType: string;
  onCancel?: () => void;
  cancelLabel?: string;
  className?: string;
  /** Callback llamado cuando la acción es exitosa */
  onActionSuccess?: () => void;
  onActionError?: () => void;
}
