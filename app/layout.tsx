import type { Metadata } from "next";
import { Cinzel_Decorative, Cinzel, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd, getWebsiteJsonLd, getOrganizationJsonLd } from "@/components/JsonLd";

const displayFont = Cinzel_Decorative({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const serifFont = Cinzel({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const sansFont = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://witchr.com"),
  title: {
    default: "Witchr — Witchcraft for Modern Problems",
    template: "%s | Witchr",
  },
  description:
    "Witchcraft for modern problems. Bad breakup. Shitty job. No direction. Weird energy. Practical rituals, tarot spreads, and sigils for real life.",
  keywords: [
    "modern witchcraft",
    "practical rituals",
    "tarot spreads",
    "sigils",
    "boundary rituals",
    "letting go rituals",
    "financial focus ritual",
    "dark celestial grimoire",
  ],
  authors: [{ name: "Witchr" }],
  creator: "Witchr",
  publisher: "Witchr",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://witchr.com",
    siteName: "Witchr",
    title: "Witchr — Witchcraft for Modern Problems",
    description:
      "Bad breakup. Shitty job. No direction. Weird energy. Start with what’s bothering you.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Witchr — Witchcraft for Modern Problems",
    description:
      "Bad breakup. Shitty job. No direction. Weird energy. Practical rituals for real life.",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${serifFont.variable} ${sansFont.variable}`}
    >
      <head>
        <JsonLd data={getWebsiteJsonLd()} />
        <JsonLd data={getOrganizationJsonLd()} />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-background text-bone antialiased selection:bg-plum selection:text-lavender-light">
        <Header />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
