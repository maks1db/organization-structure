import { FC, MutableRefObject } from 'react';
import { Popover as PopoverBase } from '@abdt/ornament';

export interface PopoverType {
  refAnchorEl: MutableRefObject<null>;
  isOpened: boolean;
  onClose: () => void;
}

export const Popover: FC<PopoverType> = ({
  isOpened,
  onClose,
  refAnchorEl,
  children,
}) => {
  return (
    <PopoverBase
      open={isOpened}
      onClose={onClose}
      anchorEl={refAnchorEl.current}
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
