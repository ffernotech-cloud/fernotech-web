import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fernotech.cf'),
  title: "FERNOTECH — L'innovation technologique au service du futur en Centrafrique",
  description: "Leader en robotique, électronique, et systèmes intelligents à Bangui. Découvrez nos solutions technologiques à impact social et environnemental.",
  keywords: ["robotique", "électronique", "systèmes embarqués", "IA", "développement logiciel", "Bangui", "innovation", "Centrafrique", "FERNOTECH", "recyclage plastique"],
  authors: [{ name: "FERNOTECH Team" }],
  openGraph: {
    title: "FERNOTECH — Innovation Technologique en RCA",
    description: "Nous bâtissons les solutions robotiques et électroniques de demain pour l'Afrique.",
    url: "https://fernotech.cf",
    siteName: "FERNOTECH",
    images: [
      {
        url: "/og-image.jpg", // Make sure this exists in public or use a placeholder
        width: 1200,
        height: 630,
        alt: "FERNOTECH Innovation",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FERNOTECH — Innovation Technologique",
    description: "Innover, Créer et Transformer en Centrafrique.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground selection:bg-brand-yellow selection:text-black flex flex-col">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
