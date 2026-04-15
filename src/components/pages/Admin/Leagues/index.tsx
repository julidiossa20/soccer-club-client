import { ShieldAlert, Edit, Trash, Globe } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLoaderData, useSubmit, useActionData } from 'react-router-dom';
import DataGrid from '../../../core/DataGrid';
import { Modal } from '../../../core/Modal';
import { Form, type SchemaField } from '../../../core/Form';
import type { ILeague } from '../../../../services';

const leagueFormSchema = [
  {
    key: 'name',
    label: 'Nombre de la Liga',
    type: 'text',
    required: true,
    placeholder: 'Ej. Liga BetPlay, Premier League...',
    leftIcon: <ShieldAlert size={16} />,
  },
  {
    key: 'country',
    label: 'País',
    type: 'text',
    required: true,
    placeholder: 'Ej. Colombia, España...',
    leftIcon: <Globe size={16} />,
  },
  {
    key: 'category',
    label: 'Categoría',
    type: 'select',
    required: true,
    options: [
      { value: 'Primera A', label: 'Primera División' },
      { value: 'Segunda B', label: 'Segunda División' },
      { value: 'Juvenil', label: 'Liga Juvenil' },
      { value: 'Femenino', label: 'Liga Femenina' },
    ],
  },
] as const satisfies SchemaField[];

export default function AdminLeagues() {
  const leagues = useLoaderData();
  const actionData = useActionData();
  const submit = useSubmit();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLeague, setCurrentLeague] = useState<Partial<ILeague> | null>(null);

  useEffect(() => {
    if (actionData?.success) {
      setIsModalOpen(false);
      setCurrentLeague(null);
    }
  }, [actionData]);

  const handleOpenAdd = () => {
    setCurrentLeague(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (league: ILeague) => {
    setCurrentLeague(league);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (currentLeague?.id) formData.append('id', String(currentLeague.id));
    formData.append('intent', currentLeague?.id ? 'update' : 'create');

    submit(formData, { method: 'post' });
  };

  const handleDelete = (league: ILeague) => {
    if (window.confirm(`¿Eliminar la liga ${league.name}?`)) {
      submit({ id: String(league.id), intent: 'delete' }, { method: 'post' });
    }
  };

  const columns = [
    { key: 'name', label: 'Nombre' },
    { key: 'country', label: 'País' },
    {
      key: 'category',
      label: 'Categoría',
      render: (val: string) => (
        <span
          style={{
            padding: '2px 8px',
            background: 'var(--info-light)',
            color: 'var(--info-color)',
            borderRadius: '10px',
            fontSize: '0.8rem',
            fontWeight: 600,
          }}>
          {val}
        </span>
      ),
    },
  ];

  const actions = [
    { label: 'Editar', icon: <Edit size={16} />, onClick: handleOpenEdit },
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
        title='Gestión de Ligas'
        data={leagues}
        columns={columns}
        onAdd={handleOpenAdd}
        addLabel='Nueva Liga'
        actions={actions}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentLeague ? 'Editar Liga' : 'Nueva Liga'}>
        <Form
          schema={leagueFormSchema}
          values={currentLeague ?? {}}
          onSubmit={handleSave}
          submitLabel={currentLeague ? 'Guardar Cambios' : 'Crear Liga'}
          onCancel={() => setIsModalOpen(false)}
          errors={actionData?.errors}
        />
      </Modal>
    </div>
  );
}
