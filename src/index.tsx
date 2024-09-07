import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface Translations {
  [key: string]: { [key: string]: string };
}

interface ZmanProviderProps {
  translations: Translations;
  children: ReactNode;
  defaultZman?: string;
}

interface ZmanContextProps {
  texts: { [key: string]: string };
  setZman: (zman: string) => void;
}

const ZmanContext = createContext<ZmanContextProps | undefined>(undefined);

const getInitialZman = (defaultZman: string) => {
  const savedZman = localStorage.getItem("zman");
  return savedZman || defaultZman || "en";
};

export const ZmanProvider = ({
  translations,
  children,
  defaultZman = "en",
}: ZmanProviderProps) => {
  const [zman, setCurrentZman] = useState(getInitialZman(defaultZman));
  const [texts, setTexts] = useState(translations[zman] || translations["en"]);

  useEffect(() => {
    const savedZman = localStorage.getItem("zman");
    if (savedZman && translations[savedZman]) {
      setCurrentZman(savedZman);
      setTexts(translations[savedZman]);
    }
  }, [translations]);

  const setZman = (zman: string) => {
    if (translations[zman]) {
      setCurrentZman(zman);
      setTexts(translations[zman]);
      localStorage.setItem("zman", zman);
    } else {
      setCurrentZman("en");
      setTexts(translations["en"]);
    }
  };

  return (
    <ZmanContext.Provider value={{ texts, setZman }}>
      {children}
    </ZmanContext.Provider>
  );
};

export const useZman = () => {
  const context = useContext(ZmanContext);
  if (!context) {
    throw new Error("useZman must be used within a ZmanProvider");
  }
  return context;
};
