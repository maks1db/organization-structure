/* eslint-disable @typescript-eslint/naming-convention */
export type EntityType = 'employee' | 'art' | 'team';

export type PositionType = {
  _id: string;
  name: string;
};

export type EmployeeType = {
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

type FontType = {
  size?: string;
  color?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
};

type TeamType = {
  _id: string;
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
    team?: TeamType;
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
