export default {
  schema: "./prisma/schema",
  migrations: {
    path: "./prisma/migrations",
    seed: "tsx ./prisma/seed.ts",
  },
};
