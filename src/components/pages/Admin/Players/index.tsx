import { UserCircle, Edit, Trash, Eye, User, Trophy, Hash, ImageIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLoaderData, useSubmit, useActionData } from 'react-router-dom';
import DataGrid from '../../../core/DataGrid';
import { Modal } from '../../../core/Modal';
import { Form, type SchemaField } from '../../../core/Form';
import { MediaPickerModal } from '../../../core/MediaPickerModal';
import type { IPlayer } from '../../../../services';
// import { IPlayer } from '../../../../services/adminServices';

const playerFormSchema = [
  {
    key: 'name',
    label: 'Nombre completo',
    type: 'text',
    required: true,
    placeholder: 'Ej. Lamine Yamal',
    leftIcon: <User size={16} />,
  },
  {
    key: 'position',
    label: 'Posición',
    type: 'select',
    required: true,
    leftIcon: <Trophy size={16} />,
    options: [
      { value: 'POR', label: 'Portero' },
      { value: 'DEF', label: 'Defensa' },
      { value: 'MED', label: 'Mediocentro' },
      { value: 'DEL', label: 'Delantero' },
    ],
  },
  {
    key: 'number',
    label: 'Dorsal',
    type: 'number',
    required: true,
    placeholder: '10',
    leftIcon: <Hash size={16} />,
  },
  {
    key: 'age',
    label: 'Edad',
    type: 'number',
    required: true,
    placeholder: '18',
    leftIcon: <Hash size={16} />,
  },
] as const satisfies SchemaField[];

export default function AdminPlayers() {
  const players = useLoaderData();
  const actionData = useActionData();
  const submit = useSubmit();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<Partial<IPlayer> | null>(null);

  useEffect(() => {
    if (actionData?.success) {
      setIsModalOpen(false);
      setCurrentPlayer(null);
    }
  }, [actionData]);

  const handleOpenAdd = () => {
    setCurrentPlayer(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (player: IPlayer) => {
    setCurrentPlayer(player);
    setIsModalOpen(true);
  };

  const handleDelete = (player: IPlayer) => {
    if (window.confirm(`¿Liberar al jugador ${player.name}?`)) {
      submit({ id: String(player.id), intent: 'delete' }, { method: 'post' });
    }
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (currentPlayer?.id) formData.append('id', String(currentPlayer.id));
    formData.append('intent', currentPlayer?.id ? 'update' : 'create');
    formData.append('photo', currentPlayer?.photo || '');

    submit(formData, { method: 'post' });
  };

  const columns = [
    { key: 'name', label: 'Nombre' },
    {
      key: 'position',
      label: 'Posición',
      render: (val: string) => (
        <span
          style={{
            background: 'var(--gray-100)',
            padding: '2px 6px',
            borderRadius: 'var(--border-radius-sm)',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'var(--primary-color)',
          }}>
          {val}
        </span>
      ),
    },
    { key: 'number', label: 'Dorsal' },
    { key: 'age', label: 'Edad' },
  ];

  const actions = [
    { label: 'Ficha', icon: <Eye size={16} />, onClick: (p: IPlayer) => console.log('View', p) },
    { label: 'Editar', icon: <Edit size={16} />, onClick: handleOpenEdit },
    { label: 'Borrar', icon: <Trash size={16} />, variant: 'danger' as const, onClick: handleDelete },
  ];

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        idKey='id'
        title='Gestión de Jugadores'
        data={players}
        columns={columns}
        onAdd={handleOpenAdd}
        addLabel='Registrar Jugador'
        actions={actions}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentPlayer ? 'Editar Ficha Jugador' : 'Nuevo Registro de Jugador'}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--px16)', marginBottom: 'var(--px20)' }}>
          {currentPlayer?.photo ? (
            <img
              src={currentPlayer.photo}
              alt='foto jugador'
              style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover' }}
            />
          ) : (
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'var(--gray-100)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <UserCircle size={32} color='var(--gray-400)' />
            </div>
          )}
          <button type='button' onClick={() => setIsMediaOpen(true)} style={{ padding: '8px', cursor: 'pointer' }}>
            <ImageIcon size={14} /> {currentPlayer?.photo ? 'Cambiar' : 'Subir'}
          </button>
        </div>
        <Form
          schema={playerFormSchema}
          values={currentPlayer ?? {}}
          onSubmit={handleSave}
          submitLabel={currentPlayer ? 'Actualizar' : 'Registrar'}
          onCancel={() => setIsModalOpen(false)}
          errors={actionData?.errors}
        />
      </Modal>

      <MediaPickerModal
        isOpen={isMediaOpen}
        onClose={() => setIsMediaOpen(false)}
        onSelect={(url) => setCurrentPlayer((prev) => ({ ...prev, photo: url }))}
        usedBy={currentPlayer?.id ? 'player:' + String(currentPlayer.id) : 'player:new'}
      />
    </div>
  );
}
