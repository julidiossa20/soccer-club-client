import { AtSign, KeyRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Form, type SchemaField } from '../../../core/Form';
import { Button } from '../../../core/Button/Button';

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
    <div className='container' style={{ padding: '80px 20px', display: 'flex', justifyContent: 'center' }}>
      <div className='card' style={{ width: '100%', maxWidth: '400px', padding: '40px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: 'var(--primary-color)' }}>CLUB LOGIN</h2>

        <Form schema={loginSchema} method='post' submitLabel='Iniciar Sesión' onCancel={() => void navigate(-1)} />
        <Button type='button' variant='ghost' size='md' onClick={() => void navigate('/auth/change')}>
          Olvido contraseña
        </Button>

        <Button type='button' variant='ghost' size='md' onClick={() => void navigate('/auth/register')}>
          Crear cuenta
        </Button>
      </div>
    </div>
  );
};

export default Login;
