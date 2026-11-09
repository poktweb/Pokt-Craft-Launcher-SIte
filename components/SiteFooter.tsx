import Link from "next/link";
import { DownloadCount } from "./DownloadCount";

export function SiteFooter() {
  return (
    <footer className="foot">
      <div>
        © 2026 Pokt Craft · <Link href="/#download">Downloads</Link> ·{" "}
        <span className="foot-counter">
          <DownloadCount /> downloads
        </span>{" "}
        · <Link href="/privacidade">Privacidade</Link> · <Link href="/termos">Termos</Link>
      </div>
      <div>Windows · Linux</div>
    </footer>
  );
}
