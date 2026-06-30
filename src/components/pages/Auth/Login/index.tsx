import { AtSign, KeyRound, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Form, type SchemaField } from '../../../core/Form';
import { Button } from '../../../core/Button/Button';
import styles from './login.module.css';
import Icon from '../../../core/Icon';

const loginSchema = [
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
] as const satisfies SchemaField[];

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.login}>
      <Icon
        logo={<ShieldCheck size={28} color='white' />}
        title='Acceso al Club'
        subtitle='Introduce tus credenciales para continuar'
      />

      <Form schema={loginSchema} method='post' onCancel={() => void navigate('/')} submitLabel='Iniciar Sesión' />

      <div className={styles.divider}>o</div>

      <div className={styles.buttons}>
        <Button type='button' variant='ghost' size='sm' onClick={() => void navigate('/auth/reset')}>
          Olvidé mi contraseña
        </Button>
        <Button type='button' variant='outline' size='sm' onClick={() => void navigate('/auth/register')}>
          Crear cuenta nueva
        </Button>
      </div>
    </div>
  );
};

export default Login;
