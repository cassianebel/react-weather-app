import React, { useEffect, useState, type ReactNode } from "react";
import { useBackground } from "../context/BackgroundContext";
import useOrientation from "../hooks/useOrientation";

export default function Layout({ children }: { children: ReactNode }) {
  const { showImage } = useBackground();
  const [bgUrl, setBgUrl] = useState("");
  const [credits, setCredits] = useState({ name: "", profileLink: ""})
  const orientation = useOrientation();

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    fetch(`/api/unsplash?orientation=${orientation}&theme=${theme}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBgUrl(data.data.urls.full);
        setCredits({ name: data.data.user.name, profileLink: data.data.user.links.html });
      })
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
      className={`text-indigo-950 dark:text-neutral-50 transition-colors duration-300 bg-cover bg-center bg-fixed min-h-[300vh] overflow-scroll sticky bottom-0 ${
        !showImage ? "bg-indigo-100 dark:bg-neutral-900" : ""
      }`}
      style={{ backgroundImage: showImage ? `url(${bgUrl})` : undefined }}
    >
      {children}
      {showImage && (
          <footer>
            <p className="text-xs text-center py-8 ">
              Photo by{" "}
              <a href={`${credits.profileLink}?utm_source=cassia_weather_app&utm_medium=referral`} className="underline">
                {credits.name}
              </a>{" "}
              on{" "}
              <a href="https://unsplash.com/?utm_source=cassia_weather_app&utm_medium=referral" className="underline">
                Unsplash
              </a>
            </p>
          </footer>
        )}
    </div>
  );
}
