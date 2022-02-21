import {
  List as ListIcon,
  User as UserIcon,
  TechChat as TechChatIcon,
} from '@abdt/icons';
import { Typography } from '@abdt/ornament';
import { IconProps } from '@material-ui/core';
import { FC } from 'react';
import { EntityType } from 'shared/types/api';

import styles from './SearchResultItem.module.scss';

interface ResultItemProps {
  name: string;
  description: string;
  type: EntityType;
  entityId: string;
}

const Icons = {
  art: ListIcon,
  employee: UserIcon,
  team: TechChatIcon,
} as Record<EntityType, FC<IconProps>>;

export const SearchResultItem: FC<ResultItemProps> = ({
  name,
  description,
  type,
  // TODO: Открытие по ссылке
  entityId,
}) => {
  const Icon = Icons[type];
  return (
    <div className={styles.item}>
      <div>
        <Icon className="mr-6 absolute top-2" />
      </div>
      <div className="flex flex-col relative left-10">
        <Typography
          variant="body1"
          component="span"
          className="font-medium text-gray-900"
        >
          {name}
        </Typography>
        <Typography
          variant="caption"
          component="span"
          className="font-medium text-gray-400"
        >
          {description}
        </Typography>
      </div>
    </div>
  );
};
