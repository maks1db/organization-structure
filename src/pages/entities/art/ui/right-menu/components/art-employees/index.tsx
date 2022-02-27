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
import { $list } from './model';
import { ART_EMPLOYEE } from '../../../../constants';

export const ArtEmployees: FC = () => {
  const list = useStore($list);
  return (
    <TableContainer component={Paper} className="h-1/2">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{`Нераспределенные сотрудники (${list.length} шт.)`}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map(x => (
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
                    uid: x?._id,
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
