export interface IApiCallReturn<T> {
  error: string | null;
  data: T | null;
}
