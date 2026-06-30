import { Trophy, Edit, Trash, MapPin, User, Hash, Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLoaderData, useSubmit, useActionData } from 'react-router-dom';
import DataGrid from '../../../core/DataGrid';
import { Modal } from '../../../core/Modal';
import { Form, type SchemaField } from '../../../core/Form';
import { type ITeam, type ISeason, type IErrorResponse } from '../../../../services';

export default function AdminTeams() {
  const { teams, seasons } = useLoaderData() as { teams: ITeam[]; seasons: ISeason[] };
  const actionData = useActionData() as { success: boolean; errors?: IErrorResponse['errors'] } | undefined;
  const submit = useSubmit();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTeam, setCurrentTeam] = useState<Partial<ITeam> | null>(null);

  useEffect(() => {
    if (actionData?.success) {
      setIsModalOpen(false);
      setCurrentTeam(null);
    }
  }, [actionData]);

  const seasonOptions = seasons.map((s) => ({ value: String(s.id), label: `${s.name} (${s.year})` }));

  const teamFormSchema: SchemaField[] = [
    {
      key: 'name',
      label: 'Nombre del Equipo',
      type: 'text',
      required: true,
      placeholder: 'Nombre oficial',
      leftIcon: <Trophy size={16} />,
    },
    {
      key: 'seasonId',
      label: 'Temporada en la que participa',
      type: 'select',
      required: true,
      options: seasonOptions,
      leftIcon: <Calendar size={16} />,
    },
    {
      key: 'city',
      label: 'Ciudad / Sede',
      type: 'text',
      required: true,
      placeholder: 'Ej. Madrid, Barcelona...',
      leftIcon: <MapPin size={16} />,
    },
    {
      key: 'manager',
      label: 'Entrenador',
      type: 'text',
      required: true,
      placeholder: 'Nombre del DT',
      leftIcon: <User size={16} />,
    },
    {
      key: 'points',
      label: 'Puntos en Liga',
      type: 'number',
      required: true,
      placeholder: '0',
      leftIcon: <Hash size={16} />,
    },
  ];

  const handleOpenAdd = () => {
    setCurrentTeam(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (team: ITeam) => {
    setCurrentTeam({
      ...team,
      // @ts-ignore
      seasonId: team.season?.id ? String(team.season.id) : '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = (team: ITeam) => {
    if (window.confirm(`¿Eliminar al equipo ${team.name}?`)) {
      submit({ id: String(team.id), intent: 'delete' }, { method: 'post' });
    }
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (currentTeam?.id) formData.append('id', String(currentTeam.id));
    formData.append('intent', currentTeam?.id ? 'update' : 'create');

    submit(formData, { method: 'post' });
  };

  const columns = [
    { key: 'name', label: 'Nombre' },
    {
      key: 'season',
      label: 'Temporada',
      render: (_: unknown, item: ITeam) => item.season?.name || 'N/A',
    },
    { key: 'city', label: 'Ciudad' },
    { key: 'manager', label: 'Entrenador' },
    { key: 'points', label: 'Puntos' },
  ];

  const actions = [
    { label: 'Editar', icon: <Edit size={16} />, onClick: handleOpenEdit },
    { label: 'Borrar', icon: <Trash size={16} />, variant: 'danger' as const, onClick: handleDelete },
  ];

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        idKey='id'
        title='Gestión de Equipos'
        data={teams}
        columns={columns}
        onAdd={handleOpenAdd}
        addLabel='Agregar Equipo'
        actions={actions}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentTeam ? 'Editar Equipo' : 'Nuevo Equipo'}>
        <Form
          schema={teamFormSchema}
          values={currentTeam ?? {}}
          onSubmit={handleSave}
          submitLabel={currentTeam ? 'Guardar Cambios' : 'Crear Equipo'}
          onCancel={() => setIsModalOpen(false)}
          errors={actionData?.errors}
        />
      </Modal>
    </div>
  );
}
