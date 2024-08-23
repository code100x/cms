'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const WaveBackground = () => (
  <div className="absolute inset-0 overflow-hidden bg-gray-900">
    <svg
      className="waves"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 24 150 28"
      preserveAspectRatio="none"
      shapeRendering="auto"
    >
      <defs>
        <path
          id="gentle-wave"
          d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
        />
      </defs>
      <g className="parallax">
        <use xlinkHref="#gentle-wave" x="48" y="-1" fill="rgba(0,87,175,0.7)" />
        <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(0,87,175,0.5)" />
        <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(0,87,175,0.3)" />
        <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgba(0,87,175,0.1)" />
      </g>
    </svg>
    <style jsx>{`
      .waves {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 60vh;
        min-height: 100px;
        max-height: 150px;
      }
      .parallax > use {
        animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
      }
      .parallax > use:nth-child(1) {
        animation-delay: -2s;
        animation-duration: 7s;
      }
      .parallax > use:nth-child(2) {
        animation-delay: -3s;
        animation-duration: 10s;
      }
      .parallax > use:nth-child(3) {
        animation-delay: -4s;
        animation-duration: 13s;
      }
      .parallax > use:nth-child(4) {
        animation-delay: -5s;
        animation-duration: 20s;
      }
      @keyframes move-forever {
        0% {
          transform: translate3d(-90px, 0, 0);
        }
        100% {
          transform: translate3d(85px, 0, 0);
        }
      }
    `}</style>
  </div>
);

export default function Component() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: false, password: false });

  const router = useRouter();
  const emailRef = useRef('');
  const passwordRef = useRef('');

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  // eslint-disable-next-line no-undef
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({ email: !emailRef.current, password: !passwordRef.current });

    if (!emailRef.current || !passwordRef.current) return;

    setIsLoading(true);
    const loadingToast = toast.loading('Signing in...');

    try {
      const res = await signIn('credentials', {
        username: emailRef.current,
        password: passwordRef.current,
        redirect: false,
      });

      if (res?.error) throw new Error(res.error);

      toast.success('Signed in successfully');
      router.push('/');
    } catch (error) {
      toast.error('Oops! Something went wrong.');
    } finally {
      toast.dismiss(loadingToast);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <section className="relative flex h-screen items-center justify-center overflow-hidden bg-gray-900">
        <WaveBackground />
        <Card className="z-10 w-[90%] max-w-md bg-gray-800/80 text-white backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Sign in to your Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <Input
                  className="border-gray-600 bg-gray-700 pl-4 text-white"
                  name="email"
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  onChange={(e) => {
                    emailRef.current = e.target.value;
                    setErrors((prev) => ({ ...prev, email: false }));
                  }}
                  required
                />
                {errors.email && (
                  <p className="text-sm text-red-500">Email is required</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    className="border-gray-600 bg-gray-700 pl-4 pr-10 text-white"
                    name="password"
                    id="password"
                    type={isPasswordVisible ? 'text' : 'password'}
                    placeholder="••••••••"
                    onChange={(e) => {
                      passwordRef.current = e.target.value;
                      setErrors((prev) => ({ ...prev, password: false }));
                    }}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400"
                    onClick={togglePasswordVisibility}
                  >
                    {isPasswordVisible ? (
                      <EyeOffIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <EyeIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                    <span className="sr-only">
                      {isPasswordVisible ? 'Hide password' : 'Show password'}
                    </span>
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">Password is required</p>
                )}
              </div>
              <Button
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
