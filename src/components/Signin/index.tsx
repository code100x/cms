'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SigninForm from './SigninForm';
import ForgetPasswordForm from './ForgetPasswordForm';

const Signin = () => {
  const [forgetPassword, setForgetPassword] = useState(false);

  return (
    <section className="wrapper relative flex min-h-screen items-center justify-center overflow-hidden antialiased">
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
        <div className="flex flex-col text-center">
          <h2 className="text-3xl font-semibold tracking-tighter md:text-4xl">
            Welcome to{' '}
            <span className="bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text pr-1 font-black tracking-tighter text-transparent">
              100xDevs
            </span>
          </h2>
          {!forgetPassword && (
            <p className="text-lg font-medium tracking-tighter text-primary/75 md:text-xl">
              Log in to access paid content!
            </p>
          )}
        </div>
        {forgetPassword ? (
          <ForgetPasswordForm setForgetPassword={setForgetPassword} />
        ) : (
          <SigninForm setForgetPassword={setForgetPassword} />
        )}
      </motion.div>
      <div className="absolute -bottom-[16rem] -z-[20] size-[24rem] overflow-hidden rounded-full bg-gradient-to-t from-blue-400 to-blue-700 blur-[16em]" />
    </section>
  );
};

export default Signin;
