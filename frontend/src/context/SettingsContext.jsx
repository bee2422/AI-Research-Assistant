import { createContext, useContext, useState } from "react";

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [favoritesFirst, setFavoritesFirst] = useState(true);
  const [autoSaveNotes, setAutoSaveNotes] = useState(true);

  return (
    <SettingsContext.Provider
      value={{
        favoritesFirst,
        setFavoritesFirst,
        autoSaveNotes,
        setAutoSaveNotes,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}