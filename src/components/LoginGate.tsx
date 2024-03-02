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
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Sign in
      </button>
    </div>
  );
};

export default LoginGate;
