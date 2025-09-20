'use client';

import React from 'react';

const LoginGate = () => {
  const handleSignIn = () => {
    window.location.href = '/api/auth/signin';
  };

  return (
    <div className="m-32 text-center">
      <div className="mb-4">Please sign in to continue</div>
      <button
        onClick={handleSignIn}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Sign in
      </button>
    </div>
  );
};

export default LoginGate;
