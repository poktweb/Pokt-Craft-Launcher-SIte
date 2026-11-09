"use client";

import { useDownloadStats } from "./download-stats";

export function DownloadCount() {
  const { formatted } = useDownloadStats();
  return <strong className="download-counter-value">{formatted}</strong>;
}
