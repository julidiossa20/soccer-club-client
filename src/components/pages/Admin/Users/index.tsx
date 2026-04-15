import { Edit, Trash, AtSign, UserCircle, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLoaderData, useSubmit, useActionData } from 'react-router-dom';
import DataGrid from '../../../core/DataGrid';
import { Modal } from '../../../core/Modal';
import { Form, type SchemaField } from '../../../core/Form';
import type { IUser } from '../../../../services';
// import { IUser } from '../../../../services/adminServices';

const userFormSchema = [
  {
    key: 'name',
    label: 'Nombre Completo',
    type: 'text',
    required: true,
    placeholder: 'Nombre y apellidos',
    leftIcon: <UserCircle size={16} />,
  },
  {
    key: 'email',
    label: 'Correo Electrónico',
    type: 'email',
    required: true,
    placeholder: 'email@ejemplo.com',
    leftIcon: <AtSign size={16} />,
  },
  {
    key: 'role',
    label: 'Rol de Usuario',
    type: 'select',
    required: true,
    leftIcon: <ShieldCheck size={16} />,
    options: [
      { value: 'user', label: 'Usuario Regular' },
      { value: 'editor', label: 'Editor de Contenido' },
      { value: 'admin', label: 'Administrador' },
    ],
  },
] as const satisfies SchemaField[];

export default function AdminUsers() {
  const users = useLoaderData();
  const actionData = useActionData();
  const submit = useSubmit();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<Partial<IUser> | null>(null);

  useEffect(() => {
    if (actionData?.success) {
      setIsModalOpen(false);
      setCurrentUser(null);
    }
  }, [actionData]);

  const handleOpenAdd = () => {
    setCurrentUser(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user: IUser) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (user: IUser) => {
    if (window.confirm(`¿Estás seguro de eliminar a ${user.name}?`)) {
      submit({ id: String(user.id), intent: 'delete' }, { method: 'post' });
    }
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (currentUser?.id) formData.append('id', String(currentUser.id));
    formData.append('intent', currentUser?.id ? 'update' : 'create');

    submit(formData, { method: 'post' });
  };

  const columns = [
    { key: 'name', label: 'Nombre' },
    { key: 'email', label: 'Email' },
    {
      key: 'role',
      label: 'Rol',
      render: (val: string) => (
        <span
          style={{
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: 700,
            backgroundColor:
              val === 'admin' ? 'var(--error-light)' : val === 'editor' ? 'var(--success-light)' : 'var(--gray-100)',
            color:
              val === 'admin' ? 'var(--error-color)' : val === 'editor' ? 'var(--success-color)' : 'var(--gray-700)',
          }}>
          {val?.toUpperCase()}
        </span>
      ),
    },
  ];

  const actions = [
    { label: 'Editar', icon: <Edit size={16} />, onClick: handleOpenEdit },
    { label: 'Borrar', icon: <Trash size={16} />, variant: 'danger' as const, onClick: handleDelete },
  ];

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        idKey='id'
        title='Gestión de Usuarios'
        data={users}
        columns={columns}
        onAdd={handleOpenAdd}
        addLabel='Nuevo Usuario'
        actions={actions}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentUser ? 'Editar Usuario' : 'Nuevo Usuario'}>
        <Form
          schema={userFormSchema}
          values={currentUser ?? {}}
          onSubmit={handleSave}
          submitLabel={currentUser ? 'Guardar Cambios' : 'Crear Usuario'}
          onCancel={() => setIsModalOpen(false)}
          errors={actionData?.errors}
        />
      </Modal>
    </div>
  );
}
