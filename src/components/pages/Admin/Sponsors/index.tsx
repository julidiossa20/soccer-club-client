import { Briefcase, Edit, Trash, ExternalLink, Hash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLoaderData, useSubmit, useActionData } from 'react-router-dom';
import DataGrid from '../../../core/DataGrid';
import { Modal } from '../../../core/Modal';
import { Form, type SchemaField } from '../../../core/Form';
import type { ISponsor } from '../../../../services';
// import { ISponsor } from '../../../../services/adminServices';

const sponsorFormSchema = [
  {
    key: 'name',
    label: 'Nombre de la Marca',
    type: 'text',
    required: true,
    placeholder: 'Ej. Nike, Coca Cola...',
    leftIcon: <Briefcase size={16} />,
  },
  {
    key: 'category',
    label: 'Categoría de Patrocinio',
    type: 'select',
    required: true,
    options: [
      { value: 'Main', label: 'Principal (Camiseta)' },
      { value: 'Technical', label: 'Técnico (Ropa)' },
      { value: 'Official', label: 'Oficial' },
      { value: 'Partner', label: 'Socio Local' },
    ],
  },
  {
    key: 'website',
    label: 'Sitio Web',
    type: 'text',
    placeholder: 'https://...',
    leftIcon: <ExternalLink size={16} />,
  },
  {
    key: 'contractValue',
    label: 'Valor Contrato (Anual)',
    type: 'number',
    placeholder: '0',
    leftIcon: <Hash size={16} />,
  },
] as const satisfies SchemaField[];

export default function AdminSponsors() {
  const sponsors = useLoaderData();
  const actionData = useActionData();
  const submit = useSubmit();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSponsor, setCurrentSponsor] = useState<Partial<ISponsor> | null>(null);

  useEffect(() => {
    if (actionData?.success) {
      setIsModalOpen(false);
      setCurrentSponsor(null);
    }
  }, [actionData]);

  const handleOpenAdd = () => {
    setCurrentSponsor(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (sponsor: ISponsor) => {
    setCurrentSponsor(sponsor);
    setIsModalOpen(true);
  };

  const handleDelete = (sponsor: ISponsor) => {
    if (window.confirm(`¿Eliminar patrocinio de ${sponsor.name}?`)) {
      submit({ id: String(sponsor.id), intent: 'delete' }, { method: 'post' });
    }
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (currentSponsor?.id) formData.append('id', String(currentSponsor.id));
    formData.append('intent', currentSponsor?.id ? 'update' : 'create');

    submit(formData, { method: 'post' });
  };

  const columns = [
    { key: 'name', label: 'Marca' },
    { key: 'category', label: 'Categoría' },
    {
      key: 'contractValue',
      label: 'Valor',
      render: (val: number) => `$${Number(val).toLocaleString()}`,
    },
    {
      key: 'status',
      label: 'Estado',
      render: (val: string) => (
        <span
          style={{
            padding: '2px 8px',
            background: val === 'active' ? 'var(--success-light)' : 'var(--error-light)',
            color: val === 'active' ? 'var(--success-color)' : 'var(--error-color)',
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
        title='Gestión de Patrocinadores'
        data={sponsors}
        columns={columns}
        onAdd={handleOpenAdd}
        addLabel='Nuevo Patrocinador'
        actions={actions}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentSponsor ? 'Editar Patrocinador' : 'Nuevo Patrocinador'}>
        <Form
          schema={sponsorFormSchema}
          values={currentSponsor ?? {}}
          onSubmit={handleSave}
          submitLabel={currentSponsor ? 'Guardar Cambios' : 'Crear Patrocinador'}
          onCancel={() => setIsModalOpen(false)}
          errors={actionData?.errors}
        />
      </Modal>
    </div>
  );
}
