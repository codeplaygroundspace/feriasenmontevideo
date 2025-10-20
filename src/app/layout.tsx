import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import OrganizationStructuredData from "@/components/OrganizationStructuredData";
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
  title: {
    default: "Ferias en Montevideo - Mercados Callejeros y Ferias de Uruguay",
    template: "%s | Ferias en Montevideo"
  },
  description: "Descubre los mercados callejeros y ferias de Montevideo, Uruguay. Información completa sobre ubicaciones, horarios y productos locales. Encuentra las mejores ferias por barrio y día de la semana.",
  keywords: [
    "ferias montevideo",
    "mercados callejeros uruguay",
    "ferias barrio montevideo",
    "mercados montevideo",
    "productos locales uruguay",
    "ferias por día",
    "mercados callejeros",
    "ferias vecinales montevideo",
    "feria del barrio",
    "mercado de productores"
  ],
  authors: [{ name: "Ferias en Montevideo", url: "https://feriasenmontevideo.vercel.app" }],
  creator: "Ferias en Montevideo",
  publisher: "Ferias en Montevideo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://feriasenmontevideo.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Ferias en Montevideo - Mercados Callejeros y Ferias de Uruguay",
    description: "Descubre los mercados callejeros y ferias de Montevideo, Uruguay. Información completa sobre ubicaciones, horarios y productos locales.",
    url: 'https://feriasenmontevideo.vercel.app',
    siteName: 'Ferias en Montevideo',
    locale: 'es_UY',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ferias en Montevideo - Mercados Callejeros',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Ferias en Montevideo - Mercados Callejeros y Ferias de Uruguay",
    description: "Descubre los mercados callejeros y ferias de Montevideo, Uruguay. Información completa sobre ubicaciones, horarios y productos locales.",
    images: ['/og-image.jpg'],
    creator: "@feriasdemvd"
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
  category: 'Local Business',
  classification: 'Local Markets and Street Fairs Directory',
  // Note: Add your Google Search Console verification code here
  // verification: {
  //   google: 'your-google-verification-code',
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-UY">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.svg" />
        <meta name="theme-color" content="#10B981" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Ferias MVD" />
        <meta name="application-name" content="Ferias en Montevideo" />
        <meta name="msapplication-TileColor" content="#10B981" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <OrganizationStructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
