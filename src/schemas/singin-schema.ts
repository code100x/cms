import { z } from 'zod';

const signinSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});
export default signinSchema;
