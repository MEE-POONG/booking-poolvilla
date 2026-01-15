import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Playfair_Display, Outfit } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <LanguageProvider>
        <div className={`${playfair.variable} ${outfit.variable} font-sans antialiased`}>
          <Component {...pageProps} />
        </div>
      </LanguageProvider>
    </AuthProvider>
  );
}
