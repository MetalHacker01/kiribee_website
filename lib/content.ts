import type { Locale } from "@/i18n";

export const SITE = {
  name: "Kiribee",
  tagline: "Crafted by Albanian bees",
  domain: "kiribee.com",
  url: "https://kiribee.com",
  email: "kiribeecom@gmail.com",
  founded: "2020",
  city: "Tirana",
  region: "Tirana",
  country: "AL",
  countryName: "Albania",
  founders: ["Ana", "Aldo"],
  instagram: "https://www.instagram.com/kiribee_/",
  instagramHandle: "@kiribee_",

  // ─────────────────────────────────────────────────────────────────
  // TODO: replace with the real values before production deploy.
  // ─────────────────────────────────────────────────────────────────
  facebook: "https://www.facebook.com/kiribeecom/",
  whatsapp: "+355675280179",
  whatsappDisplay: "+355 67 528 0179",
} as const;

export const SOCIAL_PROFILES = [SITE.instagram, SITE.facebook] as const;

export type CandleHighlight = {
  slug: string;
  name: string;
  imageSrc: string;
  imageAlt: { en: string; sq: string };
  blurb: { en: string; sq: string };
  signature?: boolean;
};

export const FEATURED_CANDLES: CandleHighlight[] = [
  {
    slug: "beequite",
    name: "BeeQuite",
    imageSrc: "/images/candle-beequite.jpg",
    imageAlt: {
      en: "BeeQuite, a sculpted beeswax candle of a hand cradling a child",
      sq: "BeeQuite, qiri i skulpturuar me dyll bleta në formën e dorës që përkund një fëmijë",
    },
    blurb: {
      en: "Our signature piece. A hand cradling a child, a quiet ode to the unbreakable bond between mother and child.",
      sq: "Pjesa jonë më e dashur. Një dorë që përkund një fëmijë, një odë e qetë për lidhjen e pathyeshme midis nënës dhe fëmijës.",
    },
    signature: true,
  },
  {
    slug: "minerva",
    name: "Minerva",
    imageSrc: "/images/candle-minerva.jpg",
    imageAlt: {
      en: "Minerva, a Roman goddess bust beeswax candle flanked by two column candles",
      sq: "Minerva, qiri i bustit të perëndeshës romake me dyll bleta midis dy qirinjve të kolonave",
    },
    blurb: {
      en: "The Roman goddess of wisdom, cast in pure beeswax. We made her so the candle you light could quietly carry warmth, calm, and a clear head into the room.",
      sq: "Perëndesha romake e mençurisë, e derdhur në dyll bleta të pastër. E bëmë që qiriri që ndizni të sjellë ngrohtësi, qetësi dhe një mendje të kthjellët në dhomë.",
    },
  },
  {
    slug: "embrace",
    name: "Embrace",
    imageSrc: "/images/candle-embrace.jpg",
    imageAlt: {
      en: "Embrace, a pair of beeswax figures with red heart accents",
      sq: "Embrace, çift figurash me dyll bleta me zemra të kuqe",
    },
    blurb: {
      en: "A couple, a family, a beginning. Personalized with the names you love. Our most-asked-for gift for weddings and anniversaries.",
      sq: "Një çift, një familje, një fillim. I personalizuar me emrat që doni. Dhurata jonë më e kërkuar për dasma dhe përvjetorë.",
    },
  },
  {
    slug: "muse",
    name: "Muse",
    imageSrc: "/images/candle-muse.jpg",
    imageAlt: {
      en: "Muse, sculpted face plaque candles with hand-applied gold leaf",
      sq: "Muse, qirinj me pllaka fytyre dhe ar të aplikuar me dorë",
    },
    blurb: {
      en: "Hand-finished face plaques with gold leaf. Our most artistic piece. Each one is a small sculpture you can light.",
      sq: "Pllaka fytyre të përfunduara me dorë, me ar të hollë. Pjesa jonë më artistike. Secila është një skulpturë e vogël që mund ta ndizni.",
    },
  },
  {
    slug: "bloom",
    name: "Bloom",
    imageSrc: "/images/candle-bloom.jpg",
    imageAlt: {
      en: "Bloom, rose-shaped beeswax candles with lit lotus tealights",
      sq: "Bloom, qirinj në formë trëndafili me llamba lotusi të ndezura",
    },
    blurb: {
      en: "Rose-shaped pours with a soft, sweet honey scent. Quiet, calming, made to be lit for someone you love.",
      sq: "Të derdhur në formë trëndafili, me një aromë të lehtë dhe të ëmbël mjalti. Të qetë, qetësues, të bërë për t'u ndezur për dikë që doni.",
    },
  },
];

export const PROCESS_STEPS: Array<{
  step: number;
  title: { en: string; sq: string };
  body: { en: string; sq: string };
}> = [
  {
    step: 1,
    title: { en: "Filter the wax", sq: "Filtrojmë dyllin" },
    body: {
      en: "We start with raw Albanian beeswax and patiently filter out every impurity until it runs gold and clear.",
      sq: "Nisim me dyll bleta të papërpunuar shqiptar dhe me durim heqim çdo papastërti derisa të bëhet i artë dhe i kthjellët.",
    },
  },
  {
    step: 2,
    title: { en: "Melt with care", sq: "Shkrijmë me kujdes" },
    body: {
      en: "The wax is melted slowly at the right temperature, never rushed. Heat is the difference between a candle and a craft.",
      sq: "Dylli shkrihet ngadalë në temperaturën e duhur, pa nxitim. Nxehtësia është ndryshimi midis një qiriu dhe një zanati.",
    },
  },
  {
    step: 3,
    title: { en: "Pour the mold", sq: "Derdhim në kallëp" },
    body: {
      en: "A pure cotton wick is set in the mold. Then the wax is poured in one quiet motion. The moment everything begins to set.",
      sq: "Një fitil pambuku i pastër vendoset në kallëp. Pastaj dylli derdhet në një lëvizje të qetë. Momenti kur gjithçka fillon të ngurtësohet.",
    },
  },
  {
    step: 4,
    title: { en: "Let it cool", sq: "E lëmë të ftohet" },
    body: {
      en: "Hours of stillness. The wax cools, hardens, and remembers the shape of the mold.",
      sq: "Orë qetësie. Dylli ftohet, ngurtësohet dhe mban formën e kallëpit.",
    },
  },
  {
    step: 5,
    title: { en: "A dash of love", sq: "Një dorë dashuri" },
    body: {
      en: "We carefully demold and finish each piece by hand. A painting, a dedication, the small touch that makes it yours.",
      sq: "Heqim me kujdes nga kallëpi dhe e përfundojmë secilin me dorë. Një pikturë, një kushtim, prekja e vogël që e bën tëndin.",
    },
  },
];

export const BENEFITS: Array<{
  icon: "flame" | "leaf" | "heart" | "feather" | "shield";
  title: { en: string; sq: string };
  body: { en: string; sq: string };
}> = [
  {
    icon: "flame",
    title: { en: "Longer burn", sq: "Djegie më e gjatë" },
    body: {
      en: "Beeswax burns slower and cleaner than paraffin. The same candle, more evenings.",
      sq: "Dylli i bletës digjet më ngadalë dhe më pastër se parafina. I njëjti qiri, më shumë mbrëmje.",
    },
  },
  {
    icon: "leaf",
    title: { en: "Eco-friendly", sq: "Miqësor me natyrën" },
    body: {
      en: "Made from a natural by-product of beekeeping. No petroleum, no synthetic dyes.",
      sq: "I bërë nga një nënprodukt natyral i bletarisë. Pa naftë, pa ngjyrues sintetikë.",
    },
  },
  {
    icon: "feather",
    title: { en: "Hypoallergenic", sq: "Hipoalergjenik" },
    body: {
      en: "No chemical compounds. Safe to breathe near sleeping children, pets, and quiet evenings.",
      sq: "Pa përbërës kimikë. I sigurt për t'u marrë frymë pranë fëmijëve që flenë, kafshëve dhe mbrëmjeve të qeta.",
    },
  },
  {
    icon: "heart",
    title: { en: "Made by hand", sq: "Bërë me dorë" },
    body: {
      en: "Every candle is poured, demolded, and finished personally by Ana and Aldo in Tirana.",
      sq: "Çdo qiri derdhet, hiqet nga kallëpi dhe përfundohet personalisht nga Ana dhe Aldo në Tiranë.",
    },
  },
  {
    icon: "shield",
    title: { en: "Pure & honest", sq: "I pastër dhe i sinqertë" },
    body: {
      en: "100% Albanian beeswax. No fillers, no fragrance oils, no shortcuts. Just wax and a wick.",
      sq: "100% dyll bleta shqiptar. Pa mbushës, pa vajra aromatikë, pa shkurtesa. Vetëm dyll dhe një fitil.",
    },
  },
];

export const PULL_QUOTE = {
  en: "It may seem like a small thing, but the benefits for health and mind are impressive.",
  sq: "Mund të duket si diçka e vogël, por përfitimet për shëndetin dhe mendjen janë mahnitëse.",
} as const;

export const ATTRIBUTION = {
  source: "The Albania Insider",
  url: "https://thealbaniainsider.com/",
  date: "March 27, 2023",
};

// ────────────────────────────────────────────────────────────────────
// Ana, the maker
// ────────────────────────────────────────────────────────────────────
export const ABOUT_ANA = {
  imageSrc: "/about/ana.jpg",
  imageAlt: {
    en: "Ana, co-founder of Kiribee, photographed in Tirana",
    sq: "Ana, bashkëthemeluese e Kiribee, fotografuar në Tiranë",
  },
  facts: {
    en: [
      "Graduated in Banking and Financial Management.",
      "Art is my hobby. The only thing that pulls me out of everyday routine.",
      "Calm by nature, but as a Taurus I rearrange the room often.",
      "Hooked on travel.",
      "Earth tones, always.",
      "Favourite film genre: thriller and mystery.",
    ],
    sq: [
      "E diplomuar në Menaxhim Bankar dhe Financiar.",
      "Arti është hobi im. I vetmi që më bën të largohem nga monotonia e përditshme.",
      "Natyra ime është e qetë, si shenja e Demit që jam. Më pëlqen të ndryshoj shpesh ambjentin.",
      "E fiksuar pas udhëtimeve.",
      "Ngjyrat e mia të preferuara janë ato të tokës.",
      "Zhanri i filmave të preferuar: thriller dhe mister.",
    ],
  },
};

// ────────────────────────────────────────────────────────────────────
// Beeswax Food Wraps, second product line
// ────────────────────────────────────────────────────────────────────
export const WRAPS = {
  imageSrc: "/products/wraps.jpg",
  imageAlt: {
    en: "Kiribee beeswax food wraps, patterned cotton cloth wrapped around lemon and cucumber slices",
    sq: "Mbështjellës ushqimi me dyll bleta Kiribee, pëlhurë pambuku me modele rreth një limoni dhe feta kastraveci",
  },
  benefits: [
    {
      title: { en: "Reusable", sq: "Të ripërdorshme" },
      body: {
        en: "Up to a year of use. Rinse with cool water and a mild soap, hang to dry, repeat.",
        sq: "Deri në një vit përdorim. Lani me ujë të ftohtë dhe sapun të butë, varni t'i thahen, përsëritni.",
      },
    },
    {
      title: { en: "Naturally antibacterial", sq: "Antibakteriale natyralisht" },
      body: {
        en: "Beeswax does the work. Keeps cheese, fruit, vegetables, and sandwiches fresh longer than plastic.",
        sq: "Dylli i bletës bën punën. Mban djathin, frutat, perimet dhe sanduiçet të freskëta më gjatë se plastika.",
      },
    },
    {
      title: { en: "Plastic-free", sq: "Pa plastikë" },
      body: {
        en: "Cotton, beeswax, tree resin, jojoba oil. When the wrap is finally retired, the whole thing biodegrades.",
        sq: "Pambuk, dyll bleta, rrëshirë peme, vaj jojoba. Kur mbështjellësi del nga përdorimi, gjithçka biodegradohet.",
      },
    },
    {
      title: { en: "Eco-friendly", sq: "Miqësor me mjedisin" },
      body: {
        en: "One wrap replaces hundreds of meters of plastic film over its lifetime. Small thing, real difference.",
        sq: "Një mbështjellës zëvendëson qindra metra plastikë gjatë jetës së tij. Gjë e vogël, ndryshim i vërtetë.",
      },
    },
    {
      title: { en: "Pet-friendly", sq: "Miqësor me kafshët" },
      body: {
        en: "No phthalates, no synthetic fragrance, no chemical compounds. Safe in kitchens with curious paws.",
        sq: "Pa ftalate, pa aroma sintetike, pa përbërës kimikë. I sigurt në kuzhina me putra kureshtare.",
      },
    },
  ],
};

export function getContactChannels(locale: Locale) {
  const labels = {
    en: {
      email: "Email",
      whatsapp: "WhatsApp",
      instagram: "Instagram",
      facebook: "Facebook",
      location: "Based in Tirana, ships across Albania",
    },
    sq: {
      email: "Email",
      whatsapp: "WhatsApp",
      instagram: "Instagram",
      facebook: "Facebook",
      location: "Me bazë në Tiranë, dërgon në të gjithë Shqipërinë",
    },
  } as const;
  return labels[locale];
}
