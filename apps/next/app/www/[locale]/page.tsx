import type { Metadata } from "next";

import { createMetadata } from "@azem/config/metadata";
import { $t, getDictionary } from "@azem/locale";
import { Container } from "@azem/ui/components/layout/container";
import { Main } from "@azem/ui/components/layout/main";

export async function generateMetadata(): Promise<Metadata> {
  return createMetadata({ title: "Welcome", description: "..." });
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

async function Page({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return (
    <Main className="flex min-h-screen flex-col items-center justify-center">
      <Container className="flex flex-col items-center justify-center gap-8 opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
        <h1 className="text-7xl font-bold">{$t(dict.common.greeting, { name: "Mau" })}</h1>
      </Container>
    </Main>
  );
}

export default Page;
