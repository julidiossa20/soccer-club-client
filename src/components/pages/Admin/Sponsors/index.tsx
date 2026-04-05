import { Briefcase, Edit, Trash, ExternalLink, Hash } from 'lucide-react';
import { useState } from 'react';
import DataGrid from '../../../core/DataGrid';
import { Modal } from '../../../core/Modal';
import { Form, type SchemaField } from '../../../core/Form';

interface SponsorData {
  id: number;
  name: string;
  category: string;
  website: string;
  contractValue: number;
  status: 'active' | 'expired';
}

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
  const [sponsors, setSponsors] = useState<SponsorData[]>([
    {
      id: 1,
      name: 'Adidas',
      category: 'Technical',
      website: 'https://adidas.com',
      contractValue: 500000,
      status: 'active',
    },
    {
      id: 2,
      name: 'Emirates',
      category: 'Main',
      website: 'https://emirates.com',
      contractValue: 2000000,
      status: 'active',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSponsor, setCurrentSponsor] = useState<Partial<SponsorData> | null>(null);

  const handleOpenAdd = () => {
    setCurrentSponsor(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (sponsor: SponsorData) => {
    setCurrentSponsor(sponsor);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    if (currentSponsor?.id) {
      setSponsors(
        sponsors.map((s) =>
          s.id === currentSponsor.id
            ? ({ ...s, ...data, contractValue: Number(data.contractValue) } as SponsorData)
            : s,
        ),
      );
    } else {
      const newSponsor: SponsorData = {
        id: Math.max(...sponsors.map((s) => s.id)) + 1,
        name: data.name as string,
        category: data.category as string,
        website: data.website as string,
        contractValue: Number(data.contractValue),
        status: 'active',
      };
      setSponsors([...sponsors, newSponsor]);
    }
    setIsModalOpen(false);
  };

  const columns = [
    { key: 'name', label: 'Marca' },
    { key: 'category', label: 'Categoría' },
    {
      key: 'contractValue',
      label: 'Valor',
      render: (val: number) => `$${val.toLocaleString()}`,
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
      onClick: (s: SponsorData) => {
        if (window.confirm(`¿Eliminar patrocinio de ${s.name}?`)) {
          setSponsors(sponsors.filter((item) => item.id !== s.id));
        }
      },
    },
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
        />
      </Modal>
    </div>
  );
}
