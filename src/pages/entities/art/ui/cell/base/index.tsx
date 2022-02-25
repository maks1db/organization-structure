/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Close } from '@abdt/icons';
import { Paper } from '@abdt/ornament';
import { PaperProps } from '@material-ui/core';
import cn from 'classnames';
import { FC } from 'react';
import { useStoreMap } from 'effector-react';
import { $cellHeights } from '../model';

import styles from './BaseComponents.module.scss';

const DEFAULT_CELL_HEIGHT = 3;
export const DEFAULT_CELL_WIDTH = 14;

const DEFAULT_ENTITY_ROW_HEIGHT = 2;
const DEFAULT_ENTITY_COLUMN_WIDTH = 7;

type EntityProps = {
  name: string;
  isMovedEntity?: boolean;
  onRemove?: () => void;
};

export const BaseEntity: FC<EntityProps> = ({
  name,
  isMovedEntity,
  onRemove,
}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center text-sm h-8 bg-blue-200 relative',
        !isMovedEntity && styles.entity,
        isMovedEntity &&
          'shadow-inner border-dashed border-2 border-abdt-neon600 opacity-50'
      )}
    >
      {onRemove && (
        <div
          className={styles.closeIcon}
          onClick={e => {
            e.stopPropagation();
            onRemove();
          }}
          role="button"
          tabIndex={0}
        >
          <Close width={15} height={15} />
        </div>
      )}

      {name}
    </div>
  );
};

interface BaseCellProps {
  row: number;
  columns?: number;
}

export const BaseCell: FC<PaperProps & BaseCellProps> = ({
  className,
  row,
  columns = 1,
  ...rest
}) => {
  const requiredHeight = useStoreMap(
    $cellHeights,
    state => state.find(({ y }) => y === row)?.height || 0
  );

  const height = (requiredHeight || 0) * DEFAULT_ENTITY_ROW_HEIGHT;
  const width = (columns - 1) * DEFAULT_ENTITY_COLUMN_WIDTH;

  return (
    <Paper
      className={cn(
        'p-2 relative cursor-pointer shadow hover:shadow-2xl active:shadow-inner rounded-none',
        className
      )}
      style={{
        height: `${DEFAULT_CELL_HEIGHT + height}rem`,
        width: `${DEFAULT_CELL_WIDTH + width}rem`,
      }}
      {...rest}
    />
  );
};
