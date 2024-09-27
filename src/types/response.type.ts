export type ResponseMessage<T> = {
  success: boolean;
  data: T | null;
  message?: string;
  error?: {
    status: number;
    message: string;
  };
};
