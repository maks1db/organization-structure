import { FC } from 'react';
import { Paper } from '@abdt/ornament';
import cn from 'classnames';

interface ButtonProps {
  isActive?: boolean;
  className?: string;
  elevation?: number;
}

export const Button: FC<ButtonProps> = ({
  isActive,
  className,
  elevation,
  children,
}) => (
  <Paper
    className={cn(
      'w-full h-12 cursor-pointer flex justify-center items-center ',
      isActive && 'border-solid border-2 border-abdt-neonGray900',
      className
    )}
    elevation={elevation}
  >
    {children}
  </Paper>
);
