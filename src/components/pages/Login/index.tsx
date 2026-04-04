import { AtSign, KeyRound } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useServices from '../../../hooks/useServices';
import { loginSuccess } from '../../../store/slices/authSlice';
import { Form } from '../../core/Form';
import { useForm } from '../../../hooks';
import type { SchemaField } from '../../core/Form';

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

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { call, loading, findError } = useServices<Login.Data, Login.TBody>();

  const { values, errors, handleChange, handleSubmit, setFieldError } = useForm(loginSchema);

  const onSubmit = handleSubmit(async (data) => {
    const response = await call('post', '/api/v1/user/login', {
      email: data.email,
      password: data.password,
    });

    if (response.success) {
      const { token, ...user } = response.data;
      localStorage.setItem('token', token);
      dispatch(loginSuccess({ user }));
      setTimeout(() => void navigate('/'), 500);
    } else {
      setFieldError('email', findError('email'));
      setFieldError('password', findError('password'));
    }
  });

  return (
    <div className='container' style={{ padding: '80px 20px', display: 'flex', justifyContent: 'center' }}>
      <div className='card' style={{ width: '100%', maxWidth: '400px', padding: '40px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: 'var(--primary-color)' }}>CLUB LOGIN</h2>

        <Form
          schema={loginSchema}
          values={values}
          errors={errors}
          isLoading={loading}
          submitLabel='Iniciar Sesión'
          onCancel={() => void navigate(-1)}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default LoginPage;
