import { ShieldAlert, Edit, Trash, Globe } from 'lucide-react';
import { useState } from 'react';
import DataGrid from '../../../core/DataGrid';
import { Modal } from '../../../core/Modal';
import { Form, type SchemaField } from '../../../core/Form';

interface LeagueData {
  id: number;
  name: string;
  country: string;
  category: string;
  logo: string;
}

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
  const [leagues, setLeagues] = useState<LeagueData[]>([
    { id: 1, name: 'Liga BetPlay DIMAYOR', country: 'Colombia', category: 'Primera A', logo: '⚽' },
    { id: 2, name: 'Torneo Águila', country: 'Colombia', category: 'Segunda B', logo: '🏆' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLeague, setCurrentLeague] = useState<Partial<LeagueData> | null>(null);

  const handleOpenAdd = () => {
    setCurrentLeague(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (league: LeagueData) => {
    setCurrentLeague(league);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    if (currentLeague?.id) {
      setLeagues(leagues.map((l) => (l.id === currentLeague.id ? ({ ...l, ...data } as LeagueData) : l)));
    } else {
      const newLeague: LeagueData = {
        id: Math.max(...leagues.map((l) => l.id)) + 1,
        name: data.name as string,
        country: data.country as string,
        category: data.category as string,
        logo: '⚽',
      };
      setLeagues([...leagues, newLeague]);
    }
    setIsModalOpen(false);
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
      onClick: (l: LeagueData) => {
        if (window.confirm(`¿Eliminar la liga ${l.name}?`)) {
          setLeagues(leagues.filter((item) => item.id !== l.id));
        }
      },
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
        />
      </Modal>
    </div>
  );
}
