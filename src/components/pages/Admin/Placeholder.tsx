import { LayoutDashboard } from 'lucide-react';

export default function AdminPlaceholder({ title = 'Módulo en Desarrollo' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', color: 'var(--gray-500)' }}>
      <LayoutDashboard size={64} style={{ marginBottom: '20px', opacity: 0.2 }} />
      <h2>{title}</h2>
      <p>Estamos trabajando para completar esta sección según el modelo de negocio.</p>
    </div>
  );
}
