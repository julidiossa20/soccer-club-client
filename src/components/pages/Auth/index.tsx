import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

export default function Auth({ children }: { children?: ReactNode }) {
  return <div className='auth'>{children ?? <Outlet />}</div>;
}
