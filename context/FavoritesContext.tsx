import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type FavoriteLocation = { name: string; lat: number; lon: number };

type FavoritesContextType = {
  favorites: FavoriteLocation[];
  toggleFavorite: (loc: FavoriteLocation) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error("useFavorites must be used within FavoritesProvider");
  return context;
};

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteLocation[]>([]);

  // load favorites from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("favorite-locations");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  const toggleFavorite = (loc: FavoriteLocation) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.name === loc.name);
      const updated = exists
        ? prev.filter((f) => f.name !== loc.name)
        : [...prev, loc];
      localStorage.setItem("favorite-locations", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
