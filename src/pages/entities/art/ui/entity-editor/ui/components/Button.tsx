import { FC, ForwardedRef, forwardRef } from 'react';
import { Paper } from '@abdt/ornament';
import cn from 'classnames';

interface ButtonProps {
  isActive?: boolean;
  className?: string;
  elevation?: number;
  onClick?: () => void;
  id?: string;
  ref?: ForwardedRef<unknown>;
}

export const Button: FC<ButtonProps> = forwardRef(
  ({ isActive, className, elevation, children, onClick, id }, ref) => (
    <Paper
      className={cn(
        'w-full h-12 cursor-pointer flex justify-center items-center ',
        isActive && 'border-solid border-2 border-abdt-neonGray900',
        className
      )}
      elevation={elevation}
      onClick={onClick}
      aria-describedby={id}
      ref={ref}
    >
      {children}
    </Paper>
  )
);
