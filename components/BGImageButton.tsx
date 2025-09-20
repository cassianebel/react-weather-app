import { useBackground } from "../context/BackgroundContext";
import { CiImageOn, CiImageOff } from "react-icons/ci";

export default function BGImageButton() {
  const { toggleImage, showImage } = useBackground();

  return (
    <button
      onClick={toggleImage}
      className="p-3 rounded-lg bg-indigo-200/50 backdrop-blur-xl hover:bg-indigo-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-50 transition-colors duration-300 cursor-pointer outline-indigo-500 dark:outline-white outline-offset-4"
    >
      {showImage ? <CiImageOff /> : <CiImageOn />}
      <span className="sr-only">Toggle Background Image</span>
    </button>
  );
}
