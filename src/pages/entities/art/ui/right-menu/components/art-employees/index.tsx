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
import { valueDragged } from 'features/drag-n-drop';
import { makeEntityPreview } from 'shared/lib/entities';
import { $employees } from './model';
import { ART_EMPLOYEE } from '../../../../constants';

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
          {employees.map(x => (
            <TableRow
              draggable
              key={x._id}
              onDrag={() => {
                valueDragged({
                  type: ART_EMPLOYEE,
                  value: {
                    id: x?.employee?._id,
                    name: x?.employee?.name,
                    workType: x?.employee?.workType,
                  },
                  dragParams: { rowId: x?._id },
                });
              }}
            >
              <TableCell>
                {x.employee ? makeEntityPreview(x.employee) : ''}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
