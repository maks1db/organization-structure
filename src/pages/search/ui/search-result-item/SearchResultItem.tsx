import { List as ListIcon, User as UserIcon } from '@abdt/icons';
import { Typography } from '@abdt/ornament';
import { IconProps } from '@material-ui/core';
import { FC } from 'react';
import { EntityType } from 'shared/types/api';

import styles from './SearchResultItem.module.scss';

interface ResultItemProps {
  title: string;
  description: string;
  type: EntityType;
}

const Icons = {
  art: ListIcon,
  employee: UserIcon,
  team: ListIcon,
} as Record<EntityType, FC<IconProps>>;

export const SearchResultItem: FC<ResultItemProps> = ({
  title,
  description,
  type,
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
          className="font-medium text-abdt-gray850"
        >
          {title}
        </Typography>
        <Typography
          variant="caption"
          component="span"
          className="font-medium text-abdt-gray500"
        >
          {description}
        </Typography>
      </div>
    </div>
  );
};
