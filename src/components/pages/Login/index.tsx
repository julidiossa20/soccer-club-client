import { AtSign } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import useServices from '../../../hooks/useServices';
import { Button } from '../../core/Button/Button';
import { Input } from '../../core/Input/Input';
import { loginSuccess } from '../../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { call, loading, findError, removeError } = useServices<Login.Data, Record<string, string>>();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const response = await call('post', '/api/v1/user/login', { email, password });

    if (response.success) {
      const { token, ...user } = response.data;
      localStorage.setItem('token', token);
      dispatch(loginSuccess({ user }));
      setTimeout(() => {
        void navigate('/');
      }, 500);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
      removeError('email');
    }
    if (e.target.name === 'password') {
      setPassword(e.target.value);
      removeError('password');
    }
  };

  return (
    <div className='container' style={{ padding: '80px 20px', display: 'flex', justifyContent: 'center' }}>
      <div className='card' style={{ width: '100%', maxWidth: '400px', padding: '40px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: 'var(--primary-color)' }}>CLUB LOGIN</h2>

        <form onSubmit={(e) => void handleLogin(e)} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <Input
              label='Email'
              name='email'
              type='email'
              required
              placeholder='Correo Electrónico'
              value={email}
              error={findError('email')}
              onChange={handleChange}
              leftIcon={<AtSign size={16} />}
              disabled={loading}
            />
          </div>
          <div>
            <Input
              type='password'
              label='Contraseña'
              name='password'
              value={password}
              onChange={handleChange}
              placeholder='Contraseña'
              error={findError('password')}
              required
              disabled={loading}
            />
          </div>
          <Button variant='primary' isLoading={loading} disabled={loading}>
            Iniciar sesión
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
