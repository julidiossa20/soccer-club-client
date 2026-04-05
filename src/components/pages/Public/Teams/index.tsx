import { Trophy, MapPin, Users, ChevronRight } from 'lucide-react';
import { Button } from '../../../core/Button/Button';
import styles from './PublicTeams.module.css';
import { NavLink } from 'react-router-dom';

const teams = [
  {
    id: 1,
    name: 'Primer Equipo',
    city: 'Madrid',
    members: 25,
    logo: 'https://cdn-icons-png.flaticon.com/512/3592/3592885.png',
    league: 'Liga Profesional',
  },
  {
    id: 2,
    name: 'Juvenil A',
    city: 'Sedes Deportivas',
    members: 22,
    logo: 'https://cdn-icons-png.flaticon.com/512/824/824726.png',
    league: 'Liga Juvenil Elite',
  },
  {
    id: 3,
    name: 'Femenino FC',
    city: 'Madrid',
    members: 24,
    logo: 'https://cdn-icons-png.flaticon.com/512/3592/3592873.png',
    league: 'Liga Femenina',
  },
];

export default function PublicTeams() {
  return (
    <div className='container' style={{ padding: 'var(--px80) var(--px20)' }}>
      <header style={{ marginBottom: 'var(--px50)', borderBottom: 'var(--px2) solid var(--gray-100)', paddingBottom: 'var(--px20)' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 900, textTransform: 'uppercase' }}>
          EQUIPOS <span style={{ color: 'var(--secondary-color)' }}>CLUB</span>
        </h1>
        <p style={{ color: 'var(--gray-600)', fontSize: '1.1rem' }}>
          Descubre nuestras diferentes divisiones y categorías oficiales.
        </p>
      </header>

      <div className={styles.grid}>
        {teams.map((team) => (
          <div key={team.id} className={styles.card}>
            <div className={styles.card__header}>
              <img src={team.logo} alt={team.name} className={styles.card__logo} />
              <div className={styles.card__info}>
                <h3 className={styles.card__name}>{team.name}</h3>
                <p className={styles.card__league}>{team.league}</p>
              </div>
            </div>
            <div className={styles.card__body}>
              <div className={styles.card__stat}>
                <MapPin size={16} /> <span>{team.city}</span>
              </div>
              <div className={styles.card__stat}>
                <Users size={16} /> <span>{team.members} Jugadores</span>
              </div>
              <div className={styles.card__stat}>
                <Trophy size={16} /> <span>Nacional</span>
              </div>
            </div>
            <div className={styles.card__footer}>
              <NavLink to={`/equipos/${team.id}`} style={{ width: '100%', display: 'block' }}>
                <Button variant='outline' size='md' style={{ width: '100%' }}>
                  VER PLANTILLA <ChevronRight size={16} />
                </Button>
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
