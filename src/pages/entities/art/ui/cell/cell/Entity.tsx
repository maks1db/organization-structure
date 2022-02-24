import { FC, useState } from 'react';
import cn from 'classnames';
import { SelectItem } from 'shared/types/entities-api';
import { Close } from '@abdt/icons';
import styles from './Entity.module.scss';
import { setValueDnD } from './model';

type Owner = {
  x?: number;
  y?: number;
  index?: number;
};

type DragNDropEntityProps = {
  name: string;
  onStart?: () => void;
  onEnd?: () => void;
  isStarted?: boolean;
  isFake?: boolean;
} & Owner;

const DragNDropEntity: FC<DragNDropEntityProps> = ({
  name,
  onStart,
  onEnd,
  isStarted,
  isFake,
}) => {
  const dragNDropEntity = isStarted || isFake;
  return (
    <div
      className={cn(
        'flex items-center justify-center text-sm h-8 bg-blue-200 relative',
        !dragNDropEntity && styles.entity,
        dragNDropEntity &&
          'shadow-inner border-dashed border-2 border-abdt-neon600',
        isStarted && 'opacity-50'
      )}
      draggable={!isFake}
      onDragStart={onStart}
      onDragEnd={onEnd}
    >
      {!isFake && (
        <div className={styles.closeIcon}>
          <Close width={15} height={15} />
        </div>
      )}
      {name}
    </div>
  );
};

export const Entity: FC<SelectItem & Owner> = props => {
  const [isStarted, setState] = useState(false);

  return (
    <DragNDropEntity
      isStarted={isStarted}
      onStart={() => {
        setState(true);
        setValueDnD(props);
      }}
      onEnd={() => {
        setState(false);
        setValueDnD(null);
      }}
      {...props}
    />
  );
};
