/** @type { import("drizzle-kit").Config } */

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    schema: "./src/db/schema.ts",
    dialect: 'postgresql',
    dbCredentials: {
      url: process.env.DATABASE_URL,
    }
  };