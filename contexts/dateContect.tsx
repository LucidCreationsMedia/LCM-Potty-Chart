import * as React from "react";
import { useState } from "react";
// TODO: import types

const DateContext = React.createContext<any | null>(null);

function DateContextProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement | null {
  const [currentDate] = useState<Date>(new Date());

  const dateProviderValues = {
    currentDate,
  };

  return (
    <DateContext.Provider value={dateProviderValues}>
      {children}
    </DateContext.Provider>
  );
}

export { DateContextProvider, DateContext };
