export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const baseUrl = process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, '');

export async function apiClient<T>(path: string, options: RequestInit = {}): Promise<T> {
  if (!baseUrl) {
    throw new ApiError('Set EXPO_PUBLIC_API_URL before making an API request.', 0);
  }

  let response: Response;
  try {
    response = await fetch(`${baseUrl}${path}`, {
      ...options,
      headers: {
        Accept: 'application/json',
        ...options.headers,
      },
    });
  } catch {
    throw new ApiError('Network request failed. Check the device connection and API URL.', 0);
  }

  const body = await response.text();
  const payload: unknown = body ? tryParseJson(body) : null;

  if (!response.ok) {
    const message = getErrorMessage(payload) ?? `Request failed with status ${response.status}.`;
    throw new ApiError(message, response.status);
  }

  return payload as T;
}

function tryParseJson(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function getErrorMessage(payload: unknown): string | undefined {
  if (typeof payload === 'object' && payload !== null && 'message' in payload) {
    const { message } = payload as { message?: unknown };
    return typeof message === 'string' ? message : undefined;
  }

  return typeof payload === 'string' ? payload : undefined;
}
