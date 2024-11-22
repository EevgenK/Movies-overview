import { createContext, useState } from "react";

export const languageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState({ en: "en-Us" });
  const contextValue = { language, setLanguage };
  return (
    <languageContext.Provider value={contextValue}>
      {children}
    </languageContext.Provider>
  );
};
