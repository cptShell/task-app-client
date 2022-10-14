import { SortBy } from '../enums/sort';

export type TaskOptions = {
  page: number;
  description: string;
  completed: boolean;
  sortBy: SortBy;
};

export type TaskDto = {
  description: string;
  completed: boolean;
  owner: string;
  _id: string;
};

export type CreateTaskDTO = {
  description: string;
  completed?: boolean;
};

export type UpdateTaskDTO = Partial<CreateTaskDTO>;
