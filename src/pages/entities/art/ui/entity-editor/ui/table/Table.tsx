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
import { useStore } from 'effector-react';
import { $entityTitle } from '../../model';

export const Table: FC<{ className: string }> = ({ className }) => {
  const title = useStore($entityTitle);
  return (
    <TableContainer component={Paper} className={className}>
      <BaseTable>
        <TableHead>
          <TableRow>
            <TableCell>{title}</TableCell>
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
