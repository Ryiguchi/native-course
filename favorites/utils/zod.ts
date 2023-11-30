import { z } from 'zod';

export const coordsValidator = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export const isZodError = (error: any): error is z.ZodError => {
  return error instanceof z.ZodError;
};

export const placeIdFromParamsValidator = z.coerce.number().positive();

export const coordParamsValidator = z.object({
  lat: z.coerce.number(),
  lng: z.coerce.number(),
});
