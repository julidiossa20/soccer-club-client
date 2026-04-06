import { Form as RouterForm, useActionData } from 'react-router-dom';
import { Stadium } from '../../../core/Stadium';
import { Button } from '../../../core/Button/Button';
import styles from './MatchPlanning.module.css';

const MOCK_PLAYERS = [
  {
    id: 1,
    name: 'Ter Stegen',
    pos: 'POR',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&fit=crop',
    x: 8,
    y: 50,
  },
  // Defensa
  {
    id: 2,
    name: 'Koundé',
    pos: 'DEF',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=256&h=256&fit=crop',
    x: 25,
    y: 20,
  },
  {
    id: 3,
    name: 'Pau Cubarsí',
    pos: 'DEF',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&fit=crop',
    x: 25,
    y: 40,
  },
  {
    id: 4,
    name: 'Íñigo Martínez',
    pos: 'DEF',
    photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=256&h=256&fit=crop',
    x: 25,
    y: 60,
  },
  {
    id: 5,
    name: 'Balde',
    pos: 'DEF',
    photo: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=256&h=256&fit=crop',
    x: 25,
    y: 80,
  },
  // Mediocampo
  {
    id: 6,
    name: 'Casadó',
    pos: 'MED',
    photo: 'https://images.unsplash.com/photo-1519085184528-7cba7f4d75a1?q=80&w=256&h=256&fit=crop',
    x: 50,
    y: 30,
  },
  {
    id: 7,
    name: 'Pedri',
    pos: 'MED',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&h=256&fit=crop',
    x: 50,
    y: 50,
  },
  {
    id: 8,
    name: 'Dani Olmo',
    pos: 'MED',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&fit=crop',
    x: 50,
    y: 70,
  },
  {
    id: 9,
    name: 'Raphinha',
    pos: 'DEL',
    photo: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=256&h=256&fit=crop',
    x: 75,
    y: 25,
  },
  // Delantera
  {
    id: 10,
    name: 'Lewandowski',
    pos: 'DEL',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=256&h=256&fit=crop',
    x: 85,
    y: 50,
  },
  {
    id: 11,
    name: 'Lamine Yamal',
    pos: 'DEL',
    photo: 'https://images.unsplash.com/photo-1544602851-24711f3e164d?q=80&w=256&h=256&fit=crop',
    x: 75,
    y: 75,
  },
];

export default function MatchPlanning() {
  const actionData = (useActionData() as { success?: boolean; message?: string }) || {};

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>
            PLANEACIÓN <span className={styles.highlight}>DE PARTIDO</span>
          </h1>
          <p>Define la estrategia y el once titular para el próximo encuentro.</p>
        </div>
      </header>

      <div className={styles.content}>
        <div>
          <Stadium title='Formación inicial' players={MOCK_PLAYERS} />
        </div>

        <aside className={styles.sidebar}>
          <div className='card' style={{ padding: 'var(--px30)' }}>
            <h3>DATOS DEL PARTIDO</h3>
            <RouterForm
              method='post'
              style={{ marginTop: 'var(--px20)', display: 'flex', flexDirection: 'column', gap: 'var(--px15)' }}>
              <div>
                <label
                  htmlFor='opponent'
                  style={{ display: 'block', fontSize: '0.9rem', marginBottom: 'var(--px5)' }}>
                  RIVAL
                </label>
                <input
                  id='opponent'
                  name='opponent'
                  type='text'
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
                <label
                  htmlFor='date'
                  style={{ display: 'block', fontSize: '0.9rem', marginBottom: 'var(--px5)' }}>
                  FECHA
                </label>
                <input
                  id='date'
                  name='date'
                  type='date'
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
            <h3>EQUIPO TÉCNICO</h3>
            <p style={{ color: 'var(--gray-600)', marginTop: 'var(--px10)' }}>Asigna los roles del staff para este partido.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
