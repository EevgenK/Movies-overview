import { createContext, useEffect, useState } from "react";

export const languageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    JSON.parse(localStorage.getItem("language")) ?? { en: "en-Us" }
  );
  useEffect(() => {
    localStorage.setItem("language", JSON.stringify(language));
  }, [language]);

  const contextValue = { language, setLanguage };
  return (
    <languageContext.Provider value={contextValue}>
      {children}
    </languageContext.Provider>
  );
};
