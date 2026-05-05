import { AUTHOR, LINKS, SITES } from "@/lib/constants";

export function SiteFooter({ githubRepo }: { githubRepo?: string }) {
  const repoUrl = githubRepo ?? LINKS.siteRepo;
  return (
    <footer className="border-t border-kf-border/50 mt-24 py-10 text-sm">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row md:items-start justify-between gap-8">
        <div className="md:max-w-md">
          <div className="text-kf-text font-medium">
            Built by{" "}
            <a
              href={SITES.barisgunaydin.url}
              className="text-kf-accent hover:underline"
            >
              {AUTHOR.name}
            </a>
          </div>
          <div className="text-kf-muted mt-1 leading-relaxed">
            Independent researcher · browser-native GPU computing.
            Two preprints, one open-source SDK, public benchmark database.
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <a
            href={repoUrl}
            className="inline-flex items-center gap-2 text-kf-text hover:text-kf-accent transition-colors"
          >
            <span className="text-kf-accent">★</span> Star this repo on GitHub
          </a>
          <a
            href={AUTHOR.github}
            className="text-kf-muted hover:text-kf-accent transition-colors"
          >
            github.com/abgnydn — all my projects
          </a>
          <a
            href={AUTHOR.linkedin}
            className="text-kf-muted hover:text-kf-accent transition-colors"
          >
            Follow my research on LinkedIn
          </a>
          <a
            href={SITES.barisgunaydin.url}
            className="text-kf-muted hover:text-kf-accent transition-colors"
          >
            barisgunaydin.com
          </a>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 mt-8 pt-6 border-t border-kf-border/30 text-xs text-kf-muted/70 flex flex-wrap gap-x-4 gap-y-1">
        <span>© {new Date().getFullYear()} Ahmet Baris Gunaydin · MIT</span>
        <span>·</span>
        <span>
          Sister sites:{" "}
          <a href={SITES.gpubench.url} className="hover:text-kf-accent">
            gpubench.dev
          </a>{" "}·{" "}
          <a href={SITES.zerotvm.url} className="hover:text-kf-accent">
            zerotvm.com
          </a>{" "}·{" "}
          <a href={SITES.neuropulse.url} className="hover:text-kf-accent">
            neuropulse.live
          </a>{" "}·{" "}
          <a href={SITES.webgpudna.url} className="hover:text-kf-accent">
            webgpudna.com
          </a>
        </span>
      </div>
    </footer>
  );
}
