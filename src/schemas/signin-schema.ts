import { z } from 'zod';

const signinSchema = z.object({
  input: z.string().min(1 , 'Email or Phone number is required'),
  password: z.string().min(1, 'Password is Required'),
});
export default signinSchema;
