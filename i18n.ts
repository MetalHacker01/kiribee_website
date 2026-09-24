import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

export const locales = ["en", "sq"] as const;
export type Locale = (typeof locales)[number];
// Albanian first: the business and most of its customers are in Albania.
export const defaultLocale: Locale = "sq";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }
  try {
    return {
      locale,
      messages: (await import(`./messages/${locale}.json`)).default,
    };
  } catch {
    notFound();
  }
});
