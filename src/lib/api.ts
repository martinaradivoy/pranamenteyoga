export type ApiResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: string;
};

export function successResponse<T>(data: T): ApiResponse<T> {
  return {
    success: true,
    data,
  };
}

export function errorResponse(error: string): ApiResponse {
  return {
    success: false,
    error,
  };
}

export function validationErrorResponse(
  errors: Record<string, string[]>
): ApiResponse {
  const errorMessage = Object.entries(errors)
    .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
    .join("; ");

  return {
    success: false,
    error: errorMessage,
  };
}
