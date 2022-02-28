import { FC } from 'react';
import {
  Paper,
  TableContainer,
  Table as BaseTable,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  CircularProgress,
} from '@abdt/ornament';
import { combine } from 'effector';
import { useStore } from 'effector-react';
import cn from 'classnames';
import {
  $isFetching,
  setActiveElement,
  $activeElement,
  $filterResult,
  $entityTitle,
} from './model';

const $store = combine({
  entityTitle: $entityTitle,
  isFetching: $isFetching,
  activeElement: $activeElement,
  items: $filterResult,
});

export const Table: FC<{ className: string }> = ({ className }) => {
  const { activeElement, entityTitle, isFetching, items } = useStore($store);

  if (isFetching) {
    return <CircularProgress size={50} />;
  }

  return (
    <TableContainer component={Paper} className={className}>
      <BaseTable>
        <TableHead>
          <TableRow>
            <TableCell>{entityTitle}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(x => (
            <TableRow
              className="cursor-pointer"
              key={x.id}
              onClick={() => setActiveElement(x)}
            >
              <TableCell
                className={cn(x.id === activeElement?.id && 'font-bold')}
              >
                {x.name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </BaseTable>
    </TableContainer>
  );
};
