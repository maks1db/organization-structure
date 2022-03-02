import { Divider, Fade, ListItemText, Menu, MenuItem } from '@abdt/ornament';
import { combine } from 'effector';
import { useStore } from 'effector-react';
import { FC } from 'react';

import styles from './ContextMenu.module.scss';
import { $anchor, $isOpened, $menu, setMenuOpened } from './model';

const $store = combine({
  anchor: $anchor,
  menu: $menu,
  isOpened: $isOpened,
});

const handleClose = () => setMenuOpened(false);

export const ContextMenu: FC = () => {
  const { anchor, menu, isOpened } = useStore($store);
  return (
    <Menu
      anchorEl={anchor}
      open={isOpened}
      onClose={handleClose}
      TransitionComponent={Fade}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      classes={{
        paper: styles.list,
      }}
    >
      {menu.map((x, ind) =>
        x.divider ? (
          // eslint-disable-next-line react/no-array-index-key
          <Divider key={ind} />
        ) : (
          <MenuItem
            style={{ minWidth: '12rem' }}
            {...x.props}
            onClick={() => {
              x.action?.();
              handleClose();
            }}
            key={x.name}
            selected={false}
          >
            <ListItemText>{x.name}</ListItemText>
          </MenuItem>
        )
      )}
    </Menu>
  );
};
