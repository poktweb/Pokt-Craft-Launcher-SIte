"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";

type Stats = {
  count: number | null;
  formatted: string;
  trackDownload: () => void;
};

const DownloadStatsContext = createContext<Stats | null>(null);

function formatCount(num: number) {
  return new Intl.NumberFormat("pt-BR").format(num);
}

export function DownloadStatsProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/downloads");
        if (res.ok) {
          const data = (await res.json()) as { downloads?: number };
          if (!cancelled && typeof data.downloads === "number") {
            setCount(data.downloads);
            return;
          }
        }
      } catch {
        // fallback below
      }

      try {
        const res = await fetch("/downloads.json");
        if (res.ok) {
          const data = (await res.json()) as { downloads?: number };
          if (!cancelled && typeof data.downloads === "number") {
            setCount(data.downloads);
            return;
          }
        }
      } catch {
        if (!cancelled) setCount(0);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const trackDownload = useCallback(() => {
    setCount((prev) => (prev === null ? 1 : prev + 1));
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/downloads");
      } else {
        void fetch("/api/downloads", { method: "POST", keepalive: true });
      }
    } catch {
      // ignore
    }
  }, []);

  const value = useMemo<Stats>(
    () => ({
      count,
      formatted: count === null ? "…" : formatCount(count),
      trackDownload
    }),
    [count, trackDownload]
  );

  return (
    <DownloadStatsContext.Provider value={value}>{children}</DownloadStatsContext.Provider>
  );
}

export function useDownloadStats() {
  const ctx = useContext(DownloadStatsContext);
  if (!ctx) {
    throw new Error("useDownloadStats must be used within DownloadStatsProvider");
  }
  return ctx;
}
