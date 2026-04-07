import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from '../../../components/views/Toast';

export default function RootExecutor({ children }: { children?: ReactNode }) {
  return (
    <div className='root'>
      {children ?? <Outlet />}
      <ToastContainer />
    </div>
  );
}
