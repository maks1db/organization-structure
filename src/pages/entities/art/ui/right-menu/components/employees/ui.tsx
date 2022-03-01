import { FC } from 'react';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
} from '@abdt/ornament';

import { useStore } from 'effector-react';
import { valueDragged } from 'features/drag-n-drop';
import { makeEntityPreview } from 'shared/lib/entities';
import { combine } from 'effector';
import { $filterEmployees, $filter, setFilterValue } from './model';
import { EMPLOYEE } from '../../../../constants';

const $store = combine({
  filter: $filter,
  list: $filterEmployees,
});

export const Employees: FC = () => {
  const { filter, list } = useStore($store);
  return (
    <>
      <TextField
        label="Сотрудники организации"
        placeholder="Введите имя сотрудника"
        size="small"
        className="w-full mb-3"
        value={filter}
        onChange={e => setFilterValue(e.target.value)}
      />
      <TableContainer component={Paper} style={{ height: '40%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Сотрудники</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map(x => (
              <TableRow
                draggable
                key={x._id}
                onDrag={() => {
                  valueDragged({
                    type: EMPLOYEE,
                    value: {
                      id: x?._id,
                      name: x?.name,
                      workType: x?.workType,
                      uid: x?._id,
                    },
                    dragParams: { rowId: x?._id },
                  });
                }}
              >
                <TableCell>{makeEntityPreview(x)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
