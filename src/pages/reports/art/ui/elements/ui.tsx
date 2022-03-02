import { FC } from 'react';
import cn from 'classnames';
import { makeEntityPreview } from 'shared/lib/entities';
import * as Icons from './Icons';
import { CellProps, LinkButtonProps } from './types';

const LinkButtonTitles: Record<keyof typeof Icons, string> = {
  Confluence: 'kb.akbars.ru',
  Jira: 'team.akbars.ru',
};

export const LinkButton: FC<LinkButtonProps> = ({ icon, link, className }) => {
  const Icon = Icons[icon];
  return (
    <a
      target="_blank"
      href={link}
      rel="noreferrer"
      className={cn(className)}
      title={LinkButtonTitles[icon]}
    >
      <Icon />
    </a>
  );
};

export const Cell: FC<CellProps> = ({
  data,
  height = 1,
  width = 1,
  name,
  itemsPosition,
  className,
}) => {
  return (
    <div
      style={{
        height: `${2.5 * height}rem`,
        width: `${17 * width}rem`,
      }}
      className={cn(
        'border flex flex-col  justify-center border-gray-100 rounded p-2',
        itemsPosition === 'right' && 'text-right',
        !itemsPosition && 'items-center',
        className
      )}
    >
      {name && <div>{name}</div>}
      {data && data?.length > 0 && (
        <>
          {data.map(x => (
            <div key={x._id} className="my-1">
              {makeEntityPreview(x)}
            </div>
          ))}
        </>
      )}
    </div>
  );
};
