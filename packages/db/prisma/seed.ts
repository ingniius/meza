import { PrismaClient } from "../generated/client";

const prisma = new PrismaClient();

const initialPages = [
  { name: "Page 1" },
  { name: "Page 2" },
  { name: "Page 3" },
];

async function main() {
  // CLEAN UP
  await prisma.page.deleteMany();

  // PAGES
  for (const post of initialPages) {
    await prisma.page.create({ data: post });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
