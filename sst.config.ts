/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
    app(input) {
        return {
            name: "VibePass",
            removal: input?.stage === "production" ? "retain" : "remove",
            home: "aws",
        };
    },
    async run() {
        const vpc = new sst.aws.Vpc("VibePassVPC", {nat: "managed"});
        const database = new sst.aws.Postgres("VibePassDB", { vpc });
        const bucket = new sst.aws.Bucket("VibePassEventImages", {
            access: "public"
        });
        new sst.aws.Nextjs("VibePass", {
            link: [database, bucket],
            domain: "vibepass.net",
            vpc,
            environment: {
                AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET!,
                AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID!,
                AUTH_SECRET: process.env.AUTH_SECRET!,
                AUTH_REDIRECT_PROXY_URL: process.env.AUTH_REDIRECT_PROXY_URL!,
                VAPID_PRIVATE_KEY: process.env.VAPID_PRIVATE_KEY!,
                NEXT_PUBLIC_VAPID_PUBLIC_KEY: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
            }
        });
    },
});
