import { UserCircle, Edit, Trash, Eye, User, Trophy, Hash } from 'lucide-react';
import { useState } from 'react';
import DataGrid from '../../../core/DataGrid';
import { Modal } from '../../../core/Modal';
import { Form, type SchemaField } from '../../../core/Form';

interface PlayerData {
  id: number;
  name: string;
  pos: 'DEL' | 'MED' | 'DEF' | 'POR';
  team: string;
  age: number;
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
        players.map((p) => (p.id === currentPlayer.id ? ({ ...p, ...data, age: Number(data.age) } as PlayerData) : p)),
      );
    } else {
      const newPlayer: PlayerData = {
        id: Math.max(...players.map((p) => p.id)) + 1,
        name: data.name as string,
        pos: data.pos as any,
        team: data.team as string,
        age: Number(data.age),
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
        <Form
          schema={playerFormSchema}
          values={currentPlayer ?? {}}
          onSubmit={handleSave}
          submitLabel={currentPlayer ? 'Actualizar Ficha' : 'Registrar Jugador'}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
