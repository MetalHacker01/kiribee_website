export type GalleryItem = {
  src: string;
  width: number;
  height: number;
  alt: { en: string; sq: string };
  href?: string;
};

export const GALLERY: GalleryItem[] = [
  { src: "/images/gallery/01.jpg", width: 1080, height: 1080, alt: { en: "Beeswax couple-figure candles, a wedding gift", sq: "Qirinj çift me dyll bleta, dhuratë dasme" } },
  { src: "/images/gallery/02.jpg", width: 1080, height: 1080, alt: { en: "Christmas-collection candle from Kiribee", sq: "Qiri nga koleksioni i Krishtlindjeve i Kiribee" } },
  { src: "/images/gallery/03.jpg", width: 1080, height: 1080, alt: { en: "Mushroom-shaped beeswax candle in a glass, practical and pretty", sq: "Qiri me dyll bleta në formë kërpudhe brenda një gote, praktik dhe i bukur" } },
  { src: "/images/gallery/04.jpg", width: 1080, height: 1080, alt: { en: "Beeswax candle in the shape of the Albanian flag", sq: "Qiri me dyll bleta në formën e flamurit shqiptar" } },
  { src: "/images/gallery/05.jpg", width: 1080, height: 1080, alt: { en: "Alpaca-shaped beeswax candle", sq: "Qiri me dyll bleta në formë alpake" } },
  { src: "/images/gallery/06.jpg", width: 1080, height: 1080, alt: { en: "Personalized teddy-bear beeswax candle", sq: "Qiri me dyll bleta i personalizuar në formë arushe Teddy" } },
  { src: "/images/gallery/07.jpg", width: 1080, height: 1080, alt: { en: "Sculptural Kiribee candle, too pretty to burn (but go ahead)", sq: "Qiri skulpturor Kiribee, shumë i bukur për t'u djegur (por mos u përmbaj)" } },
  { src: "/images/gallery/08.jpg", width: 1080, height: 1080, alt: { en: "Lit beeswax candle in a quiet evening", sq: "Qiri i ndezur me dyll bleta në një mbrëmje të qetë" } },
  { src: "/images/gallery/09.jpg", width: 1080, height: 1080, alt: { en: "Kiribee Christmas collection, workshop spread", sq: "Koleksioni i Krishtlindjeve nga Kiribee, punishtja" } },
];
