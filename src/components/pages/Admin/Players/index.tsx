import { UserCircle, Edit, Trash, Eye, User, Trophy, Hash, ImageIcon } from 'lucide-react';
import { useState } from 'react';
import DataGrid from '../../../core/DataGrid';
import { Modal } from '../../../core/Modal';
import { Form, type SchemaField } from '../../../core/Form';
import { MediaPickerModal } from '../../../core/MediaPickerModal';

interface PlayerData {
  id: number;
  name: string;
  pos: 'DEL' | 'MED' | 'DEF' | 'POR';
  team: string;
  age: number;
  photo?: string;
}

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
    key: 'pos',
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
    key: 'team',
    label: 'Equipo actual',
    type: 'text',
    required: true,
    placeholder: 'Nombre del equipo',
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
  const [players, setPlayers] = useState<PlayerData[]>([
    { id: 1, name: 'Lamine Yamal', pos: 'DEL', team: 'FC Barcelona', age: 17 },
    { id: 2, name: 'Vinícius Jr.', pos: 'DEL', team: 'Real Madrid', age: 24 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<Partial<PlayerData> | null>(null);

  const handleOpenAdd = () => {
    setCurrentPlayer(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (player: PlayerData) => {
    setCurrentPlayer(player);
    setIsModalOpen(true);
  };

  const handleDelete = (player: PlayerData) => {
    if (window.confirm(`¿Liberar al jugador ${player.name}?`)) {
      setPlayers(players.filter((p) => p.id !== player.id));
    }
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    if (currentPlayer?.id) {
      setPlayers(
        players.map((p) =>
          p.id === currentPlayer.id
            ? ({ ...p, ...data, age: Number(data.age), photo: currentPlayer.photo } as PlayerData)
            : p,
        ),
      );
    } else {
      const newPlayer: PlayerData = {
        id: Math.max(...players.map((p) => p.id)) + 1,
        name: data.name as string,
        pos: data.pos as PlayerData['pos'],
        team: data.team as string,
        age: Number(data.age),
        photo: currentPlayer?.photo,
      };
      setPlayers([...players, newPlayer]);
    }
    setIsModalOpen(false);
  };

  const columns = [
    { key: 'name', label: 'Nombre' },
    {
      key: 'pos',
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
    { key: 'team', label: 'Equipo' },
    { key: 'age', label: 'Edad' },
  ];

  const actions = [
    { label: 'Ficha', icon: <Eye size={16} />, onClick: (p: PlayerData) => console.log('View', p) },
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
        {/* Foto del jugador */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--px16)', marginBottom: 'var(--px20)' }}>
          {currentPlayer?.photo ? (
            <img
              src={currentPlayer.photo}
              alt='foto jugador'
              style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--gray-200)' }}
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
          <button
            type='button'
            onClick={() => setIsMediaOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: 'var(--px8) var(--px14)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              background: 'none',
              border: '1px solid var(--gray-300)',
              borderRadius: 'var(--border-radius-sm)',
            }}>
            <ImageIcon size={14} />
            {currentPlayer?.photo ? 'Cambiar foto' : 'Seleccionar foto'}
          </button>
        </div>
        <Form
          schema={playerFormSchema}
          values={currentPlayer ?? {}}
          onSubmit={handleSave}
          submitLabel={currentPlayer ? 'Actualizar Ficha' : 'Registrar Jugador'}
          onCancel={() => setIsModalOpen(false)}
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
