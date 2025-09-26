import type { AppProps } from "next/app";
import { UnitsProvider } from "../context/UnitsContext";
import { BackgroundProvider } from "../context/BackgroundContext";
import { FavoritesProvider } from "context/FavoritesContext";
import Head from "next/head";
import Header from "../components/Header";
import Background from "components/Background";
import "../styles/global.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UnitsProvider>
      <BackgroundProvider>
        <FavoritesProvider>
          <Head>
            <title>Weather Now</title>
          </Head>
          <Background>
            <div className="min-h-screen flex flex-col max-w-6xl mx-auto">
              <Header />
              <main className="flex-1">
                <Component {...pageProps} />
              </main>
            </div>
          </Background>
        </FavoritesProvider>
      </BackgroundProvider>
    </UnitsProvider>
  );
}
