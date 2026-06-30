import { Calendar, MapPin, Clock, ChevronRight, Trophy } from 'lucide-react';
import { Button } from '../../../core/Button/Button';
import styles from './Home.module.css';
import { NavLink } from 'react-router-dom';

export default function Home() {
  const news = [
    {
      id: 1,
      title: 'Gran final de temporada: Los equipos se preparan',
      excerpt: 'El cierre de la liga promete emociones fuertes con los tres primeros puestos aún en disputa...',
      image: '/assets/news1.png',
      date: '5 Abr 2025',
    },
    {
      id: 2,
      title: 'Entrevista exclusiva: El nuevo DT del primer equipo',
      excerpt: 'Conoce los planes tácticos y la visión del entrenador que busca cambiar la historia del club...',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800',
      date: '4 Abr 2025',
    },
    {
      id: 3,
      title: 'Inscripciones abiertas para la academia juvenil',
      excerpt: 'Buscamos los próximos talentos que representarán nuestros colores en las ligas regionales...',
      image: 'https://images.unsplash.com/photo-1526232762683-21751515e373?auto=format&fit=crop&q=80&w=800',
      date: '3 Abr 2025',
    },
  ];

  return (
    <div className={styles.home}>
      {/* ─── Hero ──────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles['hero__image-container']}>
          <img src='/assets/hero.png' alt='Stadium' className={styles.hero__image} />
          <div className={styles.hero__overlay} />
        </div>
        <div className={styles.hero__content}>
          <span className={styles.hero__badge}>Próximo Partido</span>
          <h1 className={styles.hero__title}>
            ORGULLO Y PASIÓN <br /> POR NUESTROS COLORES
          </h1>
          <p className={styles.hero__subtitle}>
            Acompaña al equipo en la jornada más importante de la temporada. ¡Juntos somos más fuertes!
          </p>
          <div className={styles.hero__actions}>
            <Button variant='primary' size='lg' onClick={() => undefined}>
              COMPRAR ENTRADAS
            </Button>
            <Button variant='outline' size='lg' onClick={() => undefined}>
              VER CALENDARIO
            </Button>
          </div>
        </div>
      </section>

      {/* ─── Next Match ────────────────────────── */}
      <section className={styles.nextMatch}>
        <div className={styles.nextMatch__header}>
          <span className={styles.nextMatch__label}>Liga Regional - Jornada 15</span>
        </div>
        <div className={styles.nextMatch__teams}>
          <div className={styles.nextMatch__team}>
            <img
              src='https://cdn-icons-png.flaticon.com/512/3592/3592885.png'
              alt='Local'
              className={styles.nextMatch__logo}
            />
            <span className={styles.nextMatch__teamName}>Barcelona FC</span>
          </div>
          <div className={styles.nextMatch__vs}>VS</div>
          <div className={styles.nextMatch__team}>
            <img
              src='https://cdn-icons-png.flaticon.com/512/824/824726.png'
              alt='Visitante'
              className={styles.nextMatch__logo}
            />
            <span className={styles.nextMatch__teamName}>Real Madrid</span>
          </div>
        </div>
        <div className={styles.nextMatch__info}>
          <div className={styles.nextMatch__details}>
            <div className={styles.nextMatch__detail}>
              <Calendar size={18} />
              <span>Domingo, 10 Mayo</span>
            </div>
            <div className={styles.nextMatch__detail}>
              <Clock size={18} />
              <span>20:00 Horas</span>
            </div>
            <div className={styles.nextMatch__detail}>
              <MapPin size={18} />
              <span>Estadio Olímpico Municipal</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── News ──────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.section__header}>
          <h2 className={styles.section__title}>ÚLTIMAS NOTICIAS</h2>
          <NavLink to='/noticias'>
            <Button variant='ghost' size='sm'>
              VER TODAS <ChevronRight size={16} />
            </Button>
          </NavLink>
        </div>
        <div className={styles.newsGrid}>
          {news.map((item) => (
            <div key={item.id} className={styles.newsCard}>
              <img src={item.image} alt={item.title} className={styles.newsCard__image} />
              <div className={styles.newsCard__content}>
                <span className={styles.newsCard__date}>{item.date}</span>
                <h3 className={styles.newsCard__title}>{item.title}</h3>
                <p className={styles.newsCard__excerpt}>{item.excerpt}</p>
                <div style={{ marginTop: '20px' }}>
                  <Button variant='outline' size='sm' onClick={() => undefined}>
                    LEER MÁS
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Standings & stats preview ──────────────────────────── */}
      <section
        className={styles.section}
        style={{ background: 'var(--gray-50)', padding: '60px 20px', borderRadius: '12px', marginBottom: '80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          <div>
            <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Trophy color='var(--secondary-color)' /> TABLA DE POSICIONES
            </h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ borderBottom: '2px solid var(--gray-200)' }}>
                <tr style={{ fontSize: '0.8rem', color: '#666' }}>
                  <th style={{ textAlign: 'left', padding: '10px' }}>POS</th>
                  <th style={{ textAlign: 'left', padding: '10px' }}>EQUIPO</th>
                  <th style={{ textAlign: 'center', padding: '10px' }}>PTS</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { pos: 1, team: 'FC Barcelona', pts: 42 },
                  { pos: 2, team: 'Real Madrid', pts: 40 },
                  { pos: 3, team: 'Atleti', pts: 38 },
                ].map((row) => (
                  <tr key={row.pos} style={{ borderBottom: '1px solid var(--gray-100)' }}>
                    <td style={{ padding: '15px 10px', fontWeight: 700 }}>{row.pos}</td>
                    <td style={{ padding: '15px 10px' }}>{row.team}</td>
                    <td style={{ padding: '15px 10px', textAlign: 'center', fontWeight: 800 }}>{row.pts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: '20px' }}>
              <Button variant='ghost' size='sm' onClick={() => undefined}>
                VER TABLA COMPLETA
              </Button>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              background: 'var(--primary-color)',
              color: 'white',
              borderRadius: '12px',
              padding: '40px',
            }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>
              SÉ PARTE <br /> DE LA PASIÓN
            </h2>
            <p style={{ marginBottom: '30px', opacity: 0.8 }}>
              Regístrate para recibir contenido exclusivo, alertas de partidos y beneficios en la tienda oficial.
            </p>
            <Button variant='secondary' size='lg' onClick={() => undefined}>
              UNIRSE AL CLUB
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
