import "./globals.css";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import ThemeProvider from "@/providers/ThemeProvider";
import ReduxProvider from "@/redux/provider";
import ConditionalNavbar from "@/components/ConditionalNavbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata = {
  title: "Bhagwati Tour & Travels — Jaipur Taxi & Sightseeing",
  description:
    "Reliable taxi service in Jaipur. Local sightseeing, outstation trips, and airport pickup.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jakarta.variable}`}
    >
      <body className="font-[family-name:var(--font-inter)] bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 antialiased">
        <ReduxProvider>
          <ThemeProvider>
            <ConditionalNavbar />
            {children}
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}