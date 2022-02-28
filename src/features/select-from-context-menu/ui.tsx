import { FC, Fragment } from 'react';
import { Menu, MenuItem, Divider, Fade } from '@abdt/ornament';
import { combine } from 'effector';
import { useStore } from 'effector-react';
import { $anchor, $menu, $isOpened, setMenuOpened } from './model';
import styles from './ContextMenu.module.scss';

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
            {...x.props}
            onClick={() => {
              x.action?.();
              handleClose();
            }}
            className="w-52"
            key={x.name}
          >
            {x.name}
          </MenuItem>
        )
      )}
    </Menu>
  );
};
