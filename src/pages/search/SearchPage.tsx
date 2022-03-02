/* eslint-disable react/no-array-index-key */
import { CircularProgress } from '@abdt/ornament';
import { LastUpdate } from 'widgets/last-update';
import { combine } from 'effector';
import { useStore } from 'effector-react';
import { AbdtLogo } from '@abdt/icons';
import { Link } from 'atomic-router-react';
import { reports } from 'features/routing';
import { SearchResultItem } from './ui/search-result-item';
import { SearchInput } from './ui/search-input';

import { $searchResult, searchFx } from './model';

const $store = combine({
  isFetching: searchFx.pending,
  searchResult: $searchResult,
});

export const Page = () => {
  const { isFetching, searchResult } = useStore($store);

  return (
    <>
      <LastUpdate />
      <div className="mb-8">
        <AbdtLogo />
      </div>
      <SearchInput />
      {!isFetching && (
        <div className="w-full mt-2">
          {searchResult.map((x, ind) => (
            <Link
              key={`${x.entityId}-${ind}`}
              to={reports[x.type]}
              params={{ id: x.entityId }}
            >
              <SearchResultItem {...x} />
            </Link>
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
