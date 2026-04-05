import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

export default function RootExecutor({ children }: { children?: ReactNode }) {
  return <div className='auth'>{children ?? <Outlet />}</div>;
}
