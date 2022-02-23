import { FC } from 'react';

import { Paper, Grid } from '@abdt/ornament';
import cn from 'classnames';

const Cell: FC<{ className: string }> = ({ className }) => (
  <Grid item xs={4}>
    <Paper
      className={cn('h-10 w-10 cursor-pointer', className)}
      elevation={3}
    />
  </Grid>
);

export const Colors: FC = () => (
  <Paper className="p-2">
    <Grid container spacing={1} className="mb-2">
      <Cell className="bg-white" />
      <Cell className="bg-red-600" />
      <Cell className="bg-blue-600" />
    </Grid>
    <Grid container spacing={1}>
      <Cell className="bg-yellow-600" />
      <Cell className="bg-green-600" />
      <Cell className="bg-gray-800" />
    </Grid>
  </Paper>
);
