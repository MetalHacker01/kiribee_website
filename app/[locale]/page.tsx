import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { Story } from "@/components/sections/Story";
import { About } from "@/components/sections/About";
import { Benefits } from "@/components/sections/Benefits";
import { Process } from "@/components/sections/Process";
import { FeaturedCandles } from "@/components/sections/FeaturedCandles";
import { Wraps } from "@/components/sections/Wraps";
import { Gallery } from "@/components/sections/Gallery";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Story />
      <About />
      <Benefits />
      <Process />
      <FeaturedCandles />
      <Wraps />
      <Gallery />
      <Contact />
      <Footer locale={locale} />
    </>
  );
}
