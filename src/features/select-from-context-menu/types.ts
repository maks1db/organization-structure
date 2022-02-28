import { MenuItem } from '@abdt/ornament';
import { ComponentProps } from 'react';

export interface MenuItemType {
  name?: string;
  action?: () => void;
  divider?: boolean;
  props?: ComponentProps<typeof MenuItem>;
}
