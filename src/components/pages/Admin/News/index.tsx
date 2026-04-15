import { Newspaper, Edit, Trash, Eye, ImageIcon, User, Type } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLoaderData, useSubmit, useActionData } from 'react-router-dom';
import DataGrid from '../../../core/DataGrid';
import { Modal } from '../../../core/Modal';
import { Form, type SchemaField } from '../../../core/Form';
import { MediaPickerModal } from '../../../core/MediaPickerModal';
import type { INews } from '../../../../services';
// import { INews } from '../../../../services/adminServices';

const newsFormSchema = [
  {
    key: 'title',
    label: 'Título de la Noticia',
    type: 'text',
    required: true,
    placeholder: 'Escribe un titular llamativo...',
    leftIcon: <Type size={16} />,
  },
  {
    key: 'content',
    label: 'Contenido',
    type: 'textarea',
    required: true,
    placeholder: 'Desarrolla la noticia aquí...',
    rows: 10,
    colSpan: 2,
  },
] as const satisfies SchemaField[];

export default function AdminNews() {
  const news = useLoaderData() as INews[];
  const actionData = useActionData() as any;
  const submit = useSubmit();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const [currentNews, setCurrentNews] = useState<Partial<INews> | null>(null);

  useEffect(() => {
    if (actionData?.success) {
      setIsModalOpen(false);
      setCurrentNews(null);
    }
  }, [actionData]);

  const handleOpenAdd = () => {
    setCurrentNews(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (n: INews) => {
    setCurrentNews(n);
    setIsModalOpen(true);
  };

  const handleDelete = (n: INews) => {
    if (window.confirm(`¿Eliminar la noticia ${n.title}?`)) {
      submit({ id: String(n.id), intent: 'delete' }, { method: 'post' });
    }
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (currentNews?.id) formData.append('id', String(currentNews.id));
    formData.append('intent', currentNews?.id ? 'update' : 'create');
    formData.append('image', currentNews?.image || '');

    submit(formData, { method: 'post' });
  };

  const columns = [
    { key: 'title', label: 'Título' },
    {
      key: 'publishedAt',
      label: 'Publicado',
      render: (val: string) => (val ? new Date(val).toLocaleDateString() : 'Borrador'),
    },
    { key: 'authorName', label: 'Autor' },
  ];

  const actions = [
    {
      label: 'Previsualizar',
      icon: <Eye size={16} />,
      onClick: (n: INews) => window.open(`/noticia/${n.id}`, '_blank'),
    },
    { label: 'Editar', icon: <Edit size={16} />, onClick: handleOpenEdit },
    { label: 'Borrar', icon: <Trash size={16} />, variant: 'danger' as const, onClick: handleDelete },
  ];

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        idKey='id'
        title='Gestión de Noticias'
        data={news}
        columns={columns}
        onAdd={handleOpenAdd}
        addLabel='Redactar Noticia'
        actions={actions}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentNews ? 'Editar Noticia' : 'Redactar Nueva Noticia'}
        size='lg'>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--px16)', marginBottom: 'var(--px20)' }}>
          {currentNews?.image ? (
            <img
              src={currentNews.image}
              alt='portada noticia'
              style={{ width: 120, height: 80, borderRadius: '8px', objectFit: 'cover' }}
            />
          ) : (
            <div
              style={{
                width: 120,
                height: 80,
                borderRadius: '8px',
                background: 'var(--gray-100)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ImageIcon size={32} color='var(--gray-400)' />
            </div>
          )}
          <button type='button' onClick={() => setIsMediaOpen(true)} style={{ padding: '8px', cursor: 'pointer' }}>
            <ImageIcon size={14} /> {currentNews?.image ? 'Cambiar Imagen' : 'Subir Portada'}
          </button>
        </div>
        <Form
          schema={newsFormSchema}
          values={currentNews ?? {}}
          onSubmit={handleSave}
          submitLabel={currentNews ? 'Publicar Cambios' : 'Publicar Noticia'}
          onCancel={() => setIsModalOpen(false)}
          errors={actionData?.errors}
          columns={2}
        />
      </Modal>

      <MediaPickerModal
        isOpen={isMediaOpen}
        onClose={() => setIsMediaOpen(false)}
        onSelect={(url) => setCurrentNews((prev) => ({ ...prev, image: url }))}
        usedBy={currentNews?.id ? 'news:' + String(currentNews.id) : 'news:new'}
      />
    </div>
  );
}
