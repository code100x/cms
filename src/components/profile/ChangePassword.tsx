'use client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useRef, useState } from 'react';
import { changePassword } from '@/actions/user';
import { toast } from 'sonner';
import { signOut } from 'next-auth/react';

export function ChangePassword() {
  const [checkingPassword, setCheckingPassword] = useState<Boolean>(false);
  const isValidPass = useRef<Boolean>(true);

  const formSchema = z.object({
    currentpassword: z.string({ message: 'Required' }),
    newpassword: z
      .string({ message: 'Required' })
      .min(6, { message: 'Min length 6 required' }),
    confirmpassword: z
      .string({ message: 'Required' })
      .min(6, { message: 'Min length 6 required' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.newpassword === values.confirmpassword)
      isValidPass.current = true;
    else isValidPass.current = false;

    if (!isValidPass.current) return;

    setCheckingPassword(true);
    const res = await changePassword({
      currentpassword: values.currentpassword,
      newpassword: values.newpassword,
      confirmpassword: values.confirmpassword,
    });
    if (!res?.error) {
      toast.success('Password Changed\nLogin Again');
      await signOut();
    } else {
      toast.error('oops something went wrong..!');
    }
    setCheckingPassword(false);
  }
  return (
    <div className="bg-gray-100 dark:bg-gray-950 rounded-lg shadow-md p-6 w-full h-full">
      <h2 className="text-xl font-bold mb-4 text-center">Chage Password</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="currentpassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your current Password"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newpassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your new Password"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmpassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Confirm your current Password"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isValidPass.current ? null : (
            <p className="text-red-800 text-md">
              New and Confirm password does not match
            </p>
          )}
          <div className="flex justify-center items-center">
            <Button
              type="submit"
              disabled={checkingPassword as boolean}
              className="text-white dark:text-white"
            >
              Change Password
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
