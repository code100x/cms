import React from 'react';

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <main className="pt-36 pb-20">{children}</main>
    </div>
  );
};

export default MarketingLayout;
