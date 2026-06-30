import { Search, ChevronRight } from 'lucide-react';
import { Button } from '../../../core/Button/Button';
import styles from './PublicPlayers.module.css';
import { NavLink } from 'react-router-dom';

const players = [
  {
    id: 1,
    name: 'Lamine Yamal',
    pos: 'DEL',
    age: 17,
    number: 19,
    photo: 'https://images.unsplash.com/photo-1544602851-24711f3e164d?q=80&w=400&fit=crop',
  },
  {
    id: 2,
    name: 'Vinícius Jr.',
    pos: 'DEL',
    age: 24,
    number: 7,
    photo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=400&fit=crop',
  },
  {
    id: 3,
    name: 'Pedri González',
    pos: 'MED',
    age: 22,
    number: 8,
    photo:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 4,
    name: 'Ter Stegen',
    pos: 'POR',
    age: 31,
    number: 1,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&fit=crop',
  },
];

export default function PublicPlayers() {
  return (
    <div className='container' style={{ padding: 'var(--px80) var(--px20)' }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: 'var(--px50)',
          borderBottom: 'var(--px2) solid var(--gray-100)',
          paddingBottom: 'var(--px30)',
        }}>
        <div>
          <h1 style={{ fontSize: '3rem', fontWeight: 900, textTransform: 'uppercase' }}>
            PLANTILLA<span style={{ color: 'var(--secondary-color)' }}> CLUB</span>
          </h1>
          <p style={{ color: 'var(--gray-600)', fontSize: '1.1rem' }}>
            Conoce a los guerreros que defienden nuestros colores día a día.
          </p>
        </div>
        <div className={styles.search}>
          <Search size={20} color='var(--gray-400)' />
          <input type='text' placeholder='Buscar jugador...' className={styles.search__input} />
        </div>
      </header>

      <div className={styles.grid}>
        {players.map((player) => (
          <div key={player.id} className={styles.card}>
            <div className={styles['card__image-container']}>
              <img src={player.photo} alt={player.name} className={styles.card__image} />
              <div className={styles.card__number}>{player.number}</div>
              <div className={styles.card__overlay}>
                <NavLink to={`/jugadores/${player.id}`}>
                  <Button variant='primary' size='sm'>
                    VER FICHA <ChevronRight size={16} />
                  </Button>
                </NavLink>
              </div>
            </div>
            <div className={styles.card__info}>
              <h4 className={styles.card__name}>{player.name}</h4>
              <div className={styles.card__stats}>
                <span className={styles.card__pos}>{player.pos}</span>
                <span className={styles.card__age}>{player.age} AÑOS</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
