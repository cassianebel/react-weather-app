import { IoInvertModeOutline } from "react-icons/io5";

export default function ThemeButton() {
  const toggle = () => {
    const currentTheme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button
      onClick={toggle}
      className="p-3 rounded-lg bg-indigo-200/50 backdrop-blur-xl hover:bg-indigo-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-50 transition-colors duration-300 cursor-pointer outline-indigo-500 dark:outline-white outline-offset-4"
    >
      <IoInvertModeOutline />
      <span className="sr-only">Toggle Theme</span>
    </button>
  );
}
