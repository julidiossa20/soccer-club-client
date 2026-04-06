import { KeyRound, LockKeyhole } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Form, type SchemaField } from '../../../core/Form';
import { Button } from '../../../core/Button/Button';
import styles from '../auth.module.css';

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
    placeholder: 'Repite la nueva contraseña',
    leftIcon: <KeyRound size={16} />,
  },
] as const satisfies SchemaField[];

const Change = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <div className={`${styles.brand__icon} ${styles['brand__icon--dark']}`}>
            <LockKeyhole size={28} color='white' />
          </div>
          <h2 className={styles.brand__title}>Nueva contraseña</h2>
          <p className={styles.brand__subtitle}>Elige una contraseña segura para tu cuenta</p>
        </div>

        <Form schema={changeSchema} method='post' submitLabel='Cambiar contraseña' />

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

export default Change;
