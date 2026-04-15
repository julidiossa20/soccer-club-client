import { Newspaper, Edit, Trash, Eye } from 'lucide-react';
import { useLoaderData, useSubmit } from 'react-router-dom';
import DataGrid from '../../../core/DataGrid';
import type { INews } from '../../../../services';

export default function AdminNews() {
  const news = useLoaderData();
  const submit = useSubmit();

  const columns = [
    { key: 'title', label: 'Título' },
    {
      key: 'publishedAt',
      label: 'Publicado',
      render: (val: string) => (val ? new Date(val).toLocaleDateString() : 'Borrador'),
    },
    { key: 'authorName', label: 'Autor' },
  ];

  const handleDelete = (n: INews) => {
    if (window.confirm(`¿Eliminar la noticia ${n.title}?`)) {
      submit({ id: String(n.id), intent: 'delete' }, { method: 'post' });
    }
  };

  const actions = [
    {
      label: 'Previsualizar',
      icon: <Eye size={16} />,
      onClick: (n: INews) => window.open(`/noticia/${n.id}`, '_blank'),
    },
    {
      label: 'Editar',
      icon: <Edit size={16} />,
      onClick: (n: INews) => (window.location.hash = `/admin/noticias/editar/${n.id}`),
    },
    {
      label: 'Borrar',
      icon: <Trash size={16} />,
      variant: 'danger' as const,
      onClick: handleDelete,
    },
  ];

  return (
    <DataGrid
      idKey='id'
      title='Gestión de Noticias'
      data={news}
      columns={columns}
      onAdd={() => (window.location.hash = '/admin/noticias/nuevo')}
      addLabel='Redactar Noticia'
      actions={actions}
    />
  );
}
