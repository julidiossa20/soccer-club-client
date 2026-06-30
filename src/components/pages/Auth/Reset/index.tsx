import { AtSign, MailCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../core/Button/Button';
import { Form, type SchemaField } from '../../../core/Form';
import styles from './reset.module.css';
import Icon from '../../../core/Icon';

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
    <div className={styles.reset}>
      <Icon
        logo={<MailCheck size={28} color='white' />}
        title='Recuperar acceso'
        subtitle='Te enviaremos instrucciones a tu correo'
      />

      <p className={styles.info}>
        Introduce tu correo electrónico y recibirás un enlace para restablecer tu contraseña.
      </p>

      <Form schema={resetSchema} method='post' submitLabel='Enviar instrucciones' />

      <div className={styles.divider}>o</div>

      <div className={styles.button}>
        <Button type='button' variant='ghost' size='sm' onClick={() => void navigate('/auth/login')}>
          Volver al inicio de sesión
        </Button>
      </div>
    </div>
  );
};

export default Reset;
