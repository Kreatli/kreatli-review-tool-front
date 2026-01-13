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
