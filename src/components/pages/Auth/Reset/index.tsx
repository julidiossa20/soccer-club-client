import { AtSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Form, type SchemaField } from '../../../core/Form';

const resetSchema = [
  {
    key: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    placeholder: 'Correo electrónico',
    leftIcon: <AtSign size={16} />,
  },
] as const satisfies SchemaField[];

const Reset = () => {
  const navigate = useNavigate();

  return (
    <div className='container' style={{ padding: '80px 20px', display: 'flex', justifyContent: 'center' }}>
      <div className='card' style={{ width: '100%', maxWidth: '400px', padding: '40px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: 'var(--primary-color)' }}>
          RECUPERAR CONTRASEÑA
        </h2>
        <p style={{ textAlign: 'center', marginBottom: '20px', fontSize: '0.9rem', color: '#666' }}>
          Introduce tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.
        </p>
        <Form
          schema={resetSchema}
          method='post'
          submitLabel='Enviar instrucciones'
          onCancel={() => void navigate('/auth/login')}
          cancelLabel='Volver al login'
        />
      </div>
    </div>
  );
};

export default Reset;
