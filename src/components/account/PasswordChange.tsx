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
import { ChangePasswordSchema } from '@/actions/user/schema';
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

export function PasswordChange() {
  const [checkingPassword, setCheckingPassword] = useState<boolean>(false);
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const [viewNewPassword, setViewNewPassword] = useState<boolean>(false);
  const [viewConfirmPassword, setViewConfirmPassword] =
    useState<boolean>(false);

  const isValidPass = useRef<boolean>(true);
  const formSchema = ChangePasswordSchema;

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
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.5,
        ease: 'easeInOut',
        type: 'spring',
        damping: 10,
      }}
      className="flex w-full flex-col justify-between gap-12 rounded-2xl bg-primary/5 p-8 md:max-w-[30vw]"
    >
      <h2 className="text-center text-xl font-bold">Change Password</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="currentpassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <div className="flex items-center justify-evenly space-x-1">
                    <Input
                      placeholder="Enter your current Password"
                      {...field}
                      type={viewPassword ? 'text' : 'password'}
                    />
                    <span
                      onClick={() => setViewPassword((prev) => !prev)}
                      className="hover:cursor-pointer"
                    >
                      {viewPassword ? <EyeOff /> : <Eye />}
                    </span>
                  </div>
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
                  <div className="flex items-center justify-evenly space-x-1">
                    <Input
                      placeholder="Enter your new Password"
                      {...field}
                      type={viewNewPassword ? 'text' : 'password'}
                    />
                    <span
                      onClick={() => setViewNewPassword((prev) => !prev)}
                      className="hover:cursor-pointer"
                    >
                      {viewNewPassword ? <EyeOff /> : <Eye />}
                    </span>
                  </div>
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
                  <div className="flex items-center justify-evenly space-x-1">
                    <Input
                      placeholder="Confirm your current Password"
                      {...field}
                      type={viewConfirmPassword ? 'text' : 'password'}
                    />
                    <span
                      onClick={() => setViewConfirmPassword((prev) => !prev)}
                      className="hover:cursor-pointer"
                    >
                      {viewConfirmPassword ? <EyeOff /> : <Eye />}
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isValidPass.current ? null : (
            <p className="text-md text-red-800">
              New and Confirm password does not match
            </p>
          )}
          <div className="flex items-center justify-center">
            <Button
              type="submit"
              variant={'branding'}
              disabled={checkingPassword as boolean}
            >
              Change Password
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
