import type { Metadata } from "next";

import { merge } from "es-toolkit";

type MetadataGenerator = Omit<Metadata, "description" | "title"> & {
  title: string;
  description: string;
  image?: string;
  raw?: boolean;
};

const applicationName = process.env.NEXT_PUBLIC_NAME;
const author = { name: "Ingniius Co.", url: "https://ingnii.us/" };
const publisher = "NGII";
const twitterHandle = "@ingniius";
const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export function createMetadata({ title, description, image, raw = false, ...properties }: MetadataGenerator): Metadata {
  const parsedTitle = raw ? title : `${title} | ${applicationName}`;
  const metadata: Metadata = merge({
    metadataBase: productionUrl ? new URL(`${protocol}://${productionUrl}`) : undefined,
    title: parsedTitle,
    applicationName,
    description,
    publisher,
    authors: [author],
    creator: author.name,
    appleWebApp: { capable: true, statusBarStyle: "default", title: parsedTitle },
    openGraph: { title: parsedTitle, description, type: "website", siteName: applicationName, locale: "en_US" },
    formatDetection: { telephone: false },
    twitter: { card: "summary_large_image", creator: twitterHandle },
  }, properties);

  if (image && metadata.openGraph) {
    metadata.openGraph.images = [{ url: image, width: 1200, height: 630, alt: title }];
  }

  return metadata;
}
