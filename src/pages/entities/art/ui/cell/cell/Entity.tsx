/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FC } from 'react';
import cn from 'classnames';
import { Close } from '@abdt/icons';
import { useStoreMap } from 'effector-react';
import styles from './Entity.module.scss';
import { $movedValue } from './model';

type EntityProps = {
  name: string;
  isEntityFromStartCell?: boolean;
  id: string;
  onRemove: () => void;
};

export const Entity: FC<EntityProps> = ({
  name,
  isEntityFromStartCell,
  id,
  onRemove,
}) => {
  const isMovedEntity =
    useStoreMap($movedValue, state => state?.id === id) &&
    isEntityFromStartCell;

  return (
    <div
      className={cn(
        'flex items-center justify-center text-sm h-8 bg-blue-200 relative',
        !isMovedEntity && styles.entity,
        isMovedEntity &&
          'shadow-inner border-dashed border-2 border-abdt-neon600 opacity-50'
      )}
    >
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

      {name}
    </div>
  );
};
