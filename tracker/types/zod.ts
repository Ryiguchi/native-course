import z, { ZodError } from 'zod';

const is10Characters = z.string().refine(val => val.length === 10, {
  message: 'The date is incomplete.',
});

export const formValidator = z.object({
  amount: z
    .object({
      value: z.coerce
        .number()
        .nonnegative('The amount mut be a positive number.'),
    })
    .transform(val => val.value),
  date: z
    .object({
      value: is10Characters.refine(
        dateString => {
          const date = new Date(dateString).toISOString();
          console.log(date);

          return date;
        },
        { message: 'The date is invalid.' }
      ),
    })
    .transform(val => new Date(val.value)),
  description: z
    .object({
      value: z
        .string()
        .trim()
        .min(1, 'Expenses must have a desription.')
        .max(50, 'The description must be shorter than 50 characters.'),
    })
    .transform(val => val.value),
});
