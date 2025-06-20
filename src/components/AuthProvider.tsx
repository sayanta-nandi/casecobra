"use client";
import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";

import { ReactNode } from "react";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  return <KindeProvider>{children}</KindeProvider>;
};
export default AuthProvider;
