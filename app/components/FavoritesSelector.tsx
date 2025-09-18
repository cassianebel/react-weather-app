import { useState, useEffect } from "react";
import { MdFavorite } from "react-icons/md";
import { handleClickOutside } from "~/helperFunctions";

export default function FavoritesSelector() {
  const [displayFavorites, setDisplayFavorites] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  // get favorites from localStorage on initial load
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorite-locations");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

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
      <button
        aria-controls="favorites"
        aria-expanded={displayFavorites}
        onClick={() => setDisplayFavorites(!displayFavorites)}
        className="p-3 rounded-lg bg-indigo-200 hover:bg-indigo-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-indigo-800 dark:text-neutral-50 transition-colors duration-300 cursor-pointer outline-indigo-500 dark:outline-white outline-offset-4"
      >
        <MdFavorite />
        <span className="sr-only">Favorites</span>
      </button>
      {displayFavorites && (
        <div
          id="favorites"
          className="absolute right-0 min-w-72 border bg-indigo-200 text-indigo-800 border-indigo-300 dark:border-neutral-600 dark:text-neutral-50 dark:bg-neutral-800 mt-2 rounded-xl z-10 shadow-lg dark:shadow-neutral-900/40"
        >
          {favorites.length ? (
            favorites.map((fav) => (
              <button
                key={fav}
                className="block w-full text-left px-4 py-2 hover:bg-indigo-300 dark:hover:bg-neutral-700 transition-colors duration-300"
                onClick={() => {
                  window.location.href = `/?place=${encodeURIComponent(fav)}`;
                  setDisplayFavorites(false);
                }}
              >
                {fav}
              </button>
            ))
          ) : (
            <p className="p-4">You have no saved locations</p>
          )}
        </div>
      )}
    </div>
  );
}
