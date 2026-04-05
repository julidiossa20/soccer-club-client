import { Calendar, Edit, Trash } from 'lucide-react';
import { useState } from 'react';
import DataGrid from '../../../core/DataGrid';
import { Modal } from '../../../core/Modal';
import { Form, type SchemaField } from '../../../core/Form';

interface SeasonData {
  id: number;
  year: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'upcoming' | 'finished';
}

const seasonFormSchema = [
  {
    key: 'name',
    label: 'Nombre de la Temporada',
    type: 'text',
    required: true,
    placeholder: 'Ej. Primer Semestre 2025',
    leftIcon: <Calendar size={16} />,
  },
  {
    key: 'year',
    label: 'Año',
    type: 'number',
    required: true,
    placeholder: '2025',
  },
  {
    key: 'startDate',
    label: 'Fecha Inicio',
    type: 'date',
    required: true,
  },
  {
    key: 'endDate',
    label: 'Fecha Fin',
    type: 'date',
    required: true,
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
] as const satisfies SchemaField[];

export default function AdminSeasons() {
  const [seasons, setSeasons] = useState<SeasonData[]>([
    { id: 1, year: '2025', name: 'Apertura 2025', startDate: '2025-01-20', endDate: '2025-06-15', status: 'active' },
    { id: 2, year: '2025', name: 'Clausura 2025', startDate: '2025-07-20', endDate: '2025-12-15', status: 'upcoming' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSeason, setCurrentSeason] = useState<Partial<SeasonData> | null>(null);

  const handleOpenAdd = () => {
    setCurrentSeason(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (season: SeasonData) => {
    setCurrentSeason(season);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    if (currentSeason?.id) {
      setSeasons(seasons.map((s) => (s.id === currentSeason.id ? ({ ...s, ...data } as SeasonData) : s)));
    } else {
      const newSeason: SeasonData = {
        id: Math.max(...seasons.map((s) => s.id)) + 1,
        name: data.name as string,
        year: data.year as string,
        startDate: data.startDate as string,
        endDate: data.endDate as string,
        status: data.status as any,
      };
      setSeasons([...seasons, newSeason]);
    }
    setIsModalOpen(false);
  };

  const columns = [
    { key: 'name', label: 'Nombre' },
    { key: 'year', label: 'Año' },
    { key: 'startDate', label: 'Inicio' },
    { key: 'endDate', label: 'Fin' },
    {
      key: 'status',
      label: 'Estado',
      render: (val: string) => (
        <span
          style={{
            padding: '2px 8px',
            background:
              val === 'active' ? 'var(--success-light)' : val === 'finished' ? 'var(--gray-100)' : 'var(--info-light)',
            color:
              val === 'active' ? 'var(--success-color)' : val === 'finished' ? 'var(--gray-600)' : 'var(--info-color)',
            borderRadius: '10px',
            fontSize: '0.8rem',
            fontWeight: 600,
          }}>
          {val.toUpperCase()}
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
      onClick: (s: SeasonData) => {
        if (window.confirm(`¿Eliminar la temporada ${s.name}?`)) {
          setSeasons(seasons.filter((item) => item.id !== s.id));
        }
      },
    },
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
        />
      </Modal>
    </div>
  );
}
