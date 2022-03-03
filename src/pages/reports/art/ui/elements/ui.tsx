/* eslint-disable react/jsx-no-useless-fragment */
import { FC } from 'react';
import cn from 'classnames';
import { makeEntityPreview } from 'shared/lib/entities';
import { Link } from 'atomic-router-react';
import { reports } from 'features/routing';
import * as Icons from './Icons';
import { CellProps, LinkButtonProps } from './types';
import { Item } from '.';

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

const CellLink: FC<Item> = ({ children, ...item }) => {
  if (item.vacancy) {
    return <>{children}</>;
  }

  return (
    <Link to={reports.employee} params={{ id: item._id }}>
      {children}
    </Link>
  );
};

export const Cell: FC<CellProps> = ({
  data,
  height = 1,
  width = 1,
  name,
  itemsPosition,
  className,
  children,
}) => {
  return (
    <div
      style={{
        height: `${2.5 * height}rem`,
        width: `${17 * width}rem`,
      }}
      className={cn(
        'border flex flex-col  justify-center border-gray-100 rounded p-2 relative shadow',
        itemsPosition === 'right' && 'text-right',
        !itemsPosition && 'items-center',
        className
      )}
    >
      {name && <div>{name}</div>}
      {data && data?.length > 0 && (
        <>
          {data.map(x => {
            return (
              <CellLink key={x._id} {...x}>
                <div
                  className={cn(
                    'my-1',
                    x.vacancy && 'font-bold text-red-700',
                    !x.vacancy && 'hover:text-blue-700'
                  )}
                >
                  {makeEntityPreview(x)}
                </div>
              </CellLink>
            );
          })}
        </>
      )}
      {children}
    </div>
  );
};
