import React, { useEffect, useState, type ReactNode } from "react";
import { useBackground } from "../context/BackgroundContext";
import useOrientation from "../hooks/useOrientation";

export default function Layout({ children }: { children: ReactNode }) {
  const { showImage, setError } = useBackground();
  const [bgUrl, setBgUrl] = useState("");
  const [credits, setCredits] = useState({ name: "", profileLink: "", alt: ""})
  const orientation = useOrientation();

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    fetch(`/api/unsplash?orientation=${orientation}&theme=${theme}`)
    // fetch(`/api/fail`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBgUrl(data.data.urls.full);
        setError("");
        setCredits({ name: data.data.user.name, profileLink: data.data.user.links.html, alt: data.data.alt_description });
      })
      .catch((err) => {
        setBgUrl("")
        setError("Background Image failed to load. Please try again later.")
        console.error(err)
  });
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
      className={`text-indigo-950 dark:text-neutral-50 transition-colors duration-300 bg-cover bg-center bg-fixed h-screen  overflow-scroll sticky bottom-0 ${
        !showImage || !bgUrl ? "bg-indigo-100 dark:bg-neutral-900" : ""
      }`}
      style={{ backgroundImage: showImage ? `url(${bgUrl})` : undefined }}
    >
      {children}
      {showImage || !bgUrl && (
          <footer>
            <p className="sr-only">Background image: {credits.alt}</p>
            <p className="text-xs text-center py-8 ">
              Photo by{" "}
              <a href={`${credits.profileLink}?utm_source=cassia_react_weather_app&utm_medium=referral`} className="underline">
                {credits.name}
              </a>{" "}
              on{" "}
              <a href="https://unsplash.com/?utm_source=cassia_react_weather_app&utm_medium=referral" className="underline">
                Unsplash
              </a>
            </p>
          </footer>
        )}
    </div>
  );
}
