export const VERSION = "0.1.1";

const BASE =
  "https://media.githubusercontent.com/media/poktweb/Pokt-Craft-Instal-es/main";

export const DOWNLOADS = {
  windows: `${BASE}/Pokt-Craft-Launcher-0.1.1.exe`,
  appimage: `${BASE}/Pokt-Craft-Launcher-0.1.1-x86_64.AppImage`,
  deb: `${BASE}/Pokt-Craft-Launcher-0.1.1-amd64.deb`,
  rpm: `${BASE}/Pokt-Craft-Launcher-0.1.1-x86_64.rpm`,
  flatpak: `${BASE}/Pokt-Craft-Launcher-0.1.1-x86_64.flatpak`,
  tarball: `${BASE}/Pokt-Craft-Launcher-0.1.1-x64.tar.gz`
} as const;

export const DOWNLOAD_OPTIONS = [
  { href: DOWNLOADS.windows, title: "Windows", meta: ".exe portátil · ~134 MB" },
  { href: DOWNLOADS.appimage, title: "Linux AppImage", meta: "Universal · ~179 MB" },
  { href: DOWNLOADS.deb, title: "Debian / Ubuntu", meta: "Pacote .deb · ~134 MB" },
  { href: DOWNLOADS.rpm, title: "Fedora / RHEL", meta: "Pacote .rpm · ~179 MB" },
  { href: DOWNLOADS.flatpak, title: "Linux Flatpak", meta: "Pacote .flatpak · ~143 MB" },
  { href: DOWNLOADS.tarball, title: "Linux genérico", meta: "Arquivo .tar.gz · ~172 MB" }
] as const;
