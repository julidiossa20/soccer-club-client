import { KeyRound, LockKeyhole } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Form, type SchemaField } from '../../../core/Form';
import { Button } from '../../../core/Button/Button';
import styles from './change.module.css';
import Icon from '../../../core/Icon';

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
    <div className={styles.change}>
      <Icon
        logo={<LockKeyhole size={28} color='white' />}
        title='Nueva contraseña'
        subtitle='Elige una contraseña segura para tu cuenta'
      />

      <Form schema={changeSchema} method='post' submitLabel='Cambiar contraseña' />

      <div className={styles.divider}>o</div>

      <div className={styles.button}>
        <Button type='button' variant='ghost' size='sm' onClick={() => void navigate('/auth/login')}>
          Volver al inicio de sesión
        </Button>
      </div>
    </div>
  );
};

export default Change;
