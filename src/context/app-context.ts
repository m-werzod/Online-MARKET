import { createContext, type Dispatch, type SetStateAction } from "react";

export interface AppContextType {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
}

export const Context = createContext<AppContextType>({
  token: null,
  setToken: () => null,
});
