import { AxiosError } from 'axios';
import { ZodError } from 'zod';

export function isAxiosError(error: AxiosError | Error): error is AxiosError {
  return (error as AxiosError).isAxiosError;
}

export function isZodError(error: ZodError | Error): error is ZodError {
  return (error as ZodError).errors !== undefined;
}

export function getErrorMessage(error: any) {
  if (isAxiosError(error)) {
    return error.message;
  } else if (isZodError(error)) {
    return error.errors[0].message;
  } else if (error.message) {
    return error.message;
  } else {
    return 'Please try again later.';
  }
}
