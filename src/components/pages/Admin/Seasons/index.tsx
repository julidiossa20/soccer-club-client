import { Calendar, Edit, Trash, Shield } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLoaderData, useSubmit, useActionData } from 'react-router-dom';
import DataGrid from '../../../core/DataGrid';
import { Modal } from '../../../core/Modal';
import { Form, type SchemaField } from '../../../core/Form';
import { type ISeason, type ILeague, type IErrorResponse } from '../../../../services';

export default function AdminSeasons() {
  const { seasons, leagues } = useLoaderData() as { seasons: ISeason[]; leagues: ILeague[] };
  const actionData = useActionData() as { success: boolean; errors?: IErrorResponse['errors'] } | undefined;
  const submit = useSubmit();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSeason, setCurrentSeason] = useState<Partial<ISeason> | null>(null);

  useEffect(() => {
    if (actionData?.success) {
      setIsModalOpen(false);
      setCurrentSeason(null);
    }
  }, [actionData]);

  const leagueOptions = leagues.map((l) => ({ value: String(l.id), label: l.name }));

  const seasonFormSchema: SchemaField[] = [
    {
      key: 'name',
      label: 'Nombre de la Temporada',
      type: 'text',
      required: true,
      placeholder: 'Ej. Temporada 2024/2025',
      leftIcon: <Calendar size={16} />,
    },
    {
      key: 'leagueId',
      label: 'Liga Correspondiente',
      type: 'select',
      required: true,
      options: leagueOptions,
      leftIcon: <Shield size={16} />,
    },
    {
      key: 'year',
      label: 'Año',
      type: 'number',
      required: true,
      placeholder: '2024',
    },
    {
      key: 'startDate',
      label: 'Fecha Inicio',
      type: 'date',
      required: false,
    },
    {
      key: 'endDate',
      label: 'Fecha Fin',
      type: 'date',
      required: false,
    },
    {
      key: 'status',
      label: 'Estado',
      type: 'select',
      required: true,
      options: [
        { value: 'active', label: 'En Curso' },
        { value: 'upcoming', label: 'Próxima' },
        { value: 'finished', label: 'Finalizada' },
      ],
    },
  ];

  const handleOpenAdd = () => {
    setCurrentSeason(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (season: ISeason) => {
    setCurrentSeason({
      ...season,
      leagueId: season.league?.id ?? undefined,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (season: ISeason) => {
    if (window.confirm(`¿Eliminar la temporada ${season.name}?`)) {
      submit({ id: String(season.id), intent: 'delete' }, { method: 'post' });
    }
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (currentSeason?.id) formData.append('id', String(currentSeason.id));
    formData.append('intent', currentSeason?.id ? 'update' : 'create');

    submit(formData, { method: 'post' });
  };

  const columns = [
    { key: 'name', label: 'Nombre' },
    { key: 'year', label: 'Año' },
    { 
      key: 'league', 
      label: 'Liga', 
      render: (_: unknown, item: ISeason) => item.league?.name || 'N/A' 
    },
    {
      key: 'status',
      label: 'Estado',
      render: (val: unknown) => {
        const status = val as string;
        return (
          <span
            style={{
              padding: '2px 8px',
              background:
                status === 'active' ? 'var(--success-light)' : status === 'finished' ? 'var(--gray-100)' : 'var(--info-light)',
              color:
                status === 'active' ? 'var(--success-color)' : status === 'finished' ? 'var(--gray-600)' : 'var(--info-color)',
              borderRadius: '10px',
              fontSize: '0.8rem',
              fontWeight: 600,
            }}>
            {status?.toUpperCase()}
          </span>
        );
      },
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
        title='Gestión de Temporadas'
        data={seasons}
        columns={columns}
        onAdd={handleOpenAdd}
        addLabel='Nueva Temporada'
        actions={actions}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentSeason ? 'Editar Temporada' : 'Nueva Temporada'}>
        <Form
          schema={seasonFormSchema}
          values={currentSeason ?? {}}
          onSubmit={handleSave}
          submitLabel={currentSeason ? 'Guardar Cambios' : 'Crear Temporada'}
          onCancel={() => setIsModalOpen(false)}
          errors={actionData?.errors}
        />
      </Modal>
    </div>
  );
}

