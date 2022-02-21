import { CircularProgress } from '@abdt/ornament';
import { LastUpdate } from 'widgets/last-update';
import { combine } from 'effector';
import { useStore } from 'effector-react';
import { Logo } from './ui/Icons';
import { SearchResultItem } from './ui/search-result-item';
import { SearchInput } from './ui/search-input';

import { $searchResult, searchFx } from './model';

const $store = combine({
  isFetching: searchFx.pending,
  searchResult: $searchResult,
});

export const Page = () => {
  const { isFetching, searchResult } = useStore($store);

  console.log(isFetching, searchResult);
  return (
    <>
      <LastUpdate />
      <div className="mb-8">
        <Logo />
      </div>
      <SearchInput />
      {!isFetching && (
        <div className="w-full mt-2">
          {searchResult.map((x, ind) => (
            // eslint-disable-next-line react/no-array-index-key
            <SearchResultItem key={`${x.entityId}-${ind}`} {...x} />
          ))}
        </div>
      )}
      {isFetching && (
        <div className="mt-6">
          <CircularProgress size={50} />
        </div>
      )}
    </>
  );
};
