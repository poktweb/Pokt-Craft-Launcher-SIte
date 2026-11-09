import type { Metadata } from "next";
import { DownloadStatsProvider } from "@/components/download-stats";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://poktcraft.shop"),
  title: "Pokt Craft Launcher",
  description:
    "Pokt Craft Launcher — Minecraft Java Edition com instâncias, mods CurseForge/Modrinth, skins 3D e Pokt Cloud no teu Google Drive.",
  icons: { icon: "/favicon.png" },
  openGraph: {
    title: "Pokt Craft Launcher",
    description:
      "Launcher de Minecraft Java com instâncias, mods, skins e sincronização de mundos no Google Drive.",
    images: ["/assets/capa.jpg"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700&family=Sora:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <DownloadStatsProvider>{children}</DownloadStatsProvider>
      </body>
    </html>
  );
}
