import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";
import SplashScreen from "@/components/SplashScreen";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FilmFlix - Tu plataforma de películas y series",
  description: "Descubre las mejores películas y series del momento con FilmFlix",
  icons: {
    icon: "/favicon-filmflix.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} antialiased`}
      >
        <SplashScreen>
          <Navbar />
          {children}
          <ScrollToTop />
        </SplashScreen>
      </body>
    </html>
  );
}
