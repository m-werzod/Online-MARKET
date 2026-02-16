import { useState, type FC, type ReactNode } from "react";
import { Context } from "./app-context";

export const GlobalContext: FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  return <Context.Provider value={{ token, setToken }}>{children}</Context.Provider>;
};
