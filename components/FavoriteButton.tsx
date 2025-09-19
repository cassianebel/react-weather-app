import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

export default function FavoriteButton({
  isFavorite,
  toggleFavorite,
}: {
  isFavorite: boolean;
  toggleFavorite: () => void;
}) {
  return (
    <button
      onClick={toggleFavorite}
      className="absolute top-0 left-[-2.2rem] p-1 rounded-lg transition-colors duration-300 cursor-pointer outline-indigo-500 dark:outline-white outline-offset-4"
    >
      {isFavorite ? <MdFavorite /> : <MdFavoriteBorder />}
      <span className="sr-only">
        {isFavorite ? "Remove from favorites" : "Add to favorites"}
      </span>
    </button>
  );
}
