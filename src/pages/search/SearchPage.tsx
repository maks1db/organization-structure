import { TextField, InputAdornment, CircularProgress } from '@abdt/ornament';
import { Search } from '@abdt/icons';
import { LastUpdate } from 'widgets/last-update';
import { Logo } from './ui/Icons';
import { Result } from './ui/Result';

export const Page = () => (
  <>
    <LastUpdate />
    <div className="mb-8">
      <Logo />
    </div>
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
    <CircularProgress size={60} className="mt-8" />

    <div className="w-full">
      <Result.User
        title="Скворцов Максим Михайлович"
        description="Подразделение ЕПЦ"
      />
      <Result.Art title="ЕПЦ" description="Команд: 10; Сотрудников: 20" />
    </div>
  </>
);
