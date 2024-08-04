'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

import { toast } from 'sonner';

const emailDomains = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'rediffmail.com',
  'icloud.com',
];

const Signin = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [checkingPassword, setCheckingPassword] = useState(false);
  const [requiredError, setRequiredError] = useState({
    emailReq: false,
    passReq: false,
  });

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState: any) => !prevState);
  }

  function getDomainSuggestion(value: string) {
    if (!value.includes('@')) {
      return emailDomains.map((item) => `${value}@${item}`);
    }
    const [username, domain] = value.split('@');
    return emailDomains
      .filter((item) => item.startsWith(domain))
      .map((item) => `${username}@${item}`);
  }

  const router = useRouter();
  const email = useRef('');
  const password = useRef('');

  // References to password and suggestion elements
  const passwordRef = useRef<HTMLInputElement>(null);
  const suggestionRefs = useRef<HTMLDivElement[]>([]);

  const [open, setOpen] = useState(false); // State to manage the visibility of domain suggestions dropdown
  const [focusedIndex, setFocusedIndex] = useState(-1); // State to track the focused index in the suggestions dropdown

  // Scroll to the focused suggestion when the index changes
  useEffect(() => {
    if (focusedIndex !== -1 && suggestionRefs.current[focusedIndex]) {
      suggestionRefs.current[focusedIndex]?.scrollIntoView({
        block: 'nearest',
      });
    }
  }, [focusedIndex]);

  // Handle keyboard events for navigating and selecting suggestions
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      email.current = getDomainSuggestion(email.current)[focusedIndex];
      setOpen(false);
      passwordRef.current?.focus();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex((prevIndex) =>
        Math.min(prevIndex + 1, getDomainSuggestion(email.current).length - 1),
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  // Handle changes in the email input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    email.current = newValue;
    setRequiredError((prevState) => ({
      ...prevState,
      emailReq: false,
    }));
    // The dropdown will only be open if the new value is longer than 2 characters
    setFocusedIndex(0);
    setOpen(newValue.length > 2);
  };

  const handleSubmit = async (e?: React.FormEvent<HTMLButtonElement>) => {
    const loadId = toast.loading('Signing in...');
    if (e) {
      e.preventDefault();
    }

    if (!email.current || !password.current) {
      setRequiredError({
        emailReq: email.current ? false : true,
        passReq: password.current ? false : true,
      });
      toast.dismiss(loadId);
      return;
    }
    setCheckingPassword(true);
    const res = await signIn('credentials', {
      username: email.current,
      password: password.current,
      redirect: false,
    });

    toast.dismiss(loadId);
    if (!res?.error) {
      router.push('/');
      toast.success('Signed In');
    } else {
      toast.error('oops something went wrong..!');
      setCheckingPassword(false);
    }
  };
  return (
    <section className="flex h-screen items-center justify-center">
      <Card className="mx-auto w-[70%] md:w-[70%] lg:w-[30%]">
        <CardHeader>
          <CardTitle>Signin to your Account</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="relative flex flex-col gap-4">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                value={email.current}
                placeholder="name@email.com"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
              {open && (
                <div className="absolute top-20 z-10 max-h-96 w-full overflow-auto border bg-popover shadow-xl">
                  {getDomainSuggestion(email.current).map((item, index) => (
                    <div
                      ref={(el) => (suggestionRefs.current[index] = el!)}
                      key={index}
                      className={`cursor-pointer p-2 ${
                        focusedIndex === index ? 'bg-blue-800 font-bold' : ''
                      }`}
                      role="option"
                      aria-selected="false"
                      onClick={() => {
                        email.current = `${item}`;
                        setRequiredError((prevState) => ({
                          ...prevState,
                          emailReq: false,
                        }));
                        setOpen(!open);
                        passwordRef.current?.focus();
                      }}
                    >
                      <span className="relative flex w-full items-center p-2 text-sm">
                        <strong>{item}</strong>
                      </span>
                    </div>
                  ))}
                </div>
              )}
              {requiredError.emailReq && (
                <span className="text-red-500">Email is required</span>
              )}
            </div>
            <div className="relative flex flex-col gap-4">
              <Label>Password</Label>
              <div className="flex rounded-lg border">
                <Input
                  className="border-0"
                  name="password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  id="password"
                  placeholder="••••••••"
                  ref={passwordRef}
                  onChange={(e) => {
                    setRequiredError((prevState) => ({
                      ...prevState,
                      passReq: false,
                    }));
                    password.current = e.target.value;
                  }}
                  onKeyDown={async (e) => {
                    if (e.key === 'Enter') {
                      setIsPasswordVisible(false);
                      handleSubmit();
                    }
                  }}
                />
                <button
                  className="absolute bottom-0 right-0 flex h-10 items-center px-4 text-gray-600"
                  onClick={togglePasswordVisibility}
                >
                  {isPasswordVisible ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {requiredError.passReq && (
                <span className="text-red-500">Password is required</span>
              )}
            </div>
          </div>
          <Button
            className="my-3 w-full"
            disabled={checkingPassword}
            onClick={handleSubmit}
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </section>
  );
};

export default Signin;
