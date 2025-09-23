import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useFavorites } from "../context/FavoritesContext";
import { Tooltip } from "radix-ui";
import { motion } from "framer-motion";

export default function FavoriteButton({
  place,
}: {
  place: { name: string; lat: number; lon: number };
}) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some((f) => f.name === place.name);
  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={200}>
        <Tooltip.Trigger asChild>
          <button
            onClick={() =>
              toggleFavorite({
                name: place.name,
                lat: place.lat,
                lon: place.lon,
              })
            }
            className="absolute top-0 left-[-2.2rem] p-1 rounded-lg transition-colors duration-300 cursor-pointer outline-indigo-500 dark:outline-white outline-offset-4"
          >
            {isFavorite ? <MdFavorite /> : <MdFavoriteBorder />}
            <span className="sr-only">
              {isFavorite ? "Remove from favorites" : "Add to favorites"}
            </span>
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content side="top" sideOffset={6} forceMount asChild>
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2 }}
              className="bg-indigo-300 text-indigo-900 dark:text-neutral-50 dark:bg-neutral-700 text-xs px-3 py-2 rounded-lg"
            >
              {isFavorite ? "Remove from favorites" : "Add to favorites"}
              <Tooltip.Arrow className="fill-indigo-300 dark:fill-neutral-700" />
            </motion.div>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
