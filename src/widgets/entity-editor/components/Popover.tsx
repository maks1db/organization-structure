import { FC } from 'react';
import { Popover as PopoverBase } from '@abdt/ornament';

export interface PopoverType {
  anchorEl: HTMLElement | null;
  isOpened: boolean;
  onClose: () => void;
}

export const Popover: FC<PopoverType> = ({
  isOpened,
  onClose,
  anchorEl,
  children,
}) => {
  return (
    <PopoverBase
      open={isOpened}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'left',
      }}
    >
      {children}
    </PopoverBase>
  );
};
