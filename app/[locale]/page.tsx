import { setRequestLocale } from "next-intl/server";
import { HomePage } from "@/components/home/HomePage";
import type { Locale } from "@/components/home/copy";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomePage locale={locale as Locale} />;
}
