import { Star, BarChart3, Trophy, ChevronLeft, MapPin, Calendar } from 'lucide-react';
import styles from './PlayerDetail.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../../core/Button/Button';

export default function PlayerDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock player data
  const player = {
    id,
    name: 'Lamine Yamal',
    pos: 'Delantero',
    fullPos: 'Extremo Derecho',
    born: '13/07/2007 (17 años)',
    country: 'España',
    number: 19,
    height: '1.78m',
    weight: '66kg',
    photo: 'https://images.unsplash.com/photo-1544602851-24711f3e164d?q=80&w=800&fit=crop',
    stats: {
      matches: 35,
      goals: 8,
      assists: 14,
      minutes: 2450,
    },
    history: [
      { season: '2023/24', team: 'FC Barcelona', matches: 30, goals: 5, assists: 10 },
      { season: '2024/25', team: 'FC Barcelona', matches: 5, goals: 3, assists: 4 },
    ],
  };

  return (
    <div className={styles.pdp}>
      <header className={styles.pdp__hero}>
        <div className={styles.pdp__overlay} />
        <div className={styles.pdp__container}>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => navigate(-1)}
            style={{ color: 'white', marginBottom: 'var(--px30)' }}>
            <ChevronLeft size={20} /> VOLVER A PLANTILLA
          </Button>
          <div className={styles.pdp__layout}>
            <div className={styles.pdp__imageWrapper}>
              <img src={player.photo} alt={player.name} className={styles.pdp__image} />
              <div className={styles.pdp__badge}>{player.number}</div>
            </div>
            <div className={styles.pdp__info}>
              <span className={styles.pdp__posBadge}>{player.pos.toUpperCase()}</span>
              <h1 className={styles.pdp__name}>{player.name.toUpperCase()}</h1>
              <div className={styles.pdp__meta}>
                <div className={styles.pdp__metaItem}>
                  <MapPin size={18} /> <span>{player.country}</span>
                </div>
                <div className={styles.pdp__metaItem}>
                  <Calendar size={18} /> <span>{player.born}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className={styles.pdp__statsSection}>
        <div className={styles.pdp__container}>
          <div className={styles.pdp__statsGrid}>
            <div className={styles.pdp__statCard}>
              <span className={styles.pdp__statLabel}>Partidos</span>
              <span className={styles.pdp__statValue}>{player.stats.matches}</span>
            </div>
            <div className={styles.pdp__statCard}>
              <span className={styles.pdp__statLabel}>Goles</span>
              <span className={styles.pdp__statValue}>{player.stats.goals}</span>
            </div>
            <div className={styles.pdp__statCard}>
              <span className={styles.pdp__statLabel}>Asistencias</span>
              <span className={styles.pdp__statValue}>{player.stats.assists}</span>
            </div>
            <div className={styles.pdp__statCard}>
              <span className={styles.pdp__statLabel}>Minutos</span>
              <span className={styles.pdp__statValue}>{player.stats.minutes}</span>
            </div>
          </div>

          <div className={styles.pdp__detailsGrid}>
            <div className={styles.pdp__card}>
              <h3 className={styles.pdp__cardTitle}>
                <Star size={20} /> Biografía y Atributos
              </h3>
              <div className={styles.pdp__attributes}>
                <div className={styles.pdp__attr}>
                  <label>Lugar Nacimiento</label>
                  <span>Esplugues de Llobregat</span>
                </div>
                <div className={styles.pdp__attr}>
                  <label>Altura</label>
                  <span>{player.height}</span>
                </div>
                <div className={styles.pdp__attr}>
                  <label>Peso</label>
                  <span>{player.weight}</span>
                </div>
                <div className={styles.pdp__attr}>
                  <label>Pierna Buena</label>
                  <span>Izquierda</span>
                </div>
              </div>
            </div>
            <div className={styles.pdp__card}>
              <h3 className={styles.pdp__cardTitle}>
                <Trophy size={20} /> Trayectoria Oficial
              </h3>
              <table className={styles.pdp__table}>
                <thead>
                  <tr>
                    <th>Temporada</th>
                    <th>Equipo</th>
                    <th>PJ</th>
                    <th>Goles</th>
                  </tr>
                </thead>
                <tbody>
                  {player.history.map((row, i) => (
                    <tr key={i}>
                      <td>{row.season}</td>
                      <td>{row.team}</td>
                      <td>{row.matches}</td>
                      <td>{row.goals}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
