import { Resource } from "sst";
import { drizzle } from "drizzle-orm/aws-data-api/pg";
import { RDSDataClient } from "@aws-sdk/client-rds-data";
import * as schema from './schema';

export const db = drizzle(new RDSDataClient({region: "us-east-1"}), {
    database: Resource.VibePassDB.database,
    secretArn: Resource.VibePassDB.secretArn,
    resourceArn: Resource.VibePassDB.clusterArn,
    schema
});