import { CircularProgress } from '@abdt/ornament';
import { LastUpdate } from 'widgets/last-update';
import { Logo } from './ui/Icons';
import { SearchResultItem } from './ui/search-result-item';
import { SearchInput } from './ui/search-input';

import './model';

export const Page = () => (
  <>
    <LastUpdate />
    <div className="mb-8">
      <Logo />
    </div>
    <SearchInput />
    <div className="w-full mt-2">
      <SearchResultItem
        title="Скворцов Максим Михайлович"
        description="Подразделение ЕПЦ"
        type="employee"
      />
      <SearchResultItem
        title="ЕПЦ"
        description="Команд: 10; Сотрудников: 20"
        type="art"
      />
    </div>
    <div className="mt-6">
      <CircularProgress size={50} />
    </div>
  </>
);
