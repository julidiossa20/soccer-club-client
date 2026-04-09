import { AtSign, Phone, User, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../core/Button/Button';
import { Form, type SchemaField } from '../../../core/Form';
import Icon from '../../../core/Icon';
import styles from './register.module.css';

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
    key: 'phone',
    label: 'Teléfono',
    type: 'tel',
    placeholder: 'Número de teléfono',
    leftIcon: <Phone size={16} />,
  },
] as const satisfies SchemaField[];

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.register}>
      <Icon
        logo={<UserPlus size={28} color='white' />}
        title='Crear cuenta'
        subtitle='Completa el formulario para unirte al club'
      />

      <Form schema={registerSchema} method='post' submitLabel='Registrarse' />

      <div className={styles.divider}>o</div>

      <div className={styles.button}>
        <Button type='button' variant='ghost' size='sm' onClick={() => void navigate('/auth/login')}>
          Ya tengo cuenta
        </Button>
      </div>
    </div>
  );
};

export default Register;
