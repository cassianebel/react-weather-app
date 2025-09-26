import { useState, useEffect } from "react";
import { MdFavorite } from "react-icons/md";
import { handleClickOutside } from "../helperFunctions";
import { useFavorites } from "context/FavoritesContext";
import { AnimatePresence, motion } from "framer-motion";
import ButtonWithTip from "./ButtonWithTip";

export default function FavoritesSelector() {
  const { favorites } = useFavorites();
  const [displayFavorites, setDisplayFavorites] = useState(false);

  // close the units selector if clicking outside of it
  useEffect(() => {
    if (displayFavorites) {
      document.addEventListener("mousedown", (event: MouseEvent) =>
        handleClickOutside(event, "favorites", setDisplayFavorites)
      );
    } else {
      document.removeEventListener("mousedown", (event: MouseEvent) =>
        handleClickOutside(event, "favorites", setDisplayFavorites)
      );
    }
    return () => {
      document.removeEventListener("mousedown", (event: MouseEvent) =>
        handleClickOutside(event, "favorites", setDisplayFavorites)
      );
    };
  }, [displayFavorites]);

  return (
    <div className="relative">
      <ButtonWithTip
        tip="Show Favorites"
        side="bottom"
        action={() => setDisplayFavorites(!displayFavorites)}
        icon={<MdFavorite />}
        ariaControls="favorites"
        ariaExpanded={displayFavorites}
      />
      <AnimatePresence>
        {displayFavorites && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            id="favorites"
            className="absolute left-0 min-w-64 border bg-indigo-200  border-indigo-300 dark:border-neutral-600 dark:text-neutral-50 dark:bg-neutral-800 mt-2 p-1 rounded-xl z-10 shadow-lg dark:shadow-neutral-900/40"
          >
            {favorites.length ? (
              favorites.map((fav) => (
                <button
                  key={fav.name}
                  className="block w-full text-left px-4 py-2 rounded-lg hover:bg-indigo-300 dark:hover:bg-neutral-700 transition-colors duration-300"
                  onClick={() => {
                    window.location.href = `/?lat=${fav.lat}&lon=${fav.lon}`;
                    setDisplayFavorites(false);
                  }}
                >
                  {fav.name}
                </button>
              ))
            ) : (
              <p className="p-4">You have no saved locations</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
