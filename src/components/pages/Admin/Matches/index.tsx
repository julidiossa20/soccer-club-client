import { Calendar, Edit, Trash, MapPin, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLoaderData, useSubmit, useActionData } from 'react-router-dom';
import DataGrid from '../../../core/DataGrid';
import { Modal } from '../../../core/Modal';
import { Form, type SchemaField } from '../../../core/Form';

export default function AdminMatches() {
  const { matches, seasons } = useLoaderData() as { matches: any[]; seasons: any[] };
  const actionData = useActionData() as any;
  const submit = useSubmit();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMatch, setCurrentMatch] = useState<Partial<any> | null>(null);

  useEffect(() => {
    if (actionData?.success) {
      setIsModalOpen(false);
      setCurrentMatch(null);
    }
  }, [actionData]);

  const seasonOptions = seasons.map((s) => ({ value: String(s.id), label: `${s.name} (${s.year})` }));

  const matchFormSchema: SchemaField[] = [
    {
      key: 'opponent',
      label: 'Rival',
      type: 'text',
      required: true,
      placeholder: 'Ej. FC Barcelona',
      leftIcon: <Trophy size={16} />,
    },
    {
      key: 'seasonId',
      label: 'Temporada / Competición',
      type: 'select',
      required: true,
      options: seasonOptions,
      leftIcon: <Calendar size={16} />,
    },
    {
      key: 'date',
      label: 'Fecha y Hora',
      type: 'date',
      required: true,
    },
    {
      key: 'isHome',
      label: 'Localía',
      type: 'select',
      required: true,
      options: [
        { value: 'true', label: 'Local' },
        { value: 'false', label: 'Visitante' },
      ],
    },
    {
      key: 'stadium',
      label: 'Estadio / Sede',
      type: 'text',
      placeholder: 'Ej. Camp Nou',
      leftIcon: <MapPin size={16} />,
    },
    {
      key: 'status',
      label: 'Estado',
      type: 'select',
      required: true,
      options: [
        { value: 'scheduled', label: 'Programado' },
        { value: 'live', label: 'En Vivo' },
        { value: 'finished', label: 'Finalizado' },
      ],
    },
  ];

  const handleOpenAdd = () => {
    setCurrentMatch(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (match: any) => {
    setCurrentMatch({
      ...match,
      seasonId: match.season?.id ? String(match.season.id) : '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = (match: any) => {
    if (window.confirm(`¿Eliminar partido contra ${match.opponent}?`)) {
      submit({ id: String(match.id), intent: 'delete' }, { method: 'post' });
    }
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (currentMatch?.id) formData.append('id', String(currentMatch.id));
    formData.append('intent', currentMatch?.id ? 'update' : 'create');

    submit(formData, { method: 'post' });
  };

  const columns = [
    {
      key: 'date',
      label: 'Fecha',
      render: (val: string) => (val ? new Date(val).toLocaleDateString() : 'N/A'),
    },
    { key: 'opponent', label: 'Rival' },
    { key: 'season', label: 'Temporada', render: (_: any, item: any) => item.season?.name || 'N/A' },
    {
      key: 'status',
      label: 'Estado',
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
        title='Gestión de Partidos'
        data={matches}
        columns={columns}
        onAdd={handleOpenAdd}
        addLabel='Programar Partido'
        actions={actions}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentMatch ? 'Editar Partido' : 'Nuevo Partido'}>
        <Form
          schema={matchFormSchema}
          values={currentMatch ?? {}}
          onSubmit={handleSave}
          submitLabel={currentMatch ? 'Guardar Cambios' : 'Crear Partido'}
          onCancel={() => setIsModalOpen(false)}
          errors={actionData?.errors}
        />
      </Modal>
    </div>
  );
}
