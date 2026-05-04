import { Plus, ChevronLeft, ChevronRight, Inbox } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Button } from '../Button/Button';
import styles from './DataGrid.module.css';

/**
 * Interfaz para las acciones de fila (Editar, Borrar, etc.)
 */
export interface Action<T> {
  label: string; // Etiqueta del botón/acción
  icon?: React.ReactNode; // Icono opcional
  onClick: (item: T) => void; // Función que se ejecuta al hacer clic
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'; // Estilo visual
  name: string;
}

/**
 * Configuración de cada columna de la tabla
 */
export interface Column<T> {
  key: keyof T | string; // Clave del objeto o identificador de la columna
  label: string; // Título de la cabecera
  render?: (value: unknown, item: T) => React.ReactNode; // Renderizado personalizado opcional
}

/**
 * Propiedades del componente DataGrid
 */
export interface DataGridProps<T> {
  idKey: keyof T; // Clave única para las filas (ej. 'id')
  title?: string; // Título opcional de la tabla
  data: T[]; // Array de datos a mostrar
  columns: Column<T>[]; // Configuración de columnas
  onAdd?: () => void; // Función para el botón "+" opcional
  addLabel?: string; // Texto del botón "+", por defecto "Agregar"
  actions?: Action<T>[]; // Acciones de fila opcionales
  pageSize?: number; // Tamaño de la página para la paginación interna
}

/**
 * DataGrid: Un componente de tabla reutilizable con paginación interna,
 * diseño responsivo y acciones personalizables.
 *
 * @example
 * ```tsx
 * <DataGrid
 *   idKey="id"
 *   title="Lista de Usuarios"
 *   data={users}
 *   columns={[
 *     { key: 'name', label: 'Nombre' },
 *     { key: 'email', label: 'Correo' }
 *   ]}
 *   pageSize={5}
 * />
 * ```
 */
export default function DataGrid<T extends object>({
  idKey,
  title,
  data,
  columns,
  onAdd,
  addLabel = 'Agregar',
  actions,
  pageSize = 10,
}: DataGridProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));

  // Calculate actual current page to use (ensure it's not out of bounds)
  const displayPage = currentPage > totalPages ? 1 : currentPage;

  // Adjust state if it's out of bounds (happens during render, React will re-run)
  if (currentPage > totalPages) {
    setCurrentPage(1);
  }

  const paginatedData = useMemo(() => {
    const start = (displayPage - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, displayPage, pageSize]);

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(1, prev - 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(totalPages, prev + 1));

  return (
    <div className={styles.grid}>
      <header className={styles.grid__header}>
        {title && <h2 className={styles.grid__title}>{title}</h2>}
        {onAdd && (
          <Button variant='primary' size='md' onClick={onAdd} name='add'>
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
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <tr key={String(item[idKey])}>
                  {columns.map((col) => (
                    <td key={String(col.key)} data-label={col.label}>
                      {col.render
                        ? col.render(item[col.key as keyof T], item)
                        : (item[col.key as keyof T] as React.ReactNode)}
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
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className={styles.grid__empty}>
                  <div className={styles['grid__empty-content']}>
                    <Inbox size={40} />
                    <p>No se encontraron registros</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <footer className={styles.grid__footer}>
        <span className={styles.grid__count}>
          Mostrando {paginatedData.length} de {data.length} registros
        </span>
        <div className={styles.grid__pagination}>
          <Button variant='ghost' size='sm' onClick={handlePrevPage} disabled={currentPage === 1}>
            <ChevronLeft size={18} />
          </Button>
          <span className={styles.grid__page}>
            Página {currentPage} de {totalPages}
          </span>
          <Button variant='ghost' size='sm' onClick={handleNextPage} disabled={currentPage === totalPages}>
            <ChevronRight size={18} />
          </Button>
        </div>
      </footer>
    </div>
  );
}
