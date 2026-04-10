import React, { useState } from 'react';
import { X, RefreshCw } from 'lucide-react';
import { Button } from '../Button/Button';

export interface AvatarGeneratorProps {
  onSelect: (url: string) => void;
  onClose: () => void;
  initialSeed?: string;
  className?: string;
  style?: React.CSSProperties;
}

const DICEBEAR_STYLES = [
  { value: 'avataaars', label: 'Persona' },
  { value: 'micah', label: 'Minimalista' },
  { value: 'bottts', label: 'Robot' },
  { value: 'fun-emoji', label: 'Emoji' },
  { value: 'lorelei', label: 'Caricatura' },
  { value: 'adventurer', label: 'Aventurero' },
];

export const AvatarGenerator: React.FC<AvatarGeneratorProps> = ({
  onSelect,
  onClose,
  initialSeed = 'Juan',
  className,
  style,
}) => {
  const [generatorSeed, setGeneratorSeed] = useState(initialSeed);
  const [generatorStyle, setGeneratorStyle] = useState('avataaars');

  const generatedUrl = `https://api.dicebear.com/9.x/${generatorStyle}/svg?seed=${encodeURIComponent(generatorSeed)}`;

  return (
    <div
      className={className}
      style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        textAlign: 'left',
        ...style,
      }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '15px',
        }}>
        <span style={{ fontSize: '1.05rem', fontWeight: 600 }}>Generador de Avatares</span>
        <X size={18} style={{ cursor: 'pointer', color: '#64748b' }} onClick={onClose} />
      </div>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div style={{ flex: '1', minWidth: '120px', textAlign: 'center' }}>
          <img
            src={generatedUrl}
            alt='Preview'
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: '#f1f5f9',
              marginBottom: '15px',
              objectFit: 'cover',
            }}
          />
          <div>
            <Button size='sm' onClick={() => onSelect(generatedUrl)} style={{ width: '100%' }}>
              Usar Avatar
            </Button>
          </div>
        </div>

        <div style={{ flex: '2', minWidth: '200px' }}>
          <label
            htmlFor='estilo'
            style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>
            Estilo de Avatar
          </label>
          <select
            value={generatorStyle}
            onChange={(e) => setGeneratorStyle(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              marginBottom: '15px',
              fontSize: '0.9rem',
            }}>
            {DICEBEAR_STYLES.map((styleOp) => (
              <option key={styleOp.value} value={styleOp.value}>
                {styleOp.label}
              </option>
            ))}
          </select>

          <label
            htmlFor='semilla'
            style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>
            Semilla (Cambia para generar otros)
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type='text'
              value={generatorSeed}
              onChange={(e) => setGeneratorSeed(e.target.value)}
              style={{
                flex: '1',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontSize: '0.9rem',
              }}
              placeholder='Escribe algo...'
            />
            <Button variant='outline' onClick={() => setGeneratorSeed(Math.random().toString(36).substring(7))}>
              <RefreshCw size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
