import Image from "next/image";
import Link from "next/link";
import {
  Clapperboard,
  Feather,
  Flame,
  Flower,
  GraduationCap,
  Hand,
  Heart,
  Leaf,
  Mountain,
  Palette,
  Plane,
  ShieldCheck,
  ZodiacTaurus,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { SITE } from "@/lib/content";
import { getCopy, type Locale } from "./copy";
import { Bee, BeeSprite } from "./Bee";
import { HeroCandle } from "./HeroCandle";
import { CountUp } from "./CountUp";
import { StageController } from "./StageController";
import { Flashlight } from "./Flashlight";
import { ContactForm } from "./ContactForm";
import { Goodnight } from "./Goodnight";
import { BeeCursorZone } from "./BeeCursorZone";
import { LoopPauser } from "./LoopPauser";
import s from "./home.module.css";

const ICONS: Record<string, LucideIcon> = {
  flower: Flower,
  hand: Hand,
  feather: Feather,
  heart: Heart,
  truck: Truck,
  flame: Flame,
  leaf: Leaf,
  shield: ShieldCheck,
  graduation: GraduationCap,
  palette: Palette,
  taurus: ZodiacTaurus,
  plane: Plane,
  mountain: Mountain,
  film: Clapperboard,
};

// Greedy masonry: each tile goes to the currently shortest column.
function toColumns<T extends { width: number; height: number }>(items: T[], n: number) {
  const cols: T[][] = Array.from({ length: n }, () => []);
  const heights = new Array(n).fill(0);
  for (const it of items) {
    const i = heights.indexOf(Math.min(...heights));
    cols[i].push(it);
    heights[i] += it.height / it.width;
  }
  return cols;
}

export function HomePage({ locale }: { locale: Locale }) {
  const c = getCopy(locale);
  const candles = c.collection.candles;
  const muse = candles.find((x) => x.slug === "muse")!;
  const waLink = `https://wa.me/${SITE.whatsapp.replace(/[^\d]/g, "")}`;
  const year = new Date().getFullYear();

  const navLinks = [
    { href: "#collection", label: c.nav.collection },
    { href: "#process", label: c.nav.process },
    { href: "#story", label: c.nav.story },
    { href: "#wraps", label: c.nav.wraps },
    { href: "#gallery", label: c.nav.gallery },
  ];
  const channels = [
    { href: `mailto:${SITE.email}`, label: c.contact.email, value: SITE.email },
    { href: waLink, label: c.contact.whatsapp, value: SITE.whatsappDisplay, external: true },
    { href: SITE.instagram, label: c.contact.instagram, value: SITE.instagramHandle, external: true },
    { href: SITE.facebook, label: c.contact.facebook, value: "Kiribee", external: true },
  ];

  return (
    <div className={s.root}>
      <BeeSprite />
      <a href="#main" className={s.skip}>
        {c.skip}
      </a>

      {/* Nav */}
      <header className={s.nav}>
        <div className={s.navPill}>
          <a href="#top" className={s.navBrand} aria-label={c.wordmarkLabel}>
            <Wordmark />
          </a>
          <nav className={s.navLinks} aria-label="Primary">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className={s.navEnd}>
            <LangSwitch locale={locale} label={c.langLabel} />
            <a href="#contact" className={s.navOrder}>
              {c.nav.order}
            </a>
            <details className={s.menu}>
              <summary>{c.nav.menu}</summary>
              <nav className={s.menuPanel} aria-label="Mobile">
                {navLinks.map((l) => (
                  <a key={l.href} href={l.href}>
                    {l.label}
                  </a>
                ))}
                <a href="#contact">{c.nav.contact}</a>
              </nav>
            </details>
          </div>
        </div>
      </header>

      <main id="main">
        {/* Hero */}
        <section id="top" className={s.hero}>
          <div className={s.heroLight} aria-hidden="true" />
          <div className={s.heroInner}>
            <div className={s.heroText}>
              <Chapter n="I" label={c.chapters.morning} />
              {/* The h1 carries the search phrase in the page language; the big
                  brand line keeps the look of the logo. */}
              <h1 className={s.eyebrow}>{c.hero.eyebrow}</h1>
              {/* One word group per line, so the font swap can never re-wrap it */}
              <p className={s.heroTitle}>
                <span className={s.line}>{c.hero.title}</span>{" "}
                <em>
                  {c.hero.titleAccent.split(" ").map((w) => (
                    <span key={w} className={s.line}>
                      {w}{" "}
                    </span>
                  ))}
                </em>
              </p>
              <p className={s.heroLede}>{c.hero.lede}</p>
              <div className={s.ctaRow}>
                <a href="#collection" className={s.btnInk}>
                  {c.hero.ctaPrimary}
                  <Arrow />
                </a>
                <a href="#contact" className={s.btnLine}>
                  {c.hero.ctaSecondary}
                </a>
              </div>
            </div>
            <div className={s.heroFigure}>
              <HeroCandle title={c.hero.plaqueTitle} hint={c.hero.plaqueHint} />
              <RingBadge text={c.hero.ring} />
            </div>
          </div>
        </section>

        {/* Honeycomb band: cells fill with honey as you scroll */}
        <section className={s.band} aria-label={c.hero.ring.trim()}>
          <ul className={s.comb}>
            {c.band.map((b, i) => {
              const Icon = ICONS[b.icon];
              return (
                <li key={b.label} className={s.cell} style={{ "--i": i } as React.CSSProperties}>
                  <span className={s.cellInner}>
                    <span className={s.cellFill} aria-hidden="true" />
                    <Icon className={s.cellIcon} aria-hidden="true" strokeWidth={1.5} />
                    <span className={s.cellLabel}>{b.label}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Collection */}
        <section id="collection" className={s.collection} data-active="0">
          <StageController sectionId="collection" />
          <div className={s.container}>
            <div className={s.sectionHead}>
              <p className={s.eyebrow}>{c.collection.eyebrow}</p>
              <h2 className={s.h2}>{c.collection.title}</h2>
              <p className={s.bodyLg}>{c.collection.subtitle}</p>
            </div>

            <div className={s.collectionGrid}>
              <div className={s.stage} aria-hidden="true">
                <div className={s.stageSticky}>
                  <div className={s.stageArch}>
                    {candles.map((cd, i) => (
                      <div key={cd.slug} className={s.stageImg} data-index={i}>
                        <Image src={cd.image} alt="" fill sizes="(min-width: 1024px) 36vw, 1px" className={s.cover} />
                      </div>
                    ))}
                  </div>
                  <div className={s.stageCount}>
                    {candles.map((cd, i) => (
                      <span key={cd.slug} data-index={i}>
                        {c.collection.no} 0{i + 1} <em>{c.collection.of} 05</em>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <ol className={s.pieces}>
                {candles.map((cd, i) => (
                  <li key={cd.slug} className={s.piece} data-stage-item={i}>
                    <div className={s.pieceImg}>
                      <Image src={cd.image} alt={cd.alt} fill sizes="(min-width: 1024px) 1px, 86vw" className={s.cover} />
                    </div>
                    <p className={s.pieceNo}>
                      {c.collection.no} 0{i + 1}
                      {cd.signature && <span className={s.badge}>{c.collection.badge}</span>}
                    </p>
                    <h3 className={s.pieceName}>{cd.name}</h3>
                    <p className={s.pieceBlurb}>{cd.blurb}</p>
                    <p className={s.pieceMeta}>{c.collection.material}</p>
                    <a href="#contact" className={s.pieceLink} data-inquire={cd.name}>
                      {c.collection.inquire}
                      <span className={s.srOnly}> {cd.name}</span>
                      <Arrow />
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Why beeswax, with the bee that follows the cursor */}
        <section id="beeswax" className={s.benefits}>
          <Drips fill="paper" bees />
          <div className={s.honeycombBg} aria-hidden="true" />
          <BeeCursorZone sectionId="beeswax" />
          <div className={s.container}>
            <Chapter n="II" label={c.chapters.midday} />
            <div className={s.fact}>
              <CountUp value={c.benefits.factValue} locale={locale} className={s.factValue} />
              <p className={s.factLabel}>{c.benefits.factLabel}</p>
              <p className={s.factAfter}>{c.benefits.factAfter}</p>
              <p className={s.beeHint}>
                <Bee className={s.beeHintIcon} />
                {c.benefits.beeHint}
              </p>
            </div>
            <div className={s.sectionHead}>
              <p className={s.eyebrow}>{c.benefits.eyebrow}</p>
              <h2 className={s.h2}>{c.benefits.title}</h2>
            </div>
            <ol className={s.benefitList}>
              {c.benefits.items.map((b, i) => {
                const Icon = ICONS[b.icon];
                return (
                  <li key={b.title} className={`${s.benefitRow} ${s.reveal}`}>
                    <span className={s.benefitHex} aria-hidden="true">
                      <Icon strokeWidth={1.5} />
                    </span>
                    <span className={s.benefitNum}>0{i + 1}</span>
                    <h3 className={s.benefitTitle}>{b.title}</h3>
                    <p className={s.benefitBody}>{b.body}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* Process: a drop of honey travels down the steps */}
        <section id="process" className={s.process}>
          <Drips fill="paper2" bees />
          <div className={s.honeycombBg} aria-hidden="true" />
          <div className={`${s.container} ${s.processGrid}`}>
            <div className={s.processHead}>
              <Chapter n="III" label={c.chapters.golden} />
              <p className={s.eyebrow}>{c.process.eyebrow}</p>
              <h2 className={s.h2}>{c.process.title}</h2>
              <p className={s.bodyLg}>{c.process.subtitle}</p>
            </div>
            <div className={s.stepsWrap}>
              <div className={s.stepsTrack} aria-hidden="true">
                <span className={s.honeyDrop}>
                  <svg viewBox="0 0 24 32">
                    <path d="M12 1 C 16 9, 22 15, 22 21 A 10 10 0 0 1 2 21 C 2 15, 8 9, 12 1 Z" fill="#e3a730" />
                    <path d="M12 1 C 16 9, 22 15, 22 21 A 10 10 0 0 1 2 21 C 2 15, 8 9, 12 1 Z" fill="none" stroke="#8a4f0c" strokeOpacity="0.5" />
                    <ellipse cx="8.5" cy="20" rx="2.4" ry="3.6" fill="#fff6d6" opacity="0.8" />
                  </svg>
                </span>
              </div>
              <ol className={s.steps}>
                {c.process.steps.map((p, i) => (
                  <li key={p.title} className={s.step}>
                    <span className={s.stepDot} aria-hidden="true" />
                    <span className={s.stepNum} aria-hidden="true">
                      0{i + 1}
                    </span>
                    <div className={s.stepContent}>
                      <h3 className={s.stepTitle}>{p.title}</h3>
                      <p className={s.stepBody}>{p.body}</p>
                      <span className={s.chip}>{p.spec}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Too beautiful to burn: candlelight reveal */}
        <section id="burn" className={s.burn}>
          <Drips fill="golden" bees />
          <div className={s.container}>
            <Chapter n="IV" label={c.chapters.dusk} />
            <div className={s.burnGrid}>
              <div className={s.burnText}>
                <h2 className={s.h2}>{c.burn.title}</h2>
                <p className={s.bodyLg}>{c.burn.body}</p>
                <p className={s.burnHint}>
                  <span className={s.hintDot} aria-hidden="true" />
                  {c.burn.hint}
                </p>
              </div>
              <div id="v1-flashlight" className={s.torch} tabIndex={0} role="img" aria-label={c.burn.imageAlt}>
                <Image src={muse.image} alt="" fill sizes="(min-width: 1024px) 52vw, 92vw" className={`${s.cover} ${s.torchBase}`} />
                <Image src={muse.image} alt="" fill sizes="(min-width: 1024px) 52vw, 92vw" className={`${s.cover} ${s.torchLit}`} />
                <span className={s.torchWarm} />
              </div>
              <Flashlight targetId="v1-flashlight" />
            </div>
          </div>
        </section>

        {/* Ana's story, in her own words */}
        <section id="story" className={s.story}>
          <div className={s.container}>
            <div className={s.storyGrid}>
              <div className={s.storyPhoto}>
                <Image
                  src="/about/ana.jpg"
                  alt={c.story.photoAlt}
                  width={1080}
                  height={1351}
                  sizes="(min-width: 1024px) 38vw, 92vw"
                  className={s.storyImg}
                />
              </div>
              <div className={s.storyText}>
                <p className={s.eyebrow}>{c.story.eyebrow}</p>
                <h2 className={s.h2}>{c.story.title}</h2>
                <p className={`${s.bodyLg} ${s.dropcap}`}>{c.story.p1}</p>
                <p className={s.body}>{c.story.p2}</p>
                <figure className={s.quote}>
                  <blockquote>
                    <p>&ldquo;{c.story.quote}&rdquo;</p>
                  </blockquote>
                  <figcaption>
                    {c.story.credit}{" "}
                    <a href="https://thealbaniainsider.com/" target="_blank" rel="noopener noreferrer">
                      {c.story.creditSource}
                    </a>
                  </figcaption>
                </figure>
                <p className={s.body}>{c.story.p3}</p>
                <p className={s.signature}>{c.story.signature}</p>
              </div>
            </div>

            <h3 className={s.factsTitle}>{c.story.factsTitle}</h3>
            <ul className={s.hexFacts}>
              {c.story.facts.map((f) => {
                const Icon = ICONS[f.icon];
                return (
                  <li key={f.label} className={s.hexFact}>
                    <span className={s.hexFactInner}>
                      <span className={s.hexFactFill} aria-hidden="true" />
                      <Icon className={s.hexFactIcon} aria-hidden="true" strokeWidth={1.5} />
                      <span className={s.hexFactLabel}>{f.label}</span>
                      <span className={s.hexFactText}>{f.text}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Wraps */}
        <section id="wraps" className={s.wraps}>
          <div className={`${s.container} ${s.wrapsGrid}`}>
            <div className={`${s.wrapsPhoto} ${s.reveal}`}>
              <Image src="/products/wraps.jpg" alt={c.wraps.alt} fill sizes="(min-width: 1024px) 38vw, 90vw" className={s.cover} />
            </div>
            <div>
              <Chapter n="V" label={c.chapters.night} />
              <p className={s.eyebrow}>{c.wraps.eyebrow}</p>
              <h2 className={s.h2}>{c.wraps.title}</h2>
              <p className={s.bodyLg}>{c.wraps.lede}</p>
              <ul className={s.wrapsList}>
                {c.wraps.items.map((b) => (
                  <li key={b.title} className={s.reveal}>
                    <h3>{b.title}</h3>
                    <p>{b.body}</p>
                  </li>
                ))}
              </ul>
              <a href="#contact" className={s.btnLine} data-inquire="Beeswax Wraps">
                {c.wraps.cta}
                <Arrow />
              </a>
            </div>
          </div>
        </section>

        {/* Gallery: parallax masonry */}
        <section id="gallery" className={s.gallery}>
          <div className={`${s.container} ${s.galleryHead}`}>
            <div>
              <p className={s.eyebrow}>{c.gallery.eyebrow}</p>
              <h2 className={s.h2}>{c.gallery.title}</h2>
            </div>
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className={s.btnOutline}>
              {c.gallery.cta}
              <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M4 4h8v8M12 4L4 12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
            </a>
          </div>
          <div className={s.container}>
            {/* Three columns on desktop; on phones the same tiles reflow into two. */}
            {[3].map((n) => (
              <div key={n} className={s.masonry}>
                {toColumns(c.gallery.items, n).map((col, ci) => (
                  <div key={ci} className={s.masonryCol}>
                    {col.map((g) => (
                      <figure key={g.src} className={s.tile}>
                        <Image
                          src={g.src}
                          alt={g.alt}
                          width={g.width}
                          height={g.height}
                          sizes="(min-width: 900px) 28vw, 46vw"
                          className={s.tileImg}
                        />
                        <figcaption className={s.tileCap} aria-hidden="true">
                          {g.alt}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className={s.contact}>
          <div className={`${s.container} ${s.contactGrid}`}>
            <div>
              <p className={s.eyebrow}>{c.contact.eyebrow}</p>
              <h2 className={s.h2}>{c.contact.title}</h2>
              <p className={s.bodyLg}>{c.contact.subtitle}</p>
              <p className={`${s.eyebrow} ${s.channelsTitle}`}>{c.contact.channelsTitle}</p>
              <ul className={s.channels}>
                {channels.map((ch) => (
                  <li key={ch.label}>
                    <a
                      href={ch.href}
                      className={s.channel}
                      target={ch.external ? "_blank" : undefined}
                      rel={ch.external ? "noopener noreferrer" : undefined}
                    >
                      <span className={s.channelLabel}>{ch.label}</span>
                      <span className={s.channelValue}>{ch.value}</span>
                      <Arrow />
                    </a>
                  </li>
                ))}
              </ul>
              <p className={s.location}>{c.contact.location}</p>
            </div>
            <ContactForm locale={locale} email={SITE.email} t={c.contact.form} />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={s.footer}>
        <Drips fill="honey" bees />
        <Goodnight t={c.goodnight} />
        <div className={`${s.container} ${s.footerMain}`}>
          <div className={s.footBrand}>
            <a href="#top" className={s.footWordmark} aria-label={c.wordmarkLabel}>
              <Wordmark />
            </a>
            <p className={s.footBrandline}>{c.footer.brandline}</p>
            <p className={s.footTagline}>{c.footer.tagline}</p>
          </div>
          <nav className={s.footCol} aria-label={c.footer.explore}>
            <p className={s.footHead}>{c.footer.explore}</p>
            <ul>
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className={s.footCol}>
            <p className={s.footHead}>{c.footer.hello}</p>
            <ul>
              {channels.map((ch) => (
                <li key={ch.label}>
                  <a href={ch.href} target={ch.external ? "_blank" : undefined} rel={ch.external ? "noopener noreferrer" : undefined}>
                    {ch.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={`${s.container} ${s.footBottom}`}>
          <p>
            © {year} {SITE.name}. {c.footer.rights}
          </p>
          <p>
            {c.footer.credit}{" "}
            <a href="https://aldorino.is-a.dev/" target="_blank" rel="noopener" className={s.footCredit}>
              DeFrag01
            </a>
          </p>
          <a href="#top" className={s.backTop}>
            <Bee className={s.backTopBee} />
            {c.footer.backToTop}
          </a>
        </div>
      </footer>

      <LoopPauser />
    </div>
  );
}

function Wordmark() {
  return (
    <span className={s.wordmark} aria-hidden="true">
      k<span className={s.wmI}>ı</span>r<span className={s.wmI}>ı</span>bee
    </span>
  );
}

function LangSwitch({ locale, label }: { locale: Locale; label: string }) {
  return (
    <div className={s.lang} role="group" aria-label={label}>
      <Link href="/en" aria-current={locale === "en" ? "true" : undefined} hrefLang="en">
        EN
      </Link>
      <Link href="/sq" aria-current={locale === "sq" ? "true" : undefined} hrefLang="sq">
        SQ
      </Link>
    </div>
  );
}

function Chapter({ n, label }: { n: string; label: string }) {
  return (
    <p className={s.chapter}>
      <span className={s.chapterNum}>{n}</span>
      <span className={s.chapterRule} aria-hidden="true" />
      <span>{label}</span>
    </p>
  );
}

function RingBadge({ text }: { text: string }) {
  return (
    <div className={s.ring} aria-hidden="true" data-loop>
      <svg viewBox="0 0 120 120" className={s.ringText}>
        <defs>
          <path id="v1-ring-path" d="M60 60 m -46 0 a 46 46 0 1 1 92 0 a 46 46 0 1 1 -92 0" />
        </defs>
        <text>
          <textPath href="#v1-ring-path" textLength="289" lengthAdjust="spacingAndGlyphs">
            {text}
          </textPath>
        </text>
      </svg>
      <Bee className={s.ringBee} />
    </div>
  );
}

// Wax drips from the section above, with a couple of bees roaming around them.
function Drips({ fill, bees }: { fill: "paper" | "paper2" | "golden" | "honey"; bees?: boolean }) {
  const drips: Array<[number, number, number]> = [
    [40, 26, 64], [150, 18, 40], [236, 34, 104], [390, 20, 54], [520, 30, 86],
    [668, 16, 36], [780, 38, 118], [952, 20, 60], [1080, 28, 92], [1214, 18, 46],
    [1330, 32, 76],
  ];
  const fillClass = {
    paper: s.dripsPaper,
    paper2: s.dripsPaper2,
    golden: s.dripsGolden,
    honey: s.dripsHoney,
  }[fill];
  return (
    <div className={`${s.drips} ${fillClass}`} aria-hidden="true" data-loop>
      <svg viewBox="0 0 1440 140" preserveAspectRatio="xMidYMin slice">
        <rect x="0" y="0" width="1440" height="22" />
        {drips.map(([dx, w, h], i) => (
          <rect key={i} className={s.drip} x={dx} y="0" width={w} height={h} rx={w / 2} />
        ))}
        <circle className={s.drop} cx={253} cy="118" r="7" />
        <circle className={`${s.drop} ${s.dropLate}`} cx={799} cy="132" r="8" />
      </svg>
      {bees && (
        <>
          <span className={`${s.roam} ${s.roamA}`}>
            <Bee className={s.roamBee} />
          </span>
          <span className={`${s.roam} ${s.roamB}`}>
            <Bee className={s.roamBee} />
          </span>
        </>
      )}
    </div>
  );
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className={s.arrow}>
      <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
