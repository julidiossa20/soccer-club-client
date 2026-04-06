import styles from './Stadium.module.css';

interface Player {
  id: number;
  name: string;
  pos: string;
  photo: string;
  x: number; // percentage from left
  y: number; // percentage from top
}

interface StadiumProps {
  players: Player[];
  title?: string;
}

export const Stadium = ({ players, title }: StadiumProps) => {
  return (
    <div className={styles.stadium__container}>
      {title && <h2 className={styles.stadium__title}>{title}</h2>}
      <div className={styles.stadium}>
        {/* Pitch markings */}
        <div className={styles['stadium__line--center']} />
        <div className={styles['stadium__circle--center']} />
        <div className={styles['stadium__spot--center']} />
        <div className={`${styles['stadium__penalty-area']} ${styles['stadium__penalty-area--left']}`} />
        <div className={`${styles['stadium__penalty-area']} ${styles['stadium__penalty-area--right']}`} />

        {/* Players */}
        {players.map((player) => (
          <div
            key={player.id}
            className={styles.stadium__player}
            style={{
              left: `${player.x}%`,
              top: `${player.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <img src={player.photo} alt={player.name} className={styles['stadium__player-photo']} />
            <span className={styles['stadium__player-name']}>{player.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
