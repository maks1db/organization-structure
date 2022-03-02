import { FC } from 'react';
import cn from 'classnames';
import * as Icons from './Icons';

interface LinkButton {
  icon: keyof typeof Icons;
  link: string;
  className?: string;
}

const LinkButtonTitles: Record<keyof typeof Icons, string> = {
  Confluence: 'kb.akbars.ru',
  Jira: 'team.akbars.ru',
};

export const LinkButton: FC<LinkButton> = ({ icon, link, className }) => {
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
