import { Newspaper, Edit, Trash, Eye } from 'lucide-react';
import DataGrid from '../../../core/DataGrid';

interface NewsData {
  id: number;
  title: string;
  date: string;
  author: string;
}

export default function AdminNews() {
  const news: NewsData[] = [
    { id: 1, title: 'Nuevo fichaje estrella', date: '2025-04-01', author: 'Admin' },
    { id: 2, title: 'Resultados de la jornada', date: '2025-04-03', author: 'Editor' },
  ];

  const columns = [
    { key: 'title', label: 'Título' },
    { key: 'date', label: 'Fecha' },
    { key: 'author', label: 'Autor' },
  ];

  const actions = [
    {
      label: 'Previsualizar',
      icon: <Eye size={16} />,
      onClick: (n: NewsData) => console.log('Preview', n),
    },
    {
      label: 'Editar',
      icon: <Edit size={16} />,
      onClick: (n: NewsData) => console.log('Edit', n),
    },
    {
      label: 'Borrar',
      icon: <Trash size={16} />,
      variant: 'danger' as const,
      onClick: (n: NewsData) => console.log('Delete', n),
    },
  ];

  return (
    <DataGrid
      idKey='id'
      title='Gestión de Noticias'
      data={news}
      columns={columns}
      onAdd={() => undefined}
      addLabel='Redactar Noticia'
      actions={actions}
    />
  );
}
