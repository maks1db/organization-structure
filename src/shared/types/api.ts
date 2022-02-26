/* eslint-disable @typescript-eslint/naming-convention */
export type EntityType = 'employee' | 'art' | 'team' | 'artPosition';

export type PositionType = {
  _id: string;
  name: string;
};

export type BaseTeamType = {
  _id: string;
  name: string;
  // Временный ключ для исключения переиспользования ссылок в других артах.
  // Со временем должен быть удален
  ownerName: string;
};

export type EmployeeType = {
  _id: string;
  name: string;
  position: {
    name: string;
    _id: string;
  };
  workType: string;
  serviceId?: string;
  statInitiative?: string;
  meta?: {
    telegram?: string;
    email?: string;
  };
};

// TODO: Нужен ли size?
export type FontType = {
  color?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
};

type TeamType = {
  team: BaseTeamType;
  name: string;
  color?: string;
  font?: FontType;
};

export type ArtPositionType = {
  _id: string;
  name: string;
  group: string;
  positions: PositionType[];
};

export type ArtType = {
  _id: string;
  name: string;
  owner?: EmployeeType;
  color?: string;
  isRaw?: boolean;
  positions: {
    position: ArtPositionType;
    color?: string;
    font?: FontType;
  }[];
  teams: TeamType[];
  employees: {
    _id: string;
    employee?: EmployeeType;
    team?: BaseTeamType;
    position?: PositionType;
    color?: string;
    font?: FontType;
    rate?: string;
  }[];
  unassignedEmployees: EmployeeType[];
};

export type SearchParams = {
  search: string;
  skip: number;
};

export type SearchResult = {
  name: string;
  entityId: string;
  description: string;
  type: EntityType;
};
