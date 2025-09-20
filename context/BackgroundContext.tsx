import { createContext, useContext, useState, type ReactNode } from "react";

type BackgroundContextType = {
  showImage: boolean;
  toggleImage: () => void;
};

const BackgroundContext = createContext<BackgroundContextType | undefined>(
  undefined
);

export function useBackground() {
  const context = useContext(BackgroundContext);
  if (!context)
    throw new Error("useBackground must be used within a BackgroundProvider");
  return context;
}

export function BackgroundProvider({ children }: { children: ReactNode }) {
  const [showImage, setShowImage] = useState(true);

  const toggleImage = () => setShowImage((prev) => !prev);

  return (
    <BackgroundContext.Provider value={{ showImage, toggleImage }}>
      {children}
    </BackgroundContext.Provider>
  );
}
