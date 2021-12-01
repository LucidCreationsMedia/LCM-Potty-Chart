import * as React from "react";
import { useState } from "react";
// TODO: import types

const CalenderContext = React.createContext<any | null>(null);

function CalenderContextProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement | null {
  const [today] = useState<Date>(new Date());

  const dateProviderValues = {
    today,
  };

  return (
    <CalenderContext.Provider value={dateProviderValues}>
      {children}
    </CalenderContext.Provider>
  );
}

export { CalenderContextProvider, CalenderContext };
