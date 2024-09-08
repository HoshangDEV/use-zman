import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
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

  const texts = useMemo(() => {
    return translations[zman] || translations["en"];
  }, [zman, translations]);

  useEffect(() => {
    const savedZman = localStorage.getItem("zman");
    if (savedZman && translations[savedZman]) {
      setCurrentZman(savedZman);
    }
  }, [translations]);

  const setZman = (zman: string) => {
    if (translations[zman]) {
      setCurrentZman(zman);
      localStorage.setItem("zman", zman);
    } else {
      setCurrentZman("en");
      console.warn(`Unsupported language '${zman}', falling back to 'en'.`);
    }
  };

  const contextValue = useMemo(() => ({ texts, setZman }), [texts, setZman]);

  return (
    <ZmanContext.Provider value={contextValue}>{children}</ZmanContext.Provider>
  );
};

export const useZman = () => {
  const context = useContext(ZmanContext);
  if (!context) {
    throw new Error("useZman must be used within a ZmanProvider");
  }
  return context;
};
