/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FC } from 'react';
import { useStoreMap } from 'effector-react';
import { $value } from 'features/drag-n-drop';
import { BaseEntity } from '../base';

type EntityProps = {
  name: string;
  isEntityFromStartCell?: boolean;
  id: string;
  onRemove: () => void;
  className?: string;
};

export const Entity: FC<EntityProps> = ({
  name,
  isEntityFromStartCell,
  id,
  onRemove,
  className,
}) => {
  const isMovedEntity =
    useStoreMap($value, state => state?.value?.id === id) &&
    isEntityFromStartCell;

  return (
    <BaseEntity
      isMovedEntity={isMovedEntity}
      name={name}
      onRemove={onRemove}
      className={className}
    />
  );
};
