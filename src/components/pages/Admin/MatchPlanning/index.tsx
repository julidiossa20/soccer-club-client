import { Form as RouterForm, useActionData, useLoaderData } from 'react-router-dom';
import { Stadium } from '../../../core/Stadium';
import { Button } from '../../../core/Button/Button';
import styles from './MatchPlanning.module.css';
import type { IPlayer } from '../../../../services';
// import { IPlayer } from '../../../../services/adminServices';

export default function MatchPlanning() {
  const { players, nextMatch } = useLoaderData() as { players: IPlayer[]; nextMatch: any };
  const actionData = (useActionData() as any) || {};

  // Formato para el estadio, si no tiene posición definida (x, y), colocamos en el banquillo
  const stadiumPlayers = players.map((p, idx) => ({
    id: p.id,
    name: p.name,
    pos: p.position,
    photo: p.photo || '',
    x: idx < 11 ? (idx % 2 === 0 ? 30 : 50) : 0, // Mock positions if not defined
    y: idx < 11 ? (idx % 11) * 8 + 10 : 0,
  }));

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>
            PLANEACIÓN <span className={styles.highlight}>DE PARTIDO</span>
          </h1>
          <p>
            Define la estrategia y el once titular para el encuentro contra {nextMatch?.opponent || 'el próximo rival'}.
          </p>
        </div>
      </header>

      <div className={styles.content}>
        <div>
          <Stadium title='Estrategia Visual' players={stadiumPlayers.slice(0, 11)} />
        </div>

        <aside className={styles.sidebar}>
          <div className='card' style={{ padding: 'var(--px30)' }}>
            <h3>DATOS DEL PARTIDO</h3>
            <RouterForm
              method='post'
              style={{ marginTop: 'var(--px20)', display: 'flex', flexDirection: 'column', gap: 'var(--px15)' }}>
              <div>
                <label htmlFor='opponent' style={{ display: 'block', fontSize: '0.9rem', marginBottom: 'var(--px5)' }}>
                  RIVAL
                </label>
                <input
                  id='opponent'
                  name='opponent'
                  type='text'
                  defaultValue={nextMatch?.opponent || ''}
                  placeholder='Ej: Real Madrid'
                  style={{
                    width: '100%',
                    padding: 'var(--px10)',
                    borderRadius: 'var(--px6)',
                    border: '1px solid var(--gray-300)',
                  }}
                />
              </div>
              <div>
                <label htmlFor='date' style={{ display: 'block', fontSize: '0.9rem', marginBottom: 'var(--px5)' }}>
                  FECHA
                </label>
                <input
                  id='date'
                  name='date'
                  type='date'
                  defaultValue={nextMatch?.date ? new Date(nextMatch.date).toISOString().split('T')[0] : ''}
                  style={{
                    width: '100%',
                    padding: 'var(--px10)',
                    borderRadius: 'var(--px6)',
                    border: '1px solid var(--gray-300)',
                  }}
                />
              </div>
              <Button type='submit' variant='primary'>
                GUARDAR PLANEACIÓN
              </Button>
            </RouterForm>
            {actionData.success && (
              <p style={{ color: 'var(--success-color)', marginTop: 'var(--px15)' }}>{actionData.message}</p>
            )}
          </div>

          <div className='card' style={{ padding: 'var(--px30)' }}>
            <h3>JUGADORES DISPONIBLES</h3>
            <div style={{ marginTop: 'var(--px10)', display: 'flex', flexWrap: 'wrap', gap: 'var(--px10)' }}>
              {players.map((p) => (
                <div
                  key={p.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--px10)',
                    padding: 'var(--px5) var(--px10)',
                    background: 'var(--gray-100)',
                    borderRadius: 'var(--px4)',
                    fontSize: '0.8rem',
                  }}>
                  {p.name} ({p.position})
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
