import React, { useEffect, useState, type ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const [bgUrl, setBgUrl] = useState("");

  useEffect(() => {
    fetch("/api/unsplash")
      .then((res) => res.json())
      .then((data) => setBgUrl(data.url))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const prefersDark =
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  return (
    <div
      className={`text-indigo-900 dark:text-neutral-50 transition-colors duration-300 bg-cover bg-center bg-fixed ${
        !bgUrl ? "bg-indigo-100 dark:bg-neutral-900" : ""
      }`}
      style={{ backgroundImage: bgUrl ? `url(${bgUrl})` : undefined }}
    >
      {children}
    </div>
  );
}
