import { FC } from 'react';
import {
  Paper,
  Typography,
  Grid,
  TextField,
  Divider,
  Button,
} from '@abdt/ornament';
import { Close } from '@abdt/icons';
import { useStore } from 'effector-react';
import { combine } from 'effector';
import {
  Table,
  $activeElement,
  $filter,
  setFilterValue,
} from './components/table';
import {
  Bold,
  Color,
  Italic,
  TextColor,
  Underline,
} from './components/buttons';
import {
  $entityTitle,
  entitySelected,
  closeEditor,
  $anchor,
  $isOpened,
} from './model';
import { Popover } from './components/Popover';

const closeForm = () => closeEditor();

const FilterText = () => {
  const filter = useStore($filter);
  return (
    <TextField
      label="Поиск элемента"
      size="small"
      className="w-full"
      value={filter}
      onChange={e => setFilterValue(e.target.value)}
    />
  );
};

const SelectButton = () => {
  const activeElement = useStore($activeElement);
  return (
    <Button
      className="w-full mt-2"
      disabled={activeElement === null}
      onClick={() => activeElement && entitySelected(activeElement)}
    >
      Выбрать
    </Button>
  );
};

const $store = combine({
  anchor: $anchor,
  isOpened: $isOpened,
  title: $entityTitle,
});

export const EntityEditor: FC = () => {
  const { anchor, isOpened, title } = useStore($store);
  return (
    <Popover onClose={closeEditor} isOpened={isOpened} anchorEl={anchor}>
      <Paper className="p-3 relative w-80" elevation={2}>
        <div
          className="absolute top-0 right-0 p-2 cursor-pointer"
          onClick={closeForm}
          onKeyUp={closeForm}
          role="button"
          tabIndex={0}
        >
          <Close />
        </div>
        <Typography component="div" variant="caption" className="font-bold">
          {title}
        </Typography>
        <Grid container spacing={3} className="mt-1">
          <Grid item xs={9}>
            <FilterText />
            <Table className="h-56 mt-2" title={title} />
          </Grid>
          <Grid item xs={3}>
            <Color />
            <TextColor className="mt-2" />
            <Divider className="mb-2 mt-2" />
            <Bold className="mt-2" />
            <Italic className="mt-2" />
            <Underline className="mt-2" />
          </Grid>
        </Grid>
        <SelectButton />
      </Paper>
    </Popover>
  );
};
