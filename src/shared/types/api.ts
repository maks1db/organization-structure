/* eslint-disable @typescript-eslint/naming-convention */

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

export type ArtType = {
  _id: string;
  name: string;
  owner?: EmployeeType;
  color?: string;
  positions: {
    position: PositionType;
    color?: string;
    font?: FontType;
  }[];
  teams: TeamType[];
  employees: {
    employee: EmployeeType;
    team?: TeamType;
    position: PositionType;
    color?: string;
    font?: FontType;
    rate?: string;
  }[];
  unassignedEmployees: EmployeeType[];
};
