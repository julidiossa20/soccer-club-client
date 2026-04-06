import { AtSign, MailCheck, CircleCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useActionData } from 'react-router-dom';
import { Form, type SchemaField } from '../../../core/Form';
import { Button } from '../../../core/Button/Button';
import styles from '../auth.module.css';

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

interface ActionData {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

const Reset = () => {
  const navigate = useNavigate();
  const actionData = useActionData() as ActionData | undefined;

  if (actionData?.success) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.brand}>
            <div className={styles.brand__icon}>
              <CircleCheck size={28} color='white' />
            </div>
            <h2 className={styles.brand__title}>Correo enviado</h2>
            <p className={styles.brand__subtitle}>{actionData.message}</p>
          </div>
          <div className={styles.links}>
            <Button type='button' variant='outline' size='sm' onClick={() => void navigate('/auth/login')}>
              Volver al inicio de sesión
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <div className={styles.brand__icon}>
            <MailCheck size={28} color='white' />
          </div>
          <h2 className={styles.brand__title}>Recuperar acceso</h2>
          <p className={styles.brand__subtitle}>Te enviaremos instrucciones a tu correo</p>
        </div>

        <p className={styles.info}>
          Introduce tu correo electrónico y recibirás un enlace para restablecer tu contraseña.
        </p>

        <Form schema={resetSchema} method='post' submitLabel='Enviar instrucciones' errors={actionData?.errors} />

        <div className={styles.divider}>o</div>

        <div className={styles.links}>
          <Button type='button' variant='ghost' size='sm' onClick={() => void navigate('/auth/login')}>
            Volver al inicio de sesión
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Reset;
