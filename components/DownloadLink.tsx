"use client";

import { useDownloadStats } from "./download-stats";

type Props = {
  href: string;
  className?: string;
  children: React.ReactNode;
  id?: string;
};

export function DownloadLink({ href, className, children, id }: Props) {
  const { trackDownload } = useDownloadStats();

  return (
    <a id={id} className={className} href={href} onClick={() => trackDownload()}>
      {children}
    </a>
  );
}
