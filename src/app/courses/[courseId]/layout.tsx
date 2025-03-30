const Layout = async ({ children }: { children: any }) => {
  return (
    <div className="relative flex min-h-screen flex-col pt-44 sm:pt-36">
      {children}
    </div>
  );
};
export default Layout;
