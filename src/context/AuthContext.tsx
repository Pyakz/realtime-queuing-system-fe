import React, { createContext, useContext } from "react";
import { useState } from "react";

type AuthType = {
  _id?: string;
  role?: string;
  username?: string;
};

export type AuthContextType = {
  auth: AuthType;
  setAuth: (props: AuthType) => void;
};

export const AuthContext = createContext<AuthContextType>({
  auth: {},
  setAuth: () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export function AuthProvider({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) {
  const [auth, setAuth] = useState({});

  return (
    <React.Fragment>
      <AuthContext.Provider value={{ auth, setAuth }} children={children} />
    </React.Fragment>
  );
}
