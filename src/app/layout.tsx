import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ferias de Montevideo - Mercados Callejeros y Ferias de Uruguay",
  description: "Descubre los mercados callejeros y ferias de Montevideo, Uruguay. Información completa sobre ubicaciones, horarios y productos locales. Encuentra las mejores ferias por barrio y día de la semana.",
  keywords: "ferias montevideo, mercados callejeros uruguay, ferias barrio, mercados montevideo, productos locales, ferias por día",
  authors: [{ name: "Ferias de Montevideo" }],
  creator: "Ferias de Montevideo",
  publisher: "Ferias de Montevideo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://feriasdemontevideo.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Ferias de Montevideo - Mercados Callejeros y Ferias de Uruguay",
    description: "Descubre los mercados callejeros y ferias de Montevideo, Uruguay. Información completa sobre ubicaciones, horarios y productos locales.",
    url: 'https://feriasdemontevideo.com',
    siteName: 'Ferias de Montevideo',
    locale: 'es_UY',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ferias de Montevideo - Mercados Callejeros',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Ferias de Montevideo - Mercados Callejeros y Ferias de Uruguay",
    description: "Descubre los mercados callejeros y ferias de Montevideo, Uruguay. Información completa sobre ubicaciones, horarios y productos locales.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Ferias de Montevideo" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
