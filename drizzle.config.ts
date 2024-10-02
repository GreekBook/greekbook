import { defineConfig } from "drizzle-kit";
import { Resource } from "sst";

export default defineConfig({
  driver: "aws-data-api",
  dialect: "postgresql",
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    database: Resource.VibePassDB.database,
    secretArn: Resource.VibePassDB.secretArn,
    resourceArn: Resource.VibePassDB.clusterArn,
  },
});
