export interface IApiResponse<T> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
}

export const createApiResponse = <T>(
  statusCode: number, 
  data: T, 
  message: string = "Success"
): IApiResponse<T> => {
  return {
    statusCode,
    data,
    message,
    success: statusCode < 400
  };
};