import { DownloadCount } from "@/components/DownloadCount";
import { DownloadLink } from "@/components/DownloadLink";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { DOWNLOAD_OPTIONS, DOWNLOADS, VERSION } from "@/lib/downloads";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <SiteHeader current="home" />
      <main>
        <section className="hero" aria-label="Apresentação">
          <div className="hero-media" aria-hidden="true">
            <picture>
              <source srcSet="/assets/capa.webp" type="image/webp" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/capa.jpg" alt="" className="hero-img" />
            </picture>
            <div className="hero-shade" />
          </div>
          <div className="hero-copy">
            <p className="brand-mark">Pokt Craft Launcher</p>
            <h1>Minecraft Java, do teu jeito.</h1>
            <p className="lede">
              Instâncias isoladas, mods, skins 3D e mundos sincronizados no Google Drive — num launcher feito para o
              PC.
            </p>
            <div className="cta-row">
              <DownloadLink className="cta cta-solid" href={DOWNLOADS.windows}>
                Baixar para Windows
              </DownloadLink>
              <a className="cta cta-ghost" href="#download">
                Ver todas as plataformas
              </a>
            </div>
            <div className="hero-meta">
              <span className="live-dot" aria-hidden="true" />
              <span>
                <DownloadCount /> downloads
              </span>
              <span className="sep">·</span>
              <span>Versão {VERSION} · Windows e Linux</span>
            </div>
          </div>
        </section>

        <section className="strip" aria-label="Destaques">
          <div className="strip-item">
            <strong>Java</strong>
            <span>Vanilla, snapshots e packs</span>
          </div>
          <div className="strip-item">
            <strong>Loaders</strong>
            <span>Fabric, Forge e NeoForge</span>
          </div>
          <div className="strip-item">
            <strong>Loja</strong>
            <span>CurseForge e Modrinth</span>
          </div>
          <div className="strip-item">
            <strong>Cloud</strong>
            <span>Drive da tua conta</span>
          </div>
        </section>

        <section className="features" id="recursos">
          <Reveal className="feature feature-left">
            <div className="feature-text">
              <p className="eyebrow">Instalações</p>
              <h2>Cada pack na sua instância.</h2>
              <p>
                Cria, importa e explora modpacks sem misturar bibliotecas. Joga com um clique — Fabric, Forge ou
                NeoForge, cada um no seu perfil.
              </p>
            </div>
            <figure className="shot">
              <picture>
                <source srcSet="/assets/instancias.webp" type="image/webp" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/instancias.jpg"
                  alt="Grelha de instalações e modpacks no Pokt Craft Launcher"
                  width={886}
                  height={592}
                  loading="lazy"
                />
              </picture>
            </figure>
          </Reveal>

          <Reveal className="feature feature-right">
            <div className="feature-text">
              <p className="eyebrow">Skins</p>
              <h2>Pré-visualização 3D e galeria.</h2>
              <p>
                Roda a skin em 3D, escolhe Steve, Alex, a loja ou a tua própria. Conta Microsoft para online, ou nick
                offline quando quiseres.
              </p>
            </div>
            <figure className="shot">
              <picture>
                <source srcSet="/assets/skins.webp" type="image/webp" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/skins.jpg"
                  alt="Painel de skins com visualização 3D e galeria"
                  width={1920}
                  height={1036}
                  loading="lazy"
                />
              </picture>
            </figure>
          </Reveal>

          <Reveal className="feature feature-left">
            <div className="feature-text">
              <p className="eyebrow">Loja de mods</p>
              <h2>CurseForge e Modrinth no app.</h2>
              <p>
                Pesquisa, filtra por versão e loader, e instala modpacks direto no launcher. Sem saltar entre sites
                para montar o teu setup.
              </p>
            </div>
            <figure className="shot">
              <picture>
                <source srcSet="/assets/loja.webp" type="image/webp" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/loja.jpg"
                  alt="Catálogo CurseForge de modpacks no launcher"
                  width={1920}
                  height={1041}
                  loading="lazy"
                />
              </picture>
            </figure>
          </Reveal>
        </section>

        <section className="download-panel" id="download">
          <div className="download-intro">
            <p className="eyebrow">Download gratuito</p>
            <h2>Escolhe a tua plataforma.</h2>
            <p>
              Pacotes oficiais da versão <strong>{VERSION}</strong>. No Windows podes usar o .exe portátil; no Linux
              há AppImage, Deb, RPM, Flatpak e tarball.
            </p>
            <div className="download-counter-pill">
              <span className="live-dot" aria-hidden="true" />
              <span>
                <DownloadCount /> downloads já realizados
              </span>
            </div>
          </div>
          <div className="download-grid">
            {DOWNLOAD_OPTIONS.map((opt, index) => (
              <DownloadLink
                key={opt.href}
                className="download-option"
                href={opt.href}
                id={index === 1 ? "download-linux" : undefined}
              >
                <strong>{opt.title}</strong>
                <span>{opt.meta}</span>
              </DownloadLink>
            ))}
          </div>
        </section>

        <section className="cloud" id="cloud">
          <div className="cloud-copy">
            <p className="eyebrow">Pokt Cloud</p>
            <h2>Mundos no teu Google Drive.</h2>
            <p>
              A pasta <code>saves/</code> sincroniza para <code>PoktCraft/</code> no Drive da conta que autorizares.
              Pedimos só o âmbito <code>drive.file</code> — ficheiros criados pela app — e o e-mail da conta ligada.
            </p>
          </div>
          <ol className="flow">
            <li>
              <span className="step">01</span>
              <strong>Ligar</strong>
              <span>Google abre no browser a partir do launcher.</span>
            </li>
            <li>
              <span className="step">02</span>
              <strong>Pasta</strong>
              <span>Cria-se PoktCraft com saves, metadata e backups.</span>
            </li>
            <li>
              <span className="step">03</span>
              <strong>Sync</strong>
              <span>Incremental ao sair do jogo ou a pedido.</span>
            </li>
            <li>
              <span className="step">04</span>
              <strong>Sair</strong>
              <span>Desligar apaga a sessão neste PC, não os mundos.</span>
            </li>
          </ol>
        </section>

        <aside className="notice" id="google-apis">
          <p>
            <strong>Google API Services User Data Policy / Limited Use.</strong> A Pokt Craft{" "}
            <strong>não recolhe nem usa dados pessoais dos clientes em servidores nossos</strong>. O Pokt Cloud, se
            ativado, fala com as APIs Google só no seu PC e sincroniza mundos para o <em>seu</em> Drive — aderindo à{" "}
            <a href="https://developers.google.com/terms/api-services-user-data-policy">
              Google API Services User Data Policy
            </a>
            , incluindo Limited Use (sem venda, publicidade ou treino de IA).{" "}
            <Link href="/privacidade">Política de Privacidade</Link>.
          </p>
        </aside>

        <p className="fine">
          Minecraft é marca da Mojang AB / Microsoft. Google Drive é marca da Google LLC. Pokt Craft Launcher não é
          afiliado a Mojang, Microsoft ou Google.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
