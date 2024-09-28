import { defineConfig } from "drizzle-kit";
import { Resource } from "sst";

export default defineConfig({
  driver: "aws-data-api",
  dialect: "postgresql",
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    database: Resource.GreekBookDB.database,
    secretArn: Resource.GreekBookDB.secretArn,
    resourceArn: Resource.GreekBookDB.clusterArn,
  },
});
