import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  weight: ["400", "700", "800"],
  display: "swap",
});

const SITE_URL = "https://www.naseim.com";
const SITE_TITLE = "تقنية النسيم للتبريد والتكييف";
const SITE_DESC =
  "تقنية النسيم للتبريد والتكييف - خدمات صيانة وتنظيف وتعبئة غاز المكيفات في القصيم. عمالة مختصة، قطع غيار أصلية، وضمان حقيقي.";
const SITE_DESC_OG =
  "خدمات صيانة وتنظيف وتعبئة غاز المكيفات في القصيم. عمالة مختصة وضمان حقيقي.";
const SITE_DESC_TWITTER = "خدمات صيانة وتنظيف وتعبئة غاز المكيفات في القصيم.";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
const PHONE = "+966541701841";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESC,
  keywords: [
    "تقنية النسيم",
    "تبريد",
    "تكييف",
    "صيانة مكيفات",
    "تنظيف مكيفات",
    "القصيم",
    "فريون",
    "غاز التبريد",
  ],
  authors: [{ name: "تقنية النسيم" }],
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL + "/" },
  openGraph: {
    type: "website",
    url: SITE_URL + "/",
    title: SITE_TITLE,
    description: SITE_DESC_OG,
    images: [OG_IMAGE],
    locale: "ar_SA",
    siteName: "تقنية النسيم",
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESC_TWITTER,
    images: [OG_IMAGE],
  },
  icons: {
    icon: { url: "/favicon.svg?v=3", type: "image/svg+xml" },
    apple: "/favicon.svg?v=3",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": SITE_URL + "/#org",
      name: SITE_TITLE,
      url: SITE_URL + "/",
      logo: SITE_URL + "/favicon.svg",
      image: OG_IMAGE,
      telephone: PHONE,
    },
    {
      "@type": "LocalBusiness",
      "@id": SITE_URL + "/#localbusiness",
      name: SITE_TITLE,
      description: SITE_DESC,
      url: SITE_URL + "/",
      image: OG_IMAGE,
      inLanguage: "ar",
      telephone: PHONE,
      address: {
        "@type": "PostalAddress",
        addressCountry: "SA",
        addressRegion: "القصيم",
      },
      areaServed: { "@type": "AdministrativeArea", name: "القصيم" },
    },
    {
      "@type": "WebSite",
      "@id": SITE_URL + "/#website",
      url: SITE_URL + "/",
      name: SITE_TITLE,
      inLanguage: "ar",
      publisher: { "@id": SITE_URL + "/#org" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} antialiased`}
    >
      <body className="font-sans bg-white text-slate-800">
        {children}
        <noscript>
          <div
            style={{
              padding: 24,
              maxWidth: 800,
              margin: "0 auto",
              direction: "rtl",
              textAlign: "right",
              lineHeight: 1.7,
              color: "#1f2937",
            }}
          >
            <h1 style={{ margin: "0 0 12px" }}>{SITE_TITLE}</h1>
            <p>{SITE_DESC}</p>
            <p>
              <a href={SITE_URL + "/"} rel="canonical">
                انتقل إلى الموقع الرئيسي
              </a>
            </p>
            <p style={{ marginTop: 24, fontSize: "0.9em", color: "#6b7280" }}>
              لعرض الموقع بالكامل يُرجى تفعيل JavaScript في المتصفح.
            </p>
          </div>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
