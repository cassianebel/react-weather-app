import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useFavorites } from "../context/FavoritesContext";

export default function FavoriteButton({
  place,
}: {
  place: { name: string; lat: number; lon: number };
}) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some((f) => f.name === place.name);
  return (
    <button
      onClick={() =>
        toggleFavorite({ name: place.name, lat: place.lat, lon: place.lon })
      }
      className="absolute top-0 left-[-2.2rem] p-1 rounded-lg transition-colors duration-300 cursor-pointer outline-indigo-500 dark:outline-white outline-offset-4"
    >
      {isFavorite ? <MdFavorite /> : <MdFavoriteBorder />}
      <span className="sr-only">
        {isFavorite ? "Remove from favorites" : "Add to favorites"}
      </span>
    </button>
  );
}
