import { Edit, Globe, ShieldAlert, Trash } from 'lucide-react';
import { useState } from 'react';
import { useActionData, useLoaderData } from 'react-router-dom';
import DataGrid, { type Action as DataGridAction } from '../../../core/DataGrid';
import { Form, type SchemaField } from '../../../core/Form';
import { Modal } from '../../../core/Modal';

const leagueFormSchema = [
  {
    key: 'name',
    label: 'Nombre de la Liga',
    type: 'text',
    required: true,
    placeholder: 'Ej. Liga BetPlay, Premier League...',
    leftIcon: <ShieldAlert size={16} />,
    disabled: false,
  },
  {
    key: 'country',
    label: 'País',
    type: 'text',
    required: true,
    placeholder: 'Ej. Colombia, España...',
    leftIcon: <Globe size={16} />,
    disabled: false,
  },
  {
    key: 'category',
    label: 'Categoría',
    type: 'select',
    required: true,
    disabled: false,
    options: [
      { value: 'Primera A', label: 'Primera División' },
      { value: 'Segunda B', label: 'Segunda División' },
      { value: 'Juvenil', label: 'Liga Juvenil' },
      { value: 'Femenino', label: 'Liga Femenina' },
    ],
  },
] as const satisfies SchemaField[];

export interface AdminLeaguesState {
  isModalOpen: boolean;
  action: 'idle' | 'save' | 'update' | 'delete';
  league: Partial<ILeague.League> | null;
}

export default function AdminLeagues() {
  const leagues = useLoaderData<ILeague.GetLeague['data']>();
  const actionData = useActionData<{ success: boolean; errors: Record<string, string | string[]> | undefined }>();
  const [state, setState] = useState<AdminLeaguesState>({ isModalOpen: false, action: 'idle', league: null });

  const columns = [
    { key: 'name', label: 'Nombre' },
    { key: 'country', label: 'País' },
    {
      key: 'category',
      label: 'Categoría',
      render: (val: unknown) => (
        <span
          style={{
            padding: '2px 8px',
            background: 'var(--info-light)',
            color: 'var(--info-color)',
            borderRadius: '10px',
            fontSize: '0.8rem',
            fontWeight: 600,
          }}>
          {val as string}
        </span>
      ),
    },
  ];

  const actions: DataGridAction<ILeague.League>[] = [
    {
      name: 'edit',
      label: 'Editar',
      icon: <Edit size={16} />,
      onClick: (league) => setState({ action: 'update', isModalOpen: true, league }),
    },
    {
      name: 'delete',
      label: 'Borrar',
      icon: <Trash size={16} />,
      variant: 'danger' as const,
      onClick: (league) => setState({ action: 'delete', isModalOpen: true, league }),
    },
  ];

  return (
    <div style={{ width: '100%' }}>
      <DataGrid<ILeague.League>
        title='Gestión de Ligas'
        onAdd={() => setState({ action: 'save', isModalOpen: true, league: null })}
        addLabel='Nueva Liga'
        columns={columns}
        actions={actions}
        data={leagues}
        idKey='id'
      />

      <Modal
        title={state.action === 'delete' ? 'Eliminar Liga' : `${state.action === 'save' ? 'Nueva' : 'Editar'} Liga`}
        onClose={() => setState({ action: 'idle', isModalOpen: false, league: null })}
        isOpen={state.isModalOpen}>
        <Form
          schema={leagueFormSchema.map((schema) => ({ ...schema, disabled: state.action === 'delete' }))}
          onCancel={() => setState({ action: 'idle', isModalOpen: false, league: null })}
          submitLabel={state.action === 'save' ? 'Crear Liga' : 'Guardar Cambios'}
          errors={actionData?.errors}
          values={state.league ?? {}}
          actionType={state.action}
          data={state.league}
          onActionSuccess={() => setState({ action: 'idle', isModalOpen: false, league: null })}
        />
      </Modal>
    </div>
  );
}
