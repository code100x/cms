'use client';
import { Button } from '@/components/ui/button';
import { Loader, Mail, KeyRound } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/sonner';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import signinSchema from '@/schemas/singin-schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { toast } from 'sonner';
const Signin = () => {
  const [loading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  async function onSubmit(values: z.infer<typeof signinSchema>) {
    try {
      setIsLoading(true);
      const res = await signIn('credentials', {
        username: values.email,
        password: values.password,
        redirect: false,
      });
      if (!res?.error) {
        toast('Signin Successfull', {
          description: 'You have been signed in successfully.',
          action: {
            label: 'Close',
            onClick: () => toast.dismiss(),
          },
        });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        router.push('/');
      } else {
        toast('Error Signing in', {
          description: 'invalid credentials',
          action: {
            label: 'Close',
            onClick: () => toast.dismiss(),
          },
        });
      }
    } catch (err) {
      toast('Error Signing in', {
        action: {
          label: 'Close',
          onClick: () => toast.dismiss(),
        },
      });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <section className="flex items-center justify-center h-screen">
      <Card className="w-[70%] mx-auto md:w-[70%] lg:w-[30%] ">
        <CardHeader>
          <CardTitle className="text-center mb-6">Signin to 100xDev</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-start items-center text-lg gap-2">
                      <Mail size={18} />
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="enter your email"
                        {...field}
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-start items-center text-lg gap-2">
                      <KeyRound size={18} />
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="enter your password"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full dark:text-white">
                {loading ? <Loader className="animate-spin" /> : 'Signin'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Toaster />
    </section>
  );
};

export default Signin;
