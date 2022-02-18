import { FC } from 'react';
import { User as UserIcon, List as ListIcon } from '@abdt/icons';
import { Typography } from '@abdt/ornament';
import { EntityType } from 'shared/types/entity';
import { IconProps } from '@material-ui/core';

interface ItemProps {
  title: string;
  description: string;
}

const Icons = {
  art: ListIcon,
  employee: UserIcon,
  team: ListIcon,
} as Record<EntityType, FC<IconProps>>;

const BaseItem: FC<ItemProps & { type: EntityType }> = ({
  title,
  description,
  type,
}) => {
  const Icon = Icons[type];
  return (
    <div className="flex px-4 py-2 items-center cursor-pointer hover:bg-abdt-blue100 relative">
      <div>
        <Icon className="mr-6 absolute top-2" />
      </div>
      <div className="flex flex-col relative left-10">
        <Typography
          variant="body1"
          component="div"
          className="font-medium text-abdt-gray850"
        >
          {title}
        </Typography>
        <Typography
          variant="caption"
          component="div"
          className="font-medium text-abdt-gray500"
        >
          {description}
        </Typography>
      </div>
    </div>
  );
};

const User: FC<ItemProps> = props => <BaseItem {...props} type="employee" />;

const Art: FC<ItemProps> = props => <BaseItem {...props} type="art" />;

export const Result = {
  User,
  Art,
};
