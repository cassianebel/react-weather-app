import { IoInvertModeOutline } from "react-icons/io5";
import ButtonWithTip from "./ButtonWithTip";

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
    <ButtonWithTip
      tip="Toggle Theme"
      side="bottom"
      action={toggle}
      icon={<IoInvertModeOutline />}
    />
  );
}
