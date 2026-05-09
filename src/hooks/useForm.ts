import { useState, useCallback } from 'react';
import type { FormEvent } from 'react';
import type { SchemaField, FieldValue } from '../components/core/Form/types';

// Extrae las keys del schema como union literal
type SchemaKeys<T extends SchemaField[]> = T[number]['key'];

// Infiere el tipo de valor correcto por tipo de campo:
// checkbox → boolean, resto → string
type InferFieldValue<T extends SchemaField> = T extends { type: 'checkbox' } ? boolean : string;

// Construye el objeto de valores tipado campo a campo
type InferFormValues<T extends SchemaField[]> = {
  [F in T[number] as F['key']]: InferFieldValue<F>;
};

// Errores por key del schema
type FormErrors<T extends SchemaField[]> = Partial<Record<SchemaKeys<T>, string | string[]>>;

// Lo que devuelve el hook
export interface UseFormReturn<T extends SchemaField[]> {
  /** Valores actuales del formulario, tipados por schema */
  values: InferFormValues<T>;
  /** Errores por campo */
  errors: FormErrors<T>;
  /** Indica si el formulario fue tocado al menos una vez */
  isDirty: boolean;
  /** Handler para pasar directamente a Form onChange */
  handleChange: (key: string, value: FieldValue) => void;
  /** Handler para pasar directamente a Form onSubmit */
  handleSubmit: (
    onValid: (values: InferFormValues<T>) => void | Promise<void>,
  ) => (e: FormEvent<HTMLFormElement>) => void;
  /** Setea errores desde fuera (ej: errores del servidor) */
  setErrors: (errors: FormErrors<T>) => void;
  /** Setea un error puntual en un campo */
  setFieldError: (key: SchemaKeys<T>, error: string | string[]) => void;
  /** Limpia el error de un campo */
  clearFieldError: (key: SchemaKeys<T>) => void;
  /** Resetea el formulario a los valores iniciales */
  reset: () => void;
  /** Sobreescribe los valores (útil para modo edición) */
  setValues: (values: Partial<InferFormValues<T>>) => void;
}

// Construye los valores iniciales a partir del schema
function buildInitialValues<T extends SchemaField[]>(
  schema: T,
  initial?: Partial<InferFormValues<T>>,
): InferFormValues<T> {
  const defaults = schema.reduce(
    (acc, field) => {
      if (field.type === 'checkbox') {
        acc[field.key] = false;
      } else if (field.type === 'number') {
        acc[field.key] = '' as unknown as number; // input vacío al inicio
      } else {
        acc[field.key] = '';
      }
      return acc;
    },
    {} as Record<string, FieldValue>,
  );

  return { ...defaults, ...(initial ?? {}) } as InferFormValues<T>;
}

export function useForm<T extends SchemaField[]>(
  schema: T,
  initialValues?: Partial<InferFormValues<T>>,
): UseFormReturn<T> {
  const [values, setValuesState] = useState<InferFormValues<T>>(() => buildInitialValues(schema, initialValues));
  const [errors, setErrorsState] = useState<FormErrors<T>>({});
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = useCallback((key: string, value: FieldValue) => {
    setValuesState((prev) => ({ ...prev, [key]: value }));
    setErrorsState((prev) => ({ ...prev, [key]: undefined }));
    setIsDirty(true);
  }, []);

  // Validación básica de campos required antes de llamar onValid
  const handleSubmit = useCallback(
    (onValid: (values: InferFormValues<T>) => void | Promise<void>) =>
      (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        const newErrors: FormErrors<T> = {};

        schema.forEach((field) => {
          if (!field.required) return;
          const val = (values as Record<string, FieldValue>)[field.key];
          const isEmpty =
            val === '' || val === null || val === undefined || (field.type === 'number' && isNaN(Number(val)));

          if (isEmpty) {
            (newErrors as Record<string, string>)[field.key] = `${field.label} es requerido`;
          }
        });

        if (Object.keys(newErrors).length > 0) {
          setErrorsState(newErrors);
          return;
        }

        void onValid(values);
      },
    [schema, values],
  );

  const setErrors = useCallback((errs: FormErrors<T>) => {
    setErrorsState(errs);
  }, []);

  const setFieldError = useCallback((key: SchemaKeys<T>, error: string | string[]) => {
    setErrorsState((prev) => ({ ...prev, [key]: error }));
  }, []);

  const clearFieldError = useCallback((key: SchemaKeys<T>) => {
    setErrorsState((prev) => ({ ...prev, [key]: undefined }));
  }, []);

  const reset = useCallback(() => {
    setValuesState(buildInitialValues(schema, initialValues));
    setErrorsState({});
    setIsDirty(false);
  }, [schema, initialValues]);

  const setValues = useCallback((partial: Partial<InferFormValues<T>>) => {
    setValuesState((prev) => ({ ...prev, ...partial }));
    setIsDirty(true);
  }, []);

  return {
    values,
    errors,
    isDirty,
    handleChange,
    handleSubmit,
    setErrors,
    setFieldError,
    clearFieldError,
    reset,
    setValues,
  };
}
