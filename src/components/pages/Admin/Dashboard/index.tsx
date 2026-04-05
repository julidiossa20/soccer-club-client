import { DashboardCard } from './components/DashboardCard';
import { Users, Trophy, UserCircle, Calendar } from 'lucide-react';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const stats = [
    { title: 'Usuarios', count: 125, icon: <Users size={32} />, color: '#4299e1' },
    { title: 'Equipos', count: 24, icon: <Trophy size={32} />, color: '#48bb78' },
    { title: 'Jugadores', count: 350, icon: <UserCircle size={32} />, color: '#ecc94b' },
    { title: 'Próximos Partidos', count: 12, icon: <Calendar size={32} />, color: '#ed64a1' },
  ];

  return (
    <div className={styles.dashboard}>
      <h2 className={styles.dashboard__title}>Panel de Control</h2>
      <div className={styles.dashboard__stats}>
        {stats.map((stat) => (
          <DashboardCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className={styles['recent-activity']}>
        <h3>Actividad Reciente</h3>
        <div className={styles['recent-activity__list']}>
          <div className={styles['recent-activity__item']}>
            <span>
              Nuevo jugador registrado: <strong>Messi Jr.</strong>
            </span>
            <small>Hace 5 min</small>
          </div>
          <div className={styles['recent-activity__item']}>
            <span>
              Partido actualizado: <strong>FC Barcelona vs Real Madrid</strong>
            </span>
            <small>Hace 20 min</small>
          </div>
          <div className={styles['recent-activity__item']}>
            <span>
              Nueva noticia publicada: <strong>&quot;Gran final de temporada&quot;</strong>
            </span>
            <small>Hace 1 hora</small>
          </div>
        </div>
      </div>
    </div>
  );
}
