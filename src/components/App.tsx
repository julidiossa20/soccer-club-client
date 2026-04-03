import { Route, Routes } from 'react-router-dom';
import styles from './app.module.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Footer from './views/Footer';
import Header from './views/Header';
import { ToastContainer } from './views/Toast';

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.app__header}>
        <Header />
      </header>
      <main className={styles.app__main}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </main>
      <footer className={styles.app__footer}>
        <Footer />
      </footer>
      <ToastContainer />
    </div>
  );
}

export default App;
