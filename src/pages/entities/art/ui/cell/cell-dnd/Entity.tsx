/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FC } from 'react';
import { useStoreMap } from 'effector-react';
import { $movedValue } from './model';
import { BaseEntity } from '../base';

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
    <BaseEntity isMovedEntity={isMovedEntity} name={name} onRemove={onRemove} />
  );
};
