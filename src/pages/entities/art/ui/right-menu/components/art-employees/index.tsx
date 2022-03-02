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

import cn from 'classnames';
import { useStore } from 'effector-react';
import { valueDragged } from 'features/drag-n-drop';
import { makeEntityPreview } from 'shared/lib/entities';
import { $list } from './model';
import { toggleMenuVisibility } from '../../model';
import { ART_EMPLOYEE } from '../../../../constants';

export const ArtEmployees: FC = () => {
  const list = useStore($list);
  return (
    <TableContainer component={Paper} style={{ height: '40%' }}>
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

export const EmployeeInfo: FC<{ className?: string }> = ({ className }) => {
  const list = useStore($list);
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {list.length > 0 && (
        <div
          className={cn('cursor-pointer font-bold', className)}
          onClick={() => toggleMenuVisibility()}
          onKeyUp={() => toggleMenuVisibility()}
          role="button"
          tabIndex={0}
        >
          {`Нераспределенные сотрудники: ${list.length}`}
        </div>
      )}
    </>
  );
};
