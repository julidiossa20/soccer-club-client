import { AtSign, KeyRound, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Form, type SchemaField } from '../../../core/Form';

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
    label: 'Confirmar Contraseña',
    type: 'password',
    required: true,
    placeholder: 'Confirmar contraseña',
    leftIcon: <KeyRound size={16} />,
  },
] as const satisfies SchemaField[];

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className='container' style={{ padding: '80px 20px', display: 'flex', justifyContent: 'center' }}>
      <div className='card' style={{ width: '100%', maxWidth: '500px', padding: '40px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: 'var(--primary-color)' }}>CREAR CUENTA</h2>
        <Form
          schema={registerSchema}
          method='post'
          submitLabel='Registrarse'
          onCancel={() => void navigate('/auth/login')}
          cancelLabel='Ya tengo cuenta'
        />
      </div>
    </div>
  );
};

export default Register;
