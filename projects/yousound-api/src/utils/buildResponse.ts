export interface IResponse<T, E> {
  /**
   * Response timestamp
   */
  timestamp?: Date;

  /**
   * Represents if the request was succeed
   * should be false in case of any error including validation
   */
  success?: boolean;

  /**
   * This object contains the response data
   * Will be null when success is false
   */
  data?: T | null;

  /**
   * Contains all errors including validation
   * Will be null empty if success is true
   */
  error?: {
    code: string;
    description?: string;
    validationErrors?: Array<E>;
  } | null;
}

/**
 * Creates response object to be sent to client
 * @param response
 */
export const buildResponse = <T, E>(
  response: Partial<IResponse<T, E>>
): IResponse<T, E> => {
  return {
    success: response.success || false,
    timestamp: response.timestamp || new Date(),
    data: response.data || null,
    error: response.error || null,
  };
};
