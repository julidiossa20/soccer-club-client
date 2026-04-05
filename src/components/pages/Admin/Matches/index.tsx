import { Calendar, Edit, Trash } from 'lucide-react';
import DataGrid from '../../../core/DataGrid';

interface MatchData {
  id: number;
  date: string;
  home: string;
  away: string;
  status: string;
}

export default function AdminMatches() {
  const matches: MatchData[] = [
    { id: 1, date: '2025-05-10 20:00', home: 'Barcelona', away: 'Real Madrid', status: 'Upcoming' },
    { id: 2, date: '2025-05-12 18:30', home: 'Atleti', away: 'Girona', status: 'Scheduled' },
  ];

  const columns = [
    { key: 'date', label: 'Fecha y Hora' },
    { key: 'home', label: 'Local' },
    { key: 'away', label: 'Visitante' },
    {
      key: 'status',
      label: 'Estado',
      render: (val: string) => (
        <span
          style={{
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '0.8rem',
            background: 'var(--info-light)',
            color: 'var(--info-color)',
          }}>
          {val}
        </span>
      ),
    },
  ];

  const actions = [
    {
      label: 'Reprogramar',
      icon: <Calendar size={16} />,
      onClick: (m: MatchData) => console.log('Reschedule', m),
    },
    {
      label: 'Editar',
      icon: <Edit size={16} />,
      onClick: (m: MatchData) => console.log('Edit', m),
    },
    {
      label: 'Borrar',
      icon: <Trash size={16} />,
      variant: 'danger' as const,
      onClick: (m: MatchData) => console.log('Delete', m),
    },
  ];

  return (
    <DataGrid
      idKey='id'
      title='Gestión de Partidos'
      data={matches}
      columns={columns}
      onAdd={() => undefined}
      addLabel='Planificar Partido'
      actions={actions}
    />
  );
}
