import { AtSign, KeyRound, User, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Form, type SchemaField } from '../../../core/Form';
import { Button } from '../../../core/Button/Button';
import styles from '../auth.module.css';

const registerSchema = [
  {
    key: 'name',
    label: 'Nombre completo',
    type: 'text',
    required: true,
    placeholder: 'Nombre y Apellidos',
    leftIcon: <User size={16} />,
  },
  {
    key: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    placeholder: 'Correo electrónico',
    leftIcon: <AtSign size={16} />,
  },
  {
    key: 'password',
    label: 'Contraseña',
    type: 'password',
    required: true,
    placeholder: 'Contraseña',
    leftIcon: <KeyRound size={16} />,
  },
  {
    key: 'confirmPassword',
    label: 'Confirmar contraseña',
    type: 'password',
    required: true,
    placeholder: 'Repite tu contraseña',
    leftIcon: <KeyRound size={16} />,
  },
] as const satisfies SchemaField[];

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.card} ${styles['card--wide']}`}>
        <div className={styles.brand}>
          <div className={styles.brand__icon}>
            <UserPlus size={28} color='white' />
          </div>
          <h2 className={styles.brand__title}>Crear cuenta</h2>
          <p className={styles.brand__subtitle}>Completa el formulario para unirte al club</p>
        </div>

        <Form schema={registerSchema} method='post' submitLabel='Registrarse' />

        <div className={styles.divider}>o</div>

        <div className={styles.links}>
          <Button type='button' variant='ghost' size='sm' onClick={() => void navigate('/auth/login')}>
            Ya tengo cuenta
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
