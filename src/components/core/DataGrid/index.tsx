import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../Button/Button';
import styles from './DataGrid.module.css';

interface Action<T> {
  label: string;
  icon?: React.ReactNode;
  onClick: (item: T) => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
}

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (value: any, item: T) => React.ReactNode;
}

interface DataGridProps<T> {
  idKey: keyof T;
  title?: string;
  data: T[];
  columns: Column<T>[];
  onAdd?: () => void;
  addLabel?: string;
  actions?: Action<T>[];
  pageSize?: number;
}

export default function DataGrid<T extends Record<string, any>>({
  idKey,
  title,
  data,
  columns,
  onAdd,
  addLabel = 'Agregar',
  actions,
}: DataGridProps<T>) {
  return (
    <div className={styles.grid}>
      <header className={styles.grid__header}>
        {title && <h2 className={styles.grid__title}>{title}</h2>}
        {onAdd && (
          <Button variant='primary' size='md' onClick={onAdd}>
            <Plus size={18} />
            <span>{addLabel}</span>
          </Button>
        )}
      </header>

      <div className={styles['grid__table-wrapper']}>
        <table className={styles.grid__table}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={String(col.key)}>{col.label}</th>
              ))}
              {actions && <th className={styles['grid__actions-header']}>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={String(item[idKey])}>
                {columns.map((col) => (
                  <td key={String(col.key)} data-label={col.label}>
                    {col.render ? col.render(item[String(col.key)], item) : item[String(col.key)]}
                  </td>
                ))}
                {actions && (
                  <td className={styles['grid__actions-cell']}>
                    <div className={styles.grid__actions}>
                      {actions.map((action, idx) => (
                        <Button
                          key={idx}
                          variant={action.variant ?? 'ghost'}
                          size='sm'
                          onClick={() => action.onClick(item)}
                          title={action.label}>
                          {action.icon ?? action.label}
                        </Button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className={styles.grid__footer}>
        <span className={styles.grid__count}>Mostrando {data.length} registros</span>
        <div className={styles.grid__pagination}>
          <Button variant='ghost' size='sm' onClick={() => undefined} disabled>
            <ChevronLeft size={18} />
          </Button>
          <span className={styles.grid__page}>Página 1</span>
          <Button variant='ghost' size='sm' onClick={() => undefined} disabled>
            <ChevronRight size={18} />
          </Button>
        </div>
      </footer>
    </div>
  );
}
