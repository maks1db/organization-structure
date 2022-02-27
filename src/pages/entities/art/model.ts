import {
    createEffect,
    sample,
    createStore,
    createEvent,
    combine,
} from 'effector';
import { entities } from 'features/routing';
import { getEntityArt } from 'shared/api/entities';
import { ArtType, BaseTeamType, ArtPositionType } from 'shared/types/api';
import { getResultFromResponse } from 'shared/lib/entities';
import { showAppMessage } from 'features/show-message';
import { always, omit, pipe } from 'ramda';
import { pushCells } from './ui/cell';
import {
    buildsEmployeeCells,
    getRange,
    prepareArtPositionsRawArtEmployees,
} from './lib';
import { setHeader, setIsArtModified } from './ui/header';
import { addItem, removeItem } from './ui/cell/model';

const ERROR_LOAD_MESSAGE =
    'Не удалось загрузить арт. Проверьте правильность ссылки';
const OPEN_RAW_ART_MESSAGE =
    'Сотрудники были распределены автоматически по ролям. Проверьте правильность операции';

const getEntityArtFx = createEffect(getEntityArt);

export const $fixedArt = getEntityArtFx.doneData.map(
    pipe(getResultFromResponse, prepareArtPositionsRawArtEmployees)
);

export const removeRow = createEvent<string>();
export const removeColumn = createEvent<string>();
export const setEmployeePositionTeam = createEvent<{
    team: BaseTeamType;
    position: ArtPositionType;
    id: string;
}>();
export const removeEmployeePositionTeam = createEvent<string>();

export const $employees = createStore<ArtType['employees']>([])
    .on($fixedArt, (_, payload) => payload.employees)
    .on(removeEmployeePositionTeam, (state, payload) =>
        state.map(x => {
            if (x.employee?._id === payload) {
                return omit(['team', 'position'], x);
            }
            return x;
        })
    )
    .on(setEmployeePositionTeam, (state, { id, position, team }) =>
        state.map(x => {
            if (x._id === id) {
                return { ...x, position, team };
            }
            return x;
        })
    )
    .on(removeRow, (state, id) =>
        state.map(x => {
            if (x.position?._id === id) {
                return { ...x, position: undefined };
            }
            return x;
        })
    )
    .on(removeColumn, (state, id) =>
        state.map(x => {
            if (x.team?._id === id) {
                return { ...x, team: undefined };
            }
            return x;
        })
    );

export const $positions = createStore<ArtType['positions']>([])
    .on($fixedArt, (_, payload) => payload.positions)
    .on(removeRow, (state, id) => state.filter(x => x.position._id !== id));

export const $teams = createStore<ArtType['teams']>([])
    .on($fixedArt, (_, payload) => payload.teams)
    .on(removeColumn, (state, id) => state.filter(x => x.team._id !== id));

// TODO: Мигрировать
export const $art = createStore<ArtType | null>(null).on(
    $fixedArt,
    (_, payload) => payload
);

export const $columnsRange = $teams.map(getRange);
export const $rowsRange = $positions.map(getRange);

sample({
    clock: entities.art.$isOpened,
    source: entities.art.$params,
    filter: Boolean,
    fn: source => source,
    target: getEntityArtFx,
});

sample({
    clock: $art,
    filter: art => art?.isRaw === true,
    fn: always(OPEN_RAW_ART_MESSAGE),
    target: showAppMessage('success'),
});

sample({
    clock: getEntityArtFx.failData,
    fn: always(ERROR_LOAD_MESSAGE),
    target: showAppMessage('danger'),
});

sample({
    clock: $fixedArt,
    filter: art => art !== null,
    fn: art => buildsEmployeeCells(art as ArtType),
    target: pushCells,
});

sample({
    clock: $art,
    fn: art => art?.name || '',
    target: setHeader,
});

const $source = combine([$employees, $positions, $teams]);

sample({
    clock: [removeRow, removeColumn],
    source: $source,
    fn: ([employees, positions, teams]) =>
        buildsEmployeeCells({ employees, positions, teams }),
    target: [pushCells, setIsArtModified],
});

sample({
    clock: addItem,
    source: combine([$positions, $teams]),
    fn: ([positions, teams], item) =>
        ({
            position: positions[item.y - 1],
            team: teams[item.x - 1],
            id: item.value.uid,
        } as any),
    target: setEmployeePositionTeam,
});

sample({
    clock: removeItem,
    fn: item => item.id || '',
    target: removeEmployeePositionTeam,
});

$employees.watch(console.log);
addItem.watch(console.log);
