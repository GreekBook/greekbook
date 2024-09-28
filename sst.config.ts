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
        link: [database],
	domain: "headlinerai.net",
	vpc
    });
  },
});
