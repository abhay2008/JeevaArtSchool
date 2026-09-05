import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { Cormorant_Garamond, Outfit } from "@next/font/google";
import { ArtModalProvider } from "../components/ArtModal";
import { SiteProvider } from "../context/SiteContext";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
});

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} enableColorScheme={false}>
      <SiteProvider>
        <ArtModalProvider>
        <div className={`${outfit.variable} ${display.variable} font-sans`}>
          <Component {...pageProps} />
        </div>
        </ArtModalProvider>
      </SiteProvider>
    </ThemeProvider>
  );
}
