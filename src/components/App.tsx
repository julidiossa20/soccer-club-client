import styles from './app.module.css';

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.app__header}>
        <div>header</div>
      </header>
      <main className={styles.app__main}>
        <div>main</div>
      </main>
      <footer className={styles.app__footer}>
        <div>footer</div>
      </footer>
    </div>
  );
}

export default App;
