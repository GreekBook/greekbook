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
    const vpc = new sst.aws.Vpc("GreekBookVPC");
    const database = new sst.aws.Postgres("GreekBookDB", { vpc });
    new sst.aws.Nextjs("GreekBook", {
        link: [database],
	domain: "headlinerai.net",
	vpc
    });
  },
});
