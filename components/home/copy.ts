// All copy for the v1 redesign, in English and Albanian. The story is told
// by Ana in the first person; the Albanian is written, not translated.

export type Locale = "en" | "sq";

type Candle = {
  slug: string;
  name: string;
  image: string;
  alt: string;
  blurb: string;
  signature?: boolean;
};

type GalleryItem = { src: string; width: number; height: number; alt: string };

const CANDLE_IMAGES = {
  beequite: "/images/candle-beequite.jpg",
  minerva: "/images/candle-minerva.jpg",
  embrace: "/images/candle-embrace.jpg",
  muse: "/images/candle-muse.jpg",
  bloom: "/images/candle-bloom.jpg",
};

// Real pixel sizes of the gallery files (lib/gallery.ts lists them all as square).
const G = (n: string, width = 1080, height = 1350) => ({
  src: `/images/gallery/${n}.jpg`,
  width,
  height,
});

const en = {
  skip: "Skip to content",
  wordmarkLabel: "Kiribee, back to top",
  langLabel: "Language",
  nav: {
    collection: "Collection",
    process: "Process",
    story: "Story",
    wraps: "Wraps",
    gallery: "Gallery",
    contact: "Contact",
    order: "Order",
    menu: "Menu",
  },
  chapters: {
    morning: "Morning",
    midday: "Midday",
    golden: "Golden hour",
    dusk: "Dusk",
    night: "Night",
  },
  hero: {
    eyebrow: "Beeswax candles, handmade in Tirana",
    title: "Crafted by",
    titleAccent: "Albanian bees.",
    lede: "Hand-poured candles made of pure Albanian beeswax. Quiet, golden, and a little bit alive.",
    ctaPrimary: "See the collection",
    ctaSecondary: "Order a candle",
    plaqueTitle: "Give light to your life",
    plaqueHint: "Move close to the flame and watch it sway",
    ring: "100% Albanian beeswax · hand-poured in Tirana · ",
  },
  band: [
    { icon: "flower", label: "100% Albanian beeswax" },
    { icon: "hand", label: "Hand-poured in Tirana" },
    { icon: "feather", label: "Hypoallergenic" },
    { icon: "heart", label: "Personal dedications" },
    { icon: "truck", label: "Shipping across Albania" },
  ],
  collection: {
    eyebrow: "The collection",
    title: "A few candles we love.",
    subtitle:
      "A small selection of our hand-poured pieces. Ask us about sizes, dedications and custom orders.",
    badge: "Bestseller",
    inquire: "Inquire",
    material: "Beeswax, cotton wick",
    no: "No.",
    of: "of",
    candles: [
      {
        slug: "beequite",
        name: "BeeQuite",
        image: CANDLE_IMAGES.beequite,
        alt: "BeeQuite, a sculpted beeswax candle of a hand cradling a child",
        blurb:
          "Our signature piece. A hand cradling a child, a quiet tribute to the unbreakable bond between mother and child.",
        signature: true,
      },
      {
        slug: "minerva",
        name: "Minerva",
        image: CANDLE_IMAGES.minerva,
        alt: "Minerva, a Roman goddess bust beeswax candle between two column candles",
        blurb:
          "The Roman goddess of wisdom, cast in pure beeswax to bring warmth, calm and a clear mind into the room.",
      },
      {
        slug: "embrace",
        name: "Embrace",
        image: CANDLE_IMAGES.embrace,
        alt: "Embrace, a pair of beeswax figures with red heart accents",
        blurb:
          "A couple, a family, a new beginning. Personalised with the names you love, and our most requested gift for weddings and anniversaries.",
      },
      {
        slug: "muse",
        name: "Muse",
        image: CANDLE_IMAGES.muse,
        alt: "Muse, sculpted face plaque candles with hand-applied gold leaf",
        blurb:
          "Face plaques finished by hand with gold leaf. Our most artistic piece: a small sculpture you can light.",
      },
      {
        slug: "bloom",
        name: "Bloom",
        image: CANDLE_IMAGES.bloom,
        alt: "Bloom, rose-shaped beeswax candles beside lit lotus tealights",
        blurb:
          "Rose-shaped candles with a soft, sweet honey scent. Calm and gentle, made to be lit for someone you love.",
      },
    ] as Candle[],
  },
  benefits: {
    eyebrow: "Why beeswax",
    title: "The candle, only purer.",
    factValue: 33000000,
    factLabel: "flower visits, roughly, for bees to make a single kilo of beeswax.",
    factAfter: "Every Kiribee candle starts there.",
    beeHint: "Move your cursor, a bee will follow",
    items: [
      { icon: "flame", title: "Longer burn", body: "Beeswax burns slower and cleaner than paraffin. The same candle, more evenings." },
      { icon: "leaf", title: "Eco-friendly", body: "A natural by-product of beekeeping. No petroleum, no synthetic dyes." },
      { icon: "feather", title: "Hypoallergenic", body: "No chemical compounds. Safe to breathe near sleeping children, pets and quiet evenings." },
      { icon: "hand", title: "Made by hand", body: "Every candle is poured, demoulded and finished by hand by Ana and Aldo in Tirana." },
      { icon: "shield", title: "Pure and honest", body: "100% Albanian beeswax. No fillers, no fragrance oils, no shortcuts. Just wax and a wick." },
    ],
  },
  process: {
    eyebrow: "The process",
    title: "From the hive, slowly, by hand.",
    subtitle: "Five quiet steps. No shortcuts.",
    steps: [
      { title: "Filter the wax", body: "We start with raw Albanian beeswax and patiently filter out every impurity until it runs clear and golden.", spec: "Raw Albanian wax" },
      { title: "Melt it slowly", body: "The wax is melted gently at the right temperature, never rushed. Heat is the difference between a candle and a craft.", spec: "Melts at 62 to 64 °C" },
      { title: "Pour the mould", body: "A pure cotton wick goes into the mould, then the wax is poured in one calm motion.", spec: "Pure cotton wick" },
      { title: "Let it rest", body: "Hours of stillness. The wax cools, hardens and takes on the shape of the mould.", spec: "Hours of stillness" },
      { title: "A dash of love", body: "We carefully demould each piece and finish it by hand: a painting, a dedication, the small touch that makes it yours.", spec: "Painted, dedicated, yours" },
    ],
  },
  burn: {
    title: "Too beautiful to burn?",
    body: "We hear it often. Many of you keep our candles on a shelf and never dare to light them. So we also pour beeswax into glasses: all of the light, none of the heartbreak.",
    hint: "Move the light to look closer",
    imageAlt: "Muse face plaque candles with gold leaf, revealed by a moving circle of candlelight",
  },
  story: {
    eyebrow: "Our story",
    title: "A quiet workshop, two pairs of hands and a lot of patience.",
    p1: "I'm Ana. I studied finance, but art has always been the thing that pulls me away from the everyday. During the pandemic, Aldo and I taught ourselves to work with beeswax, hour after hour, until the wax finally started to cooperate.",
    p2: "We noticed there were almost no real beeswax candles in Albania, so we decided to make them ourselves. Today every Kiribee candle is poured by hand in Tirana from 100% Albanian beeswax. No chemicals, no shortcuts, no compromises.",
    p3: "Aldo is my partner in everything, the second pair of hands that keeps the workshop running. Our wish is simple: that you slow down for a moment, light a candle and let the room soften around you.",
    signature: "with love, Ana",
    quote: "It may seem like a small thing, but the benefits for health and mind are impressive.",
    credit: "Ana & Aldo · As featured in",
    creditSource: "The Albania Insider",
    photoAlt: "Ana, co-founder of Kiribee, photographed in Tirana",
    factsTitle: "A few things about me",
    facts: [
      { icon: "graduation", label: "Studies", text: "I graduated in Banking and Financial Management." },
      { icon: "palette", label: "Art", text: "Art is my hobby, the only thing that pulls me out of everyday routine." },
      { icon: "sparkles", label: "Taurus", text: "Calm by nature, like a true Taurus, but I love changing my surroundings often." },
      { icon: "plane", label: "Travel", text: "Completely hooked on travelling." },
      { icon: "mountain", label: "Colours", text: "My favourite colours are the earth tones." },
      { icon: "film", label: "Films", text: "My favourite genres are thriller and mystery." },
    ],
  },
  wraps: {
    eyebrow: "Beyond the candle",
    title: "Beeswax food wraps.",
    lede: "A reusable, washable alternative to plastic wrap. Cotton soaked in beeswax, tree resin and jojoba oil. Warm it in your hands and fold it around cheese, fruit or bread.",
    cta: "Ask about wraps",
    alt: "Kiribee beeswax food wraps, patterned cotton cloth around lemon and cucumber slices",
    items: [
      { title: "Reusable", body: "Up to a year of use. Rinse with cool water and mild soap, let it dry, and use it again." },
      { title: "Naturally antibacterial", body: "Beeswax does the work, keeping cheese, fruit, vegetables and sandwiches fresh for longer." },
      { title: "Plastic-free", body: "Cotton, beeswax, tree resin and jojoba oil. When a wrap finally retires, it biodegrades completely." },
      { title: "Eco-friendly", body: "One wrap replaces hundreds of metres of plastic film over its lifetime. A small thing, a real difference." },
      { title: "Pet-friendly", body: "No phthalates, no synthetic fragrance, no chemical compounds. Safe in kitchens with curious paws." },
    ],
  },
  gallery: {
    eyebrow: "Gallery",
    title: "The workshop, the wax, the warm light.",
    cta: "See more on Instagram",
    items: [
      { ...G("01"), alt: "Beeswax couple-figure candle held in two hands, a wedding gift" },
      { ...G("02"), alt: "Christmas candles from Kiribee: a reindeer, an ornament and a little tree" },
      { ...G("03"), alt: "Mushroom-shaped candle glass among lit beeswax candles" },
      { ...G("04", 1080, 1080), alt: "Beeswax candles shaped like the eagle of the Albanian flag" },
      { ...G("05"), alt: "Two alpaca-shaped beeswax candles" },
      { ...G("06"), alt: "Personalised teddy-bear beeswax candle" },
      { ...G("07"), alt: "Sculptural Kiribee candles, too pretty to burn (but go ahead)" },
      { ...G("08", 1080, 722), alt: "Knot-shaped beeswax candles beside red gerberas" },
      { ...G("09"), alt: "A little beeswax van carrying a Christmas tree, tied with a white ribbon" },
    ] as GalleryItem[],
  },
  contact: {
    eyebrow: "Contact",
    title: "Tell us what you have in mind.",
    subtitle: "Custom dedications, bulk orders, gifts or wraps. Write to us and Ana or Aldo will reply personally.",
    channelsTitle: "Or reach us directly",
    location: "Based in Tirana, shipping across Albania",
    email: "Email",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    facebook: "Facebook",
    form: {
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "you@example.com",
      message: "Message",
      messagePlaceholder: "What can we make for you?",
      submit: "Send message",
      submitting: "Sending…",
      successTitle: "Thank you",
      successBody: "Your message is on its way. We'll reply within a day or two.",
      errorTitle: "Something went wrong",
      errorBody: "Please try again, or write to us directly.",
      nameRequired: "Please tell us your name.",
      emailInvalid: "Please enter a valid email address.",
      messageShort: "Please write a few words about what you'd like.",
      captchaRequired: "Please tick the “I'm not a robot” box.",
      prefill: "Hi! I'd love to learn more about {candle}.",
    },
  },
  goodnight: {
    title: "Goodnight.",
    body: "Blow out the candle, or let it burn a little longer.",
    blow: "Blow out the candle",
    relight: "Light it again",
    out: "Sweet dreams. Come back soon.",
  },
  footer: {
    brandline: "Crafted by Albanian bees",
    tagline: "Hand-poured beeswax candles from Tirana, Albania.",
    explore: "Explore",
    hello: "Say hello",
    rights: "All rights reserved.",
    credit: "developed by",
    backToTop: "Back to top",
  },
};

export type Copy = typeof en;

const sq: Copy = {
  skip: "Kalo te përmbajtja",
  wordmarkLabel: "Kiribee, kthehu në fillim",
  langLabel: "Gjuha",
  nav: {
    collection: "Koleksioni",
    process: "Procesi",
    story: "Historia",
    wraps: "Mbështjellëset",
    gallery: "Galeria",
    contact: "Kontakt",
    order: "Porosit",
    menu: "Menu",
  },
  chapters: {
    morning: "Mëngjesi",
    midday: "Mesdita",
    golden: "Ora e artë",
    dusk: "Muzgu",
    night: "Nata",
  },
  hero: {
    eyebrow: "Qirinj me dyll blete, punuar me dorë në Tiranë",
    title: "Crafted by",
    titleAccent: "Albanian bees.",
    lede: "Qirinj të derdhur me dorë, nga dylli i pastër i bletëve shqiptare. Të qetë, të artë dhe pak të gjallë.",
    ctaPrimary: "Shiko koleksionin",
    ctaSecondary: "Porosit një qiri",
    plaqueTitle: "Jepi dritë jetës tënde",
    plaqueHint: "Afrohuni pranë flakës dhe shihni si lëkundet",
    ring: "100% dyll blete shqiptar · derdhur me dorë në Tiranë · ",
  },
  band: [
    { icon: "flower", label: "100% dyll blete shqiptar" },
    { icon: "hand", label: "Derdhur me dorë në Tiranë" },
    { icon: "feather", label: "Hipoalergjenik" },
    { icon: "heart", label: "Kushtime personale" },
    { icon: "truck", label: "Dërgesa në gjithë Shqipërinë" },
  ],
  collection: {
    eyebrow: "Koleksioni",
    title: "Disa nga qirinjtë tanë më të dashur.",
    subtitle:
      "Një përzgjedhje e vogël e punimeve tona. Na shkruani për përmasat, kushtimet dhe porositë sipas dëshirës.",
    badge: "Më i shituri",
    inquire: "Na pyet",
    material: "Dyll blete, fitil pambuku",
    no: "Nr.",
    of: "nga",
    candles: [
      {
        slug: "beequite",
        name: "BeeQuite",
        image: CANDLE_IMAGES.beequite,
        alt: "BeeQuite, qiri me dyll blete në formën e një dore që mban një fëmijë",
        blurb:
          "Pjesa jonë më e dashur. Një dorë që mban një fëmijë, një homazh i qetë për lidhjen e pathyeshme mes nënës dhe fëmijës.",
        signature: true,
      },
      {
        slug: "minerva",
        name: "Minerva",
        image: CANDLE_IMAGES.minerva,
        alt: "Minerva, qiri me bustin e perëndeshës romake, mes dy qirinjve në formë kolone",
        blurb:
          "Perëndesha romake e mençurisë, e derdhur në dyll blete të pastër, për të sjellë ngrohtësi, qetësi dhe mendje të kthjellët në shtëpinë tuaj.",
      },
      {
        slug: "embrace",
        name: "Embrace",
        image: CANDLE_IMAGES.embrace,
        alt: "Embrace, dy figura me dyll blete me zemra të kuqe",
        blurb:
          "Një çift, një familje, një fillim i ri. Personalizohet me emrat që doni dhe është dhurata jonë më e kërkuar për dasma e përvjetorë.",
      },
      {
        slug: "muse",
        name: "Muse",
        image: CANDLE_IMAGES.muse,
        alt: "Muse, qirinj me pllaka fytyrash dhe fletë ari të vendosura me dorë",
        blurb:
          "Pllaka me fytyra, të përfunduara me dorë me fletë ari. Pjesa jonë më artistike: një skulpturë e vogël që mund ta ndizni.",
      },
      {
        slug: "bloom",
        name: "Bloom",
        image: CANDLE_IMAGES.bloom,
        alt: "Bloom, qirinj në formë trëndafili pranë qirinjve të ndezur në mbajtëse lotusi",
        blurb:
          "Qirinj në formë trëndafili, me aromë të butë e të ëmbël mjalti. Të qetë dhe delikatë, për t'u ndezur për dikë që doni.",
      },
    ],
  },
  benefits: {
    eyebrow: "Pse dylli i bletës",
    title: "Qiriri, në formën e tij më të pastër.",
    factValue: 33000000,
    factLabel: "vizita në lule, afërsisht, u duhen bletëve për të prodhuar vetëm një kilogram dyll.",
    factAfter: "Çdo qiri Kiribee nis prej aty.",
    beeHint: "Lëvizni kursorin, një bletë do t'ju ndjekë",
    items: [
      { icon: "flame", title: "Digjet më gjatë", body: "Dylli i bletës digjet më ngadalë dhe më pastër se parafina. I njëjti qiri, më shumë mbrëmje." },
      { icon: "leaf", title: "Miqësor me natyrën", body: "Një nënprodukt natyral i bletarisë. Pa naftë dhe pa ngjyrues sintetikë." },
      { icon: "feather", title: "Hipoalergjenik", body: "Pa përbërës kimikë. I sigurt pranë fëmijëve që flenë, kafshëve shtëpiake dhe mbrëmjeve të qeta." },
      { icon: "hand", title: "Punuar me dorë", body: "Çdo qiri derdhet, nxirret nga kallëpi dhe përfundohet me dorë nga Ana dhe Aldo në Tiranë." },
      { icon: "shield", title: "I pastër dhe i ndershëm", body: "100% dyll blete shqiptar. Pa mbushës, pa vajra aromatikë, pa shkurtesa. Vetëm dyll dhe fitil." },
    ],
  },
  process: {
    eyebrow: "Procesi",
    title: "Nga kosheri, ngadalë dhe me dorë.",
    subtitle: "Pesë hapa të qetë. Pa shkurtesa.",
    steps: [
      { title: "Filtrojmë dyllin", body: "Nisim me dyll blete shqiptar të papërpunuar dhe me durim i heqim çdo papastërti, derisa të bëhet i kthjellët dhe i artë.", spec: "Dyll shqiptar i papërpunuar" },
      { title: "E shkrijmë ngadalë", body: "Dylli shkrihet butë, në temperaturën e duhur, pa u nxituar. Pikërisht nxehtësia e bën dallimin mes një qiriu të zakonshëm dhe një punimi artizanal.", spec: "Shkrihet në 62 deri 64 °C" },
      { title: "E derdhim në kallëp", body: "Vendosim në kallëp një fitil prej pambuku të pastër dhe e derdhim dyllin me një lëvizje të qetë.", spec: "Fitil pambuku i pastër" },
      { title: "E lëmë të pushojë", body: "Orë të tëra qetësie. Dylli ftohet, ngurtësohet dhe merr formën e kallëpit.", spec: "Orë të tëra qetësie" },
      { title: "Pak dashuri", body: "E nxjerrim me kujdes çdo punim nga kallëpi dhe e përfundojmë me dorë: një pikturë, një kushtim, ajo prekje e vogël që e bën tëndin.", spec: "I pikturuar, i kushtuar, i yti" },
    ],
  },
  burn: {
    title: "Shumë i bukur për ta ndezur?",
    body: "Na e thoni shpesh. Shumë prej jush i mbajnë qirinjtë tanë në raft dhe nuk guxojnë t'i ndezin. Prandaj e derdhim dyllin e bletës edhe në gota: e gjithë drita, pa asnjë keqardhje.",
    hint: "Lëvizni dritën për ta parë më nga afër",
    imageAlt: "Qirinjtë Muse me pllaka fytyrash dhe fletë ari, të ndriçuar nga drita e një qiriu që lëviz",
  },
  story: {
    eyebrow: "Historia jonë",
    title: "Një punishte e qetë, dy palë duar dhe shumë durim.",
    p1: "Unë jam Ana. Kam studiuar për financë, por arti ka qenë gjithmonë ajo që më largon nga rutina e përditshme. Gjatë pandemisë, bashkë me Aldon, mësuam vetë si të punojmë me dyllin e bletës, orë pas ore, derisa më në fund dylli filloi të na bindej.",
    p2: "Vumë re se në Shqipëri nuk kishte pothuajse fare qirinj të vërtetë me dyll blete, ndaj vendosëm t'i bëjmë vetë. Sot çdo qiri Kiribee derdhet me dorë në Tiranë, nga dylli 100% i bletëve shqiptare. Pa kimikate, pa shkurtesa, pa kompromise.",
    p3: "Aldo është partneri im në gjithçka, dora e dytë që e mban punishten në këmbë. Dëshira jonë është e thjeshtë: të ndaleni për një çast, të ndizni një qiri dhe ta lini dhomën të zbutet rreth jush.",
    signature: "me dashuri, Ana",
    quote: "Mund të duket si diçka e vogël, por përfitimet për shëndetin dhe mendjen janë mbresëlënëse.",
    credit: "Ana & Aldo · Botuar në",
    creditSource: "The Albania Insider",
    photoAlt: "Ana, bashkëthemeluesja e Kiribee, e fotografuar në Tiranë",
    factsTitle: "Disa gjëra për mua",
    facts: [
      { icon: "graduation", label: "Studimet", text: "Jam diplomuar për Menaxhim Bankar dhe Financiar." },
      { icon: "palette", label: "Arti", text: "Arti është hobi im, i vetmi që më largon nga monotonia e përditshme." },
      { icon: "sparkles", label: "Demi", text: "Jam e qetë nga natyra, si çdo Dem, por më pëlqen ta ndryshoj shpesh ambientin." },
      { icon: "plane", label: "Udhëtimet", text: "Jam e fiksuar pas udhëtimeve." },
      { icon: "mountain", label: "Ngjyrat", text: "Ngjyrat e mia të preferuara janë ato të tokës." },
      { icon: "film", label: "Filmat", text: "Zhanret e mia të preferuara janë thriller dhe mister." },
    ],
  },
  wraps: {
    eyebrow: "Përtej qiririt",
    title: "Mbështjellëse ushqimi me dyll blete.",
    lede: "Alternativa natyrale dhe e ripërdorshme e plastikës ushqimore. Pambuk i ngjyer në dyll blete, rrëshirë pemësh dhe vaj jojoba. E ngrohni pak me duar dhe e mbështillni rreth djathit, frutave apo bukës.",
    cta: "Pyet për mbështjellëset",
    alt: "Mbështjellëse ushqimi Kiribee me dyll blete, pëlhurë pambuku me motive rreth fetave të limonit dhe kastravecit",
    items: [
      { title: "Të ripërdorshme", body: "Deri në një vit përdorim. Shpëlajini me ujë të ftohtë dhe sapun të butë, lërini të thahen dhe përdorini sërish." },
      { title: "Antibakteriale natyrale", body: "Dylli i bletës e bën vetë punën: djathi, frutat, perimet dhe sanduiçet qëndrojnë të freskëta më gjatë." },
      { title: "Pa plastikë", body: "Pambuk, dyll blete, rrëshirë pemësh dhe vaj jojoba. Kur mbështjellësja del nga përdorimi, dekompozohet plotësisht në natyrë." },
      { title: "Miqësore me mjedisin", body: "Një mbështjellëse zëvendëson qindra metra plastikë gjatë jetës së saj. Gjë e vogël, ndryshim i vërtetë." },
      { title: "Miqësore me kafshët", body: "Pa ftalate, pa aroma sintetike, pa përbërës kimikë. E sigurt edhe në kuzhinat me putra kureshtare." },
    ],
  },
  gallery: {
    eyebrow: "Galeria",
    title: "Punishtja, dylli dhe drita e ngrohtë.",
    cta: "Shiko më shumë në Instagram",
    items: [
      { ...G("01"), alt: "Qiri me dyll blete në formë çifti, i mbajtur në duar, dhuratë për dasmë" },
      { ...G("02"), alt: "Qirinj Krishtlindjesh nga Kiribee: një dre, një zbukurim dhe një pemë e vogël" },
      { ...G("03"), alt: "Gotë qiri në formë kërpudhe mes qirinjve të ndezur me dyll blete" },
      { ...G("04", 1080, 1080), alt: "Qirinj me dyll blete në formën e shqiponjës së flamurit shqiptar" },
      { ...G("05"), alt: "Dy qirinj me dyll blete në formë alpake" },
      { ...G("06"), alt: "Qiri me dyll blete në formë arushi Teddy, i personalizuar" },
      { ...G("07"), alt: "Qirinj skulpturorë Kiribee, shumë të bukur për t'i ndezur (por ndizini pa merak)" },
      { ...G("08", 1080, 722), alt: "Qirinj me dyll blete në formë nyje, pranë gerberave të kuqe" },
      { ...G("09"), alt: "Një furgon i vogël me dyll blete që mbart një pemë Krishtlindjesh, i lidhur me fjongo të bardhë" },
    ],
  },
  contact: {
    eyebrow: "Kontakt",
    title: "Na tregoni çfarë keni në mendje.",
    subtitle: "Kushtime të personalizuara, porosi në sasi, dhurata apo mbështjellëse. Na shkruani dhe Ana ose Aldo do t'ju përgjigjen personalisht.",
    channelsTitle: "Ose na kontaktoni drejtpërdrejt",
    location: "Jemi në Tiranë dhe dërgojmë në të gjithë Shqipërinë",
    email: "Email",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    facebook: "Facebook",
    form: {
      name: "Emri",
      namePlaceholder: "Emri juaj",
      email: "Email",
      emailPlaceholder: "ju@shembull.com",
      message: "Mesazhi",
      messagePlaceholder: "Çfarë mund të krijojmë për ju?",
      submit: "Dërgo mesazhin",
      submitting: "Po dërgohet…",
      successTitle: "Faleminderit",
      successBody: "Mesazhi juaj u dërgua. Do t'ju përgjigjemi brenda një ose dy ditësh.",
      errorTitle: "Diçka nuk shkoi mirë",
      errorBody: "Ju lutemi provoni sërish ose na shkruani drejtpërdrejt.",
      nameRequired: "Ju lutemi shkruani emrin tuaj.",
      emailInvalid: "Ju lutemi shkruani një adresë email të vlefshme.",
      messageShort: "Ju lutemi shkruani disa fjalë se çfarë dëshironi.",
      captchaRequired: "Ju lutemi konfirmoni që nuk jeni robot.",
      prefill: "Përshëndetje! Do të doja të dija më shumë për {candle}.",
    },
  },
  goodnight: {
    title: "Natën e mirë.",
    body: "Fikeni qiririn, ose lëreni të digjet edhe pak.",
    blow: "Fike qiririn",
    relight: "Ndize përsëri",
    out: "Ëndrra të ëmbla. Ju presim përsëri.",
  },
  footer: {
    brandline: "Crafted by Albanian bees",
    tagline: "Qirinj me dyll blete, të derdhur me dorë në Tiranë.",
    explore: "Eksploro",
    hello: "Na shkruani",
    rights: "Të gjitha të drejtat e rezervuara.",
    credit: "zhvilluar nga",
    backToTop: "Kthehu lart",
  },
};

export function getCopy(locale: Locale): Copy {
  return locale === "sq" ? sq : en;
}
