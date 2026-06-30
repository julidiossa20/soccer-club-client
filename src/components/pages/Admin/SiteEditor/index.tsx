import { Edit3, Save } from 'lucide-react';
import { Button } from '../../../core/Button/Button';

export default function AdminSiteEditor() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Edit3 /> Editor Visual del Sitio
        </h2>
        <Button variant='primary' size='md' onClick={() => {}}>
          <Save size={18} style={{ marginRight: '8px' }} /> Guardar Cambios
        </Button>
      </div>

      <div className='card' style={{ padding: '30px', display: 'grid', gridTemplateColumns: '300px 1fr', gap: '40px' }}>
        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px' }}>
          <h4 style={{ marginBottom: '15px' }}>Configuración General</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Color Primario</label>
            <input
              type='color'
              defaultValue='#e63946'
              style={{ width: '100%', height: '40px', padding: '0', border: 'none' }}
            />

            <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Nombre del Club</label>
            <input
              type='text'
              defaultValue='CLUB DEPORTIVO FC'
              style={{ padding: '8px', border: '1px solid #e2e8f0', borderRadius: '4px' }}
            />

            <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Logo (URL)</label>
            <input
              type='text'
              defaultValue='/logo.png'
              style={{ padding: '8px', border: '1px solid #e2e8f0', borderRadius: '4px' }}
            />
          </div>
        </div>

        <div
          style={{
            border: '1px dashed #cbd5e1',
            borderRadius: '8px',
            padding: '100px 20px',
            textAlign: 'center',
            color: '#64748b',
          }}>
          <p>Área de Previsualización</p>
          <p>
            <small>(Aquí se cargará una versión interactiva del sitio)</small>
          </p>
        </div>
      </div>
    </div>
  );
}
