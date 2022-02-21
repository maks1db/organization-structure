import { FC } from 'react';
import { TextField, InputAdornment } from '@abdt/ornament';
import { Search } from '@abdt/icons';
import { useStore } from 'effector-react';

import { $search, setSearchValue } from './model';

export const SearchInput: FC = () => {
  const search = useStore($search);
  return (
    <TextField
      label="Поиск по организационной структуре"
      placeholder="Арты, команды, сотрудники..."
      size="small"
      className="w-6/12"
      value={search}
      onChange={e => setSearchValue(e.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end" className="cursor-pointer">
            <Search />
          </InputAdornment>
        ),
      }}
    />
  );
};
