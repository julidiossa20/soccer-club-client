import { AtSign, KeyRound, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Form, type SchemaField } from '../../../core/Form';
import { Button } from '../../../core/Button/Button';
import styles from '../auth.module.css';

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
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <div className={styles.brand__icon}>
            <ShieldCheck size={28} color='white' />
          </div>
          <h2 className={styles.brand__title}>Acceso al Club</h2>
          <p className={styles.brand__subtitle}>Introduce tus credenciales para continuar</p>
        </div>

        <Form schema={loginSchema} method='post' onCancel={()=> void navigate('/')} submitLabel='Iniciar Sesión' />

        <div className={styles.divider}>o</div>

        <div className={styles.links}>
          <Button type='button' variant='ghost' size='sm' onClick={() => void navigate('/auth/reset')}>
            Olvidé mi contraseña
          </Button>
          <Button type='button' variant='outline' size='sm' onClick={() => void navigate('/auth/register')}>
            Crear cuenta nueva
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
