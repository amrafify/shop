import { createContext, useState } from "react";

export let UesrContext = createContext();
export function UesrContextProvid({ children }) {
  let [uesrToken, setUesrToken] = useState(null);
  return (
    <UesrContext.Provider value={{ uesrToken, setUesrToken }}>
      {children}
    </UesrContext.Provider>
  );
}
