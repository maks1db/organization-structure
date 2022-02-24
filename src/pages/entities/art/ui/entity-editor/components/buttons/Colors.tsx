import { FC } from 'react';

import { Paper, Grid } from '@abdt/ornament';
import cn from 'classnames';
import { Popover, PopoverType } from '../Popover';

interface CellProps {
  className: string;
  onClick: (color: string) => void;
}

const Cell: FC<CellProps> = ({ className, onClick }) => (
  <Grid item xs={4}>
    <Paper
      className={cn('h-10 w-10 cursor-pointer', className)}
      elevation={3}
      onClick={() => onClick(className.replace('bg-', ''))}
    />
  </Grid>
);

interface ColorsProps extends PopoverType {
  onColorSelect: (color: string) => void;
}

export const Colors: FC<ColorsProps> = ({ onColorSelect, ...popoverProps }) => (
  <Popover {...popoverProps}>
    <Paper className="p-2">
      <Grid container spacing={1} className="mb-2">
        <Cell className="bg-white" onClick={onColorSelect} />
        <Cell className="bg-red-600" onClick={onColorSelect} />
        <Cell className="bg-blue-600" onClick={onColorSelect} />
      </Grid>
      <Grid container spacing={1}>
        <Cell className="bg-yellow-600" onClick={onColorSelect} />
        <Cell className="bg-green-600" onClick={onColorSelect} />
        <Cell className="bg-gray-800" onClick={onColorSelect} />
      </Grid>
    </Paper>
  </Popover>
);
