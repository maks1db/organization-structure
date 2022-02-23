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
import { Table } from './Table';
import { Bold, Color, Italic, TextColor, Underline } from './buttons';
import { Colors } from './buttons/Colors';

export const EntityEditor: FC = () => {
  return (
    <>
      <Paper className="p-3 relative w-80" elevation={2}>
        <div className="absolute top-0 right-0 p-3 cursor-pointer">
          <Close />
        </div>
        <Typography component="div" variant="caption" className="font-bold">
          Сотруднки
        </Typography>
        <Grid container spacing={3} className="mt-1">
          <Grid item xs={9}>
            <TextField label="Поиск элемента" size="small" className="w-full" />
            <Table className="h-56 mt-2" />
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
        <Button className="w-full mt-2">Выбрать</Button>
      </Paper>
      <Colors />
    </>
  );
};
