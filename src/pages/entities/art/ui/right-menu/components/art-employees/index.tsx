import { FC } from 'react';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@abdt/ornament';

import { useStore } from 'effector-react';
import { $employees } from './model';

export const ArtEmployees: FC = () => {
  const employees = useStore($employees);
  return (
    <TableContainer component={Paper} className="h-1/2">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Нераспределенные сотрудники</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((x, ind) => (
            // eslint-disable-next-line react/no-array-index-key
            <TableRow draggable key={`${x.id}-${ind}`}>
              <TableCell>{x.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
