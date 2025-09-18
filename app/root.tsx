import React, { useEffect, useState } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

import Header from "./components/Header";
import { UnitsProvider } from "./context/UnitsContext";

export function Layout({ children }: { children: React.ReactNode }) {
  const [bgUrl, setBgUrl] = useState("");

  useEffect(() => {
    async function fetchBackground() {
      try {
        const res = await fetch("/api/unsplash");
        const data = await res.json();
        setBgUrl(data.urls.full);
      } catch (error) {
        console.error("Error fetching Unsplash image:", error);
      }
    }

    fetchBackground();
  }, []);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script>
          document.documentElement.classList.toggle( "dark", localStorage.theme
          === "dark" || (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches), );
        </script>
      </head>
      <body
        className={`${bgUrl ? `bg-[url(${bgUrl})]` : "bg-indigo-100 dark:bg-neutral-900"} text-indigo-900 dark:text-neutral-50 transition-colors duration-300 bg-cover bg-center`}
      >
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <UnitsProvider>
      <div className="min-h-screen flex flex-col max-w-6xl mx-auto">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </UnitsProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
