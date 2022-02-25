/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Close } from '@abdt/icons';
import { Paper } from '@abdt/ornament';
import { PaperProps } from '@material-ui/core';
import cn from 'classnames';
import { FC } from 'react';

import styles from './BaseComponents.module.scss';

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

export const BaseCell: FC<PaperProps> = ({ className, ...rest }) => (
  <Paper
    className={cn(
      'w-56 p-2 relative cursor-pointer shadow hover:shadow-2xl active:shadow-inner',
      className
    )}
    style={{ height: '3rem' }}
    {...rest}
  />
);
