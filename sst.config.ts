/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
    app(input) {
        return {
            name: "greekbook",
            removal: input?.stage === "production" ? "retain" : "remove",
            home: "aws",
        };
    },
    async run() {
        const vpc = new sst.aws.Vpc("GreekBookVPC", {nat: "managed"});
        const database = new sst.aws.Postgres("GreekBookDB", { vpc });
        const bucket = new sst.aws.Bucket("GreekBookOrgEventImages", {
            access: "public"
        });
        new sst.aws.Nextjs("GreekBook", {
            link: [database, bucket],
            domain: "headlinerai.net",
            vpc,
            environment: {
                AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET!,
                AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID!,
                AUTH_SECRET: process.env.AUTH_SECRET!,
                VAPID_PRIVATE_KEY: process.env.VAPID_PRIVATE_KEY!,
                NEXT_PUBLIC_VAPID_PUBLIC_KEY: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
            }
        });
    },
});
