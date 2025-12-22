import "dotenv/config"

import { defineConfig, env } from "prisma/config";

export default defineConfig({
    schema: "prisma/schema.prisma", // path to schema

    // defines path for migrations
    migrations: {
        path: "prisma/migrations",
        // seed: "tsx prisma/seed.ts" // command for seeding the database --> SEARCH: prisma 7 seeding database
    },

    // defines the link to the db
    datasource: {
        url: env("DATABASE_URL")
    },
})