import React from 'react';

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="no-scrollbar h-full overflow-y-auto pb-20 pt-36">
      {children}
    </main>
  );
};

export default MarketingLayout;
