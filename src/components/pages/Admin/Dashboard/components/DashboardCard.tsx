import styles from '../Dashboard.module.css';

interface DashboardCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  color: string;
}

export const DashboardCard = ({ title, count, icon, color }: DashboardCardProps) => (
  <div className={styles.dashboard__card} style={{ borderLeft: `6px solid ${color}` }}>
    <div className={styles['dashboard__card-content']}>
      <div className={styles.dashboard__count}>{count}</div>
      <div className={styles['dashboard__card-title']}>{title}</div>
    </div>
    <div className={styles['dashboard__icon-wrapper']} style={{ color }}>
      {icon}
    </div>
  </div>
);
