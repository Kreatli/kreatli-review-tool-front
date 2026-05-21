const capitalizeFirstLetter = (value: string) => {
  return String(value).charAt(0).toUpperCase() + String(value).slice(1);
};

export const getErrorMessage = (error: unknown) => {
  const errorMessage = error as { message?: string | string[] | { response?: { data?: { message?: string } } } };

  if (
    'response' in errorMessage &&
    errorMessage.response &&
    typeof errorMessage.response === 'object' &&
    'data' in errorMessage.response &&
    errorMessage.response.data &&
    typeof errorMessage.response.data === 'object' &&
    'message' in errorMessage.response.data &&
    typeof errorMessage.response.data.message === 'string'
  ) {
    return errorMessage.response.data.message;
  }

  if (typeof errorMessage === 'string') {
    return errorMessage;
  }

  if ('message' in errorMessage && typeof errorMessage.message === 'string') {
    return capitalizeFirstLetter(errorMessage.message);
  }

  if ('message' in errorMessage && Array.isArray(errorMessage.message)) {
    const message = errorMessage.message[0];

    if (typeof message === 'string') {
      return capitalizeFirstLetter(errorMessage.message[0]);
    }
  }

  return 'Something went wrong';
};

/**
 * Returns true when the API response is a 403 that signals a subscription
 * limit has been hit (asset count, storage, etc.) rather than a plain
 * permission-denied error.
 */
export const isLimitError = (error: unknown): boolean => {
  if (!error || typeof error !== 'object') return false;

  const status = 'status' in error ? (error as { status?: unknown }).status : undefined;
  if (status !== 403) return false;

  const message = getErrorMessage(error).toLowerCase();

  return message.includes('limit reached') || message.includes('limit exceeded');
};
