import type { AppProps } from "next/app";
import { UnitsProvider } from "../context/UnitsContext";
import Header from "../components/Header";
import Background from "components/Background";
import "../styles/global.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UnitsProvider>
      <Background>
        <div className="min-h-screen flex flex-col max-w-6xl mx-auto">
          <Header />
          <main className="flex-1">
            <Component {...pageProps} />
          </main>
        </div>
      </Background>
    </UnitsProvider>
  );
}
