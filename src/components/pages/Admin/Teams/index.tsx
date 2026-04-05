import { Trophy, Edit, Trash, MapPin, User, Hash } from 'lucide-react';
import { useState } from 'react';
import DataGrid from '../../../core/DataGrid';
import { Modal } from '../../../core/Modal';
import { Form, type SchemaField } from '../../../core/Form';

interface TeamData {
  id: number;
  name: string;
  city: string;
  manager: string;
  points: number;
}

const teamFormSchema = [
  {
    key: 'name',
    label: 'Nombre del Equipo',
    type: 'text',
    required: true,
    placeholder: 'Nombre oficial',
    leftIcon: <Trophy size={16} />,
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
] as const satisfies SchemaField[];

export default function AdminTeams() {
  const [teams, setTeams] = useState<TeamData[]>([
    { id: 1, name: 'FC Barcelona', city: 'Barcelona', manager: 'Xavi', points: 45 },
    { id: 2, name: 'Real Madrid', city: 'Madrid', manager: 'Ancelotti', points: 42 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTeam, setCurrentTeam] = useState<Partial<TeamData> | null>(null);

  const handleOpenAdd = () => {
    setCurrentTeam(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (team: TeamData) => {
    setCurrentTeam(team);
    setIsModalOpen(true);
  };

  const handleDelete = (team: TeamData) => {
    if (window.confirm(`¿Eliminar al equipo ${team.name}?`)) {
      setTeams(teams.filter((t) => t.id !== team.id));
    }
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    if (currentTeam?.id) {
      setTeams(
        teams.map((t) => (t.id === currentTeam.id ? ({ ...t, ...data, points: Number(data.points) } as TeamData) : t)),
      );
    } else {
      const newTeam: TeamData = {
        id: Math.max(...teams.map((t) => t.id)) + 1,
        name: data.name as string,
        city: data.city as string,
        manager: data.manager as string,
        points: Number(data.points),
      };
      setTeams([...teams, newTeam]);
    }
    setIsModalOpen(false);
  };

  const columns = [
    { key: 'name', label: 'Nombre' },
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
        />
      </Modal>
    </div>
  );
}
