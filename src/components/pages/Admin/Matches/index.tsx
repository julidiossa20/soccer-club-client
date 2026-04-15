import { Calendar, Edit, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import DataGrid from '../../../core/DataGrid';
import { matchService } from '../../../../services';

export default function AdminMatches() {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMatches = async () => {
    setLoading(true);
    const res = await matchService.getAll();
    if (res.success) setMatches(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const columns = [
    {
      key: 'date',
      label: 'Fecha',
      render: (val: string) => (val ? new Date(val).toLocaleString() : 'N/A'),
    },
    { key: 'opponent', label: 'Rival' },
    {
      key: 'isHome',
      label: 'Localía',
      render: (val: boolean) => (val ? 'Local' : 'Visitante'),
    },
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
          {val?.toUpperCase()}
        </span>
      ),
    },
  ];

  const actions = [
    {
      label: 'Reprogramar',
      icon: <Calendar size={16} />,
      onClick: (m: any) => console.log('Reschedule', m),
    },
    {
      label: 'Editar',
      icon: <Edit size={16} />,
      onClick: (m: any) => console.log('Edit', m),
    },
    {
      label: 'Borrar',
      icon: <Trash size={16} />,
      variant: 'danger' as const,
      onClick: async (m: any) => {
        if (window.confirm(`¿Eliminar partido contra ${m.opponent}?`)) {
          const res = await matchService.delete(m.id);
          if (res.success) fetchMatches();
        }
      },
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
      loading={loading}
    />
  );
}
