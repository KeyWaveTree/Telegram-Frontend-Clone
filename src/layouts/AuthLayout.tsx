import type { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:">
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
};

export default AuthLayout;
