import { z } from 'zod';

export const subscriberSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required!',
      invalid_type_error: 'Email must be a string!',
    })
    .email({
      message: 'Invalid email address!',
    }),
});
