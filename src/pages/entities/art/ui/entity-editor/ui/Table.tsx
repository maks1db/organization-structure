import { FC } from 'react';
import {
  Paper,
  TableContainer,
  Table as BaseTable,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '@abdt/ornament';

export const Table: FC<{ className: string }> = ({ className }) => {
  return (
    <TableContainer component={Paper} className={className}>
      <BaseTable>
        <TableHead>
          <TableRow>
            <TableCell>Сотрудники</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className="cursor-pointer">
            <TableCell>Скворцов М.М.</TableCell>
          </TableRow>
        </TableBody>
      </BaseTable>
    </TableContainer>
  );
};
