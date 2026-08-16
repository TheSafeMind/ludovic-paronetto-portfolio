import type { Metadata } from "next";
import { headers } from "next/headers";
import "@fontsource-variable/inter";
import "./globals.css";

export function generateMetadata(): Metadata {
  const requestHeaders = headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    metadataBase: new URL(origin),
    title: "Ludovic Paronetto — Structuur waar chaos is",
    description: "Author, entrepreneur and business transformation lead. Ludovic Paronetto brings structure where there is chaos.",
    openGraph: {
      title: "Ludovic Paronetto",
      description: "Zien wat anderen niet zien. Bouwen wat blijft.",
      images: [new URL("/og-sonar-midnight-v2.png", origin)],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Ludovic Paronetto",
      description: "Zien wat anderen niet zien. Bouwen wat blijft.",
      images: [new URL("/og-sonar-midnight-v2.png", origin)],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
