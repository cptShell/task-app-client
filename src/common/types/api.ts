export type ApiResponse<T> = {
  status: string;
  message?: string;
  data?: T;
};

export type ApiError = {
  message: string;
  name: string;
};
