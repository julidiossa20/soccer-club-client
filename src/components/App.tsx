import { Route, Routes } from 'react-router-dom';
import styles from './app.module.css';
import Home from './pages/Home';
import Footer from './views/Footer';
import Header from './views/Header';

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.app__header}>
        <Header />
      </header>
      <main className={styles.app__main}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <footer className={styles.app__footer}>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
