import { UserCircle, Mail, Phone, MapPin, Camera, Save } from 'lucide-react';
import { Button } from '../../core/Button/Button';
import { Form, type SchemaField } from '../../core/Form';
import { useState } from 'react';

const profileSchema = [
  {
    key: 'name',
    label: 'Nombre completo',
    type: 'text',
    required: true,
    placeholder: 'Nombre y Apellidos',
    leftIcon: <UserCircle size={16} />,
  },
  {
    key: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    placeholder: 'Correo electrónico',
    leftIcon: <Mail size={16} />,
    disabled: true,
  },
  {
    key: 'phone',
    label: 'Teléfono',
    type: 'tel',
    placeholder: 'Número de teléfono',
    leftIcon: <Phone size={16} />,
  },
  {
    key: 'address',
    label: 'Dirección',
    type: 'text',
    placeholder: 'Dirección de residencia',
    leftIcon: <MapPin size={16} />,
  },
] as const satisfies SchemaField[];

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  // Initial user data (mock)
  const userData = {
    name: 'Admin Juan',
    email: 'admin@club.com',
    phone: '+34 600 000 000',
    address: 'Calle del Futbol, 12, Madrid',
    role: 'Administrador',
    photo:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  };

  return (
    <div className='container' style={{ padding: '60px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '30px', color: 'var(--primary-color)' }}>Mi Perfil</h2>

      <div
        className='card'
        style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 300px) 1fr', gap: '40px', padding: '40px' }}>
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              position: 'relative',
              width: '200px',
              height: '200px',
              margin: '0 auto 20px',
              borderRadius: '50%',
              overflow: 'hidden',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            }}>
            <img src={userData.photo} alt='Profile' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div
              style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                right: '0',
                background: 'rgba(0,0,0,0.5)',
                padding: '5px',
                color: 'white',
                cursor: 'pointer',
              }}>
              <Camera size={20} style={{ margin: '0 auto' }} />
            </div>
          </div>
          <h3 style={{ margin: '0', fontSize: '1.4rem' }}>{userData.name}</h3>
          <p style={{ color: '#666', marginTop: '5px' }}>{userData.role}</p>

          <div
            style={{
              marginTop: '30px',
              padding: '15px',
              background: '#f8fafc',
              borderRadius: '8px',
              textAlign: 'left',
            }}>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '10px' }}>Estadísticas de Usuario</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748b' }}>
              <span>Miembro desde</span>
              <strong>Jan 2025</strong>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.8rem',
                color: '#64748b',
                marginTop: '5px',
              }}>
              <span>Publicaciones</span>
              <strong>15</strong>
            </div>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h4 style={{ margin: '0' }}>Información Personal</h4>
            <Button variant={isEditing ? 'ghost' : 'outline'} size='sm' onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? 'Cancelar' : 'Editar Información'}
            </Button>
          </div>

          {isEditing ? (
            <Form
              schema={profileSchema}
              values={userData}
              submitLabel='Guardar Cambios'
              onCancel={() => setIsEditing(false)}
              method='post'
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              <div>
                <label
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: '#94a3b8',
                    display: 'block',
                    marginBottom: '5px',
                  }}>
                  Nombre
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem' }}>
                  <UserCircle size={18} color='#64748b' />
                  <span>{userData.name}</span>
                </div>
              </div>
              <div>
                <label
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: '#94a3b8',
                    display: 'block',
                    marginBottom: '5px',
                  }}>
                  Correo Electrónico
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem' }}>
                  <Mail size={18} color='#64748b' />
                  <span>{userData.email}</span>
                </div>
              </div>
              <div>
                <label
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: '#94a3b8',
                    display: 'block',
                    marginBottom: '5px',
                  }}>
                  Teléfono
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem' }}>
                  <Phone size={18} color='#64748b' />
                  <span>{userData.phone}</span>
                </div>
              </div>
              <div>
                <label
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: '#94a3b8',
                    display: 'block',
                    marginBottom: '5px',
                  }}>
                  Dirección
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem' }}>
                  <MapPin size={18} color='#64748b' />
                  <span>{userData.address}</span>
                </div>
              </div>
            </div>
          )}

          <div style={{ marginTop: '40px', borderTop: '1px solid #f1f5f9', paddingTop: '30px' }}>
            <h4 style={{ marginBottom: '15px' }}>Seguridad</h4>
            <Button variant='outline' size='md' onClick={() => undefined}>
              Cambiar Contraseña
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
