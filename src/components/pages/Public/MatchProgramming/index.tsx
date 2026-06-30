import { Stadium } from '../../../core/Stadium';
import styles from './MatchProgramming.module.css';

const MOCK_PLAYERS = [
  {
    id: 1,
    name: 'Ter Stegen',
    pos: 'POR',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&fit=crop',
    x: 8,
    y: 50,
  },
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

export default function MatchProgramming() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          PRÓXIMO <span className={styles.highlight}>ENCUENTRO</span>
        </h1>
        <p className={styles.subtitle}>Consulta la alineación y la sede para nuestro siguiente gran reto.</p>
      </header>

      <div className={styles.matchInfo}>
        <div className={styles.matchCard}>
          <div className={styles.team}>
            <img src='/logo.svg' alt='Nuestros colores' className={styles.logo} />
            <h4>NUESTRO CLUB</h4>
          </div>
          <div className={styles.vs}>VS</div>
          <div className={styles.team}>
            <div className={styles.opponentLogo}>RM</div>
            <h4>REAL MADRID</h4>
          </div>
        </div>
        <div className={styles.details}>
          <p>
            <strong>FECHA:</strong> 15 de Abril, 2026
          </p>
          <p>
            <strong>HORA:</strong> 18:00 HRS
          </p>
          <p>
            <strong>ESTADIO:</strong> Municipal de Burgos
          </p>
        </div>
      </div>

      <div className={styles.stadiumWrapper}>
        <Stadium title='ALINEACIÓN CONFIRMADA' players={MOCK_PLAYERS} />
      </div>
    </div>
  );
}
