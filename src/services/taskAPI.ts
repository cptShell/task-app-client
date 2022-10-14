import axios, { Axios, AxiosError } from 'axios';
import { TaskApiPath, UserApiPath } from '../common/enums/enums';
import { ApiError, ApiResponse } from '../common/types/api';
import { CreateTaskDTO, TaskDto, UpdateTaskDTO } from '../common/types/types';

export class TaskApi {
  #axiosInstance: Axios;

  constructor(apiPrefix: string) {
    this.#axiosInstance = axios.create({
      baseURL: apiPrefix,
    });
  }

  async createTask(
    payload: CreateTaskDTO
  ): Promise<ApiResponse<TaskDto | null>> {
    try {
      const { data } = await this.#axiosInstance.post<TaskDto>(
        TaskApiPath.TASKS,
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      return { data, message: 'ok' };
    } catch (error) {
      let message: string;

      if (axios.isAxiosError(error)) {
        message = (error.response?.data as ApiError).error;
      } else {
        message = error as string;
      }

      return { data: null, message };
    }
  }

  async updateTask(
    payload: UpdateTaskDTO,
    id: string
  ): Promise<ApiResponse<TaskDto | null>> {
    try {
      const url = `${TaskApiPath.TASKS}/${id}`;
      const { data } = await this.#axiosInstance.patch(url, payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      return { data, message: 'ok' };
    } catch (error) {
      let message: string;

      if (axios.isAxiosError(error)) {
        message = (error.response?.data as ApiError).error;
      } else {
        message = error as string;
      }

      return { data: null, message };
    }
  }

  async getTask(id: string) {}
}
