import type React from "react"
import type { Metadata } from "next"

import "./globals.css"

import { Outfit, Space_Grotesk } from 'next/font/google'

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://tradefinancelac.tomasdata.io"),
  title: "Trade Finance LAC | Investigación y Análisis de Financiamiento Comercial",
  description:
    "Plataforma académica de investigación sobre instrumentos de financiamiento del comercio en América Latina. Análisis comparativo de políticas, brechas y oportunidades por país.",
  keywords: [
    "trade finance",
    "América Latina",
    "financiamiento comercial",
    "exportaciones",
    "PYMEs",
    "comercio internacional",
    "ProChile",
    "Bancóldex",
    "BNDES",
    "Bancomext",
  ],
  authors: [{ name: "TomasData.io", url: "https://tomasdata.io" }],
  creator: "TomasData.io",
  publisher: "TomasData.io",
  openGraph: {
    type: "website",
    locale: "es_LA",
    url: "https://tradefinancelac.tomasdata.io",
    title: "Trade Finance LAC | Investigación sobre Financiamiento Comercial",
    description:
      "Análisis comparativo de instrumentos de financiamiento del comercio en América Latina: Chile, Perú, Colombia, Brasil y México.",
    siteName: "Trade Finance LAC",
    images: [
      {
        url: "https://tradefinancelac.tomasdata.io/og-image.jpg",
        width: 1024,
        height: 1024,
        alt: "Trade Finance América Latina - Investigación y Análisis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trade Finance LAC | Investigación sobre Financiamiento Comercial",
    description: "Análisis comparativo de instrumentos de financiamiento del comercio en América Latina.",
    creator: "@tomasdata",
    images: ["https://tradefinancelac.tomasdata.io/og-image.jpg"],
  },
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className={`${outfit.variable} ${spaceGrotesk.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
