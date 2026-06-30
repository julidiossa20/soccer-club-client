import { Mail, Phone, UserCircle } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useSubmit } from 'react-router-dom';
import type { AuthUser } from '../../../../../store/slices/authSlice';
import { Button } from '../../../../core/Button/Button';
import { Form, type FieldValue, type SchemaField } from '../../../../core/Form';
import styles from './information.module.css';

const profileSchema = [
  {
    key: 'name',
    label: 'Nombre completo',
    type: 'text',
    required: true,
    placeholder: 'Nombre y Apellidos',
    leftIcon: <UserCircle size={16} color='#64748b' />,
  },
  {
    key: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    placeholder: 'Correo electrónico',
    leftIcon: <Mail size={16} color='#64748b' />,
    disabled: true,
  },
  {
    key: 'phone',
    label: 'Teléfono',
    type: 'tel',
    placeholder: 'Número de teléfono',
    leftIcon: <Phone size={16} color='#64748b' />,
  },
] as const satisfies SchemaField[];

export default function Information({ user }: { user: AuthUser }) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const submit = useSubmit();

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    void submit(formData, { method: 'post', action: '/profile' });
    setIsEditing(false); // Cerramos el formulario inmediatamente al enviarlo manualmente
  };

  return (
    <div className={styles.information}>
      <div className={styles.information__title}>
        <h4>Información Personal</h4>
        <Button variant={isEditing ? 'ghost' : 'outline'} size='sm' onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancelar' : 'Editar Información'}
        </Button>
      </div>

      {isEditing ? (
        <Form
          schema={profileSchema}
          values={user as Record<string, FieldValue>}
          submitLabel='Guardar Cambios'
          onCancel={() => setIsEditing(false)}
          onSubmit={handleSave}
        />
      ) : (
        <div className={styles.information__content}>
          {profileSchema.map(({ key, placeholder, leftIcon }) => {
            return (
              <div key={key} className={styles['information__content-field']}>
                <label htmlFor={key}>{placeholder}</label>
                <div className={styles['information__content-field--text']}>
                  {leftIcon}
                  <span>{user[key]}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className={styles.information__security}>
        <h4>Seguridad</h4>
        <Button
          variant='outline'
          size='md'
          onClick={() => void navigate(`/auth/change?profile=true&token=${window.localStorage.token}`)}>
          Cambiar Contraseña
        </Button>
      </div>
    </div>
  );
}
