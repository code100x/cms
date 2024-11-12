import React, { PropsWithChildren } from "react";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return (
    <p className="p-1 text-red-500 text-xs">
      {children}
    </p>
  );
};

export default ErrorMessage;