import { KeyRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Form, type SchemaField } from '../../../core/Form';

const changeSchema = [
  {
    key: 'password',
    label: 'Nueva contraseña',
    type: 'password',
    required: true,
    placeholder: 'Nueva contraseña',
    leftIcon: <KeyRound size={16} />,
  },
  {
    key: 'confirm_password',
    label: 'Confirmar nueva contraseña',
    type: 'password',
    required: true,
    placeholder: 'Confirmar nueva contraseña',
    leftIcon: <KeyRound size={16} />,
  },
] as const satisfies SchemaField[];

const Change = () => {
  const navigate = useNavigate();

  return (
    <div className='container' style={{ padding: '80px 20px', display: 'flex', justifyContent: 'center' }}>
      <div className='card' style={{ width: '100%', maxWidth: '400px', padding: '40px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: 'var(--primary-color)' }}>CAMBIAR CONTRASEÑA</h2>
        <Form
          schema={changeSchema}
          method='post'
          submitLabel='Cambiar contraseña'
          onCancel={() => void navigate('/auth/login')}
          cancelLabel='Volver al login'
        />
      </div>
    </div>
  );
};

export default Change;
