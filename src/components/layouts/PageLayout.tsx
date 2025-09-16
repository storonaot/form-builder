import { FC, PropsWithChildren } from "react";

export const PageLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto">{children}</div>
    </div>
  );
};
