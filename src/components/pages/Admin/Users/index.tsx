import { Edit, Trash, AtSign, UserCircle, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import DataGrid from '../../../core/DataGrid';
import { Modal } from '../../../core/Modal';
import { Form, type SchemaField } from '../../../core/Form';

interface UserData {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'user';
  joined: string;
}

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
  const [users, setUsers] = useState<UserData[]>([
    { id: 1, name: 'Admin Juan', email: 'admin@club.com', role: 'admin', joined: '2025-01-01' },
    { id: 2, name: 'Pibe Valderrama', email: 'pibe@club.com', role: 'editor', joined: '2025-02-15' },
    { id: 3, name: 'René Higuita', email: 'rene@club.com', role: 'user', joined: '2025-03-20' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<Partial<UserData> | null>(null);

  const handleOpenAdd = () => {
    setCurrentUser(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user: UserData) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (user: UserData) => {
    if (window.confirm(`¿Estás seguro de eliminar a ${user.name}?`)) {
      setUsers(users.filter((u) => u.id !== user.id));
    }
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    if (currentUser?.id) {
      // Edit
      setUsers(users.map((u) => (u.id === currentUser.id ? ({ ...u, ...data } as UserData) : u)));
    } else {
      // Add
      const newUser: UserData = {
        id: Math.max(...users.map((u) => u.id)) + 1,
        name: data.name as string,
        email: data.email as string,
        role: data.role as 'admin' | 'editor' | 'user',
        joined: new Date().toISOString().split('T')[0],
      };
      setUsers([...users, newUser]);
    }
    setIsModalOpen(false);
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
          {val.toUpperCase()}
        </span>
      ),
    },
    { key: 'joined', label: 'Unión' },
  ];

  const actions = [
    {
      label: 'Editar',
      icon: <Edit size={16} />,
      onClick: handleOpenEdit,
    },
    {
      label: 'Borrar',
      icon: <Trash size={16} />,
      variant: 'danger' as const,
      onClick: handleDelete,
    },
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
        />
      </Modal>
    </div>
  );
}
