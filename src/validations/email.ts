import { z } from 'zod';

export const emailValidationSchema = z.object({
  name: z.string({
    required_error: 'Name is Required!',
    invalid_type_error: 'Name must be a string!',
  }),

  email: z
    .string({
      required_error: 'Email is Required!',
      invalid_type_error: 'Email must be a string!',
    })
    .email('Invalid Email!'),

  subject: z.string({
    required_error: 'Subject is Required!',
    invalid_type_error: 'Subject must be a string!',
  }),

  message: z.string({
    required_error: 'Message is Required!',
    invalid_type_error: 'Message must be a string!',
  }),
});
