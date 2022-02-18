import { FC } from 'react';
import { TextField, InputAdornment } from '@abdt/ornament';
import { Search } from '@abdt/icons';

export const SearchInput: FC = () => (
  <TextField
    label="Поиск по организационной структуре"
    placeholder="Арты, команды, кланы, сотрудники..."
    size="small"
    className="w-6/12"
    InputProps={{
      endAdornment: (
        <InputAdornment position="end" className="cursor-pointer">
          <Search />
        </InputAdornment>
      ),
    }}
  />
);
