import { useEffect, useState } from 'react';
import useLogin from '../hooks/useLogin';
import styles from './app.module.css';
import Footer from './views/Footer';
import Header from './views/Header';
import { ToastContainer } from './views/Toast';

function App() {
  const { signWithToken } = useLogin();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (signWithToken) await signWithToken();
      setIsCheckingAuth(false);
    };
    void initAuth();
  }, [signWithToken]);

  if (isCheckingAuth) {
    return (
      <div className={styles.app__loading}>
        <span className={styles['app__loading-text']}>Cargando...</span>
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <header className={styles.app__header}>
        <Header />
      </header>
      <main className={styles.app__main}>
        {/* <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route element={<ProtectedRoute />}>
          </Route>

          <Route path='*' element={<NotFound />} />
        </Routes> */}
      </main>
      <footer className={styles.app__footer}>
        <Footer />
      </footer>
      <ToastContainer />
    </div>
  );
}

export default App;
