import { defineConfig } from "checkly";

import { EmailAlertChannel } from "checkly/constructs";

export const emailChannel = new EmailAlertChannel("Linear-Mail-report", {
  address: "apps-148206045898@intake.linear.app",
  // address: "alejandro.mota@cottonteam.com",
  sendRecovery: false,
  sendFailure: true,
  sendDegraded: false,
  sslExpiry: false,
});

/**
 * See https://www.checklyhq.com/docs/cli/project-structure/
 */
const config = defineConfig({
  /* A human friendly name for your project */
  projectName: "Cotton Cloud Tests",
  /** A logical ID that needs to be unique across your Checkly account,
   * See https://www.checklyhq.com/docs/cli/constructs/ to learn more about logical IDs.
   */
  logicalId: "CottonChecklyTest-project",
  /* An optional URL to your Git repo */
  repoUrl: "https://github.com/cottonholdings/cotton_cloud_checkly",
  /* Sets default values for Checks */
  checks: {
    /* A default for how often your Check should run in minutes */
    frequency: 10,
    /* Checkly data centers to run your Checks as monitors */
    locations: ["us-east-1"],
    /* An optional array of tags to organize your Checks */
    tags: ["Cotton Cloud"],
    /** The Checkly Runtime identifier, determining npm packages and the Node.js version available at runtime.
     * See https://www.checklyhq.com/docs/cli/npm-packages/
     */
    runtimeId: "2024.02",
    /* A glob pattern that matches the Checks inside your repo, see https://www.checklyhq.com/docs/cli/using-check-test-match/ */
    checkMatch: "**/__checks__/**/*.check.ts",
    /* Global configuration option for Playwright-powered checks. See https://docs/browser-checks/playwright-test/#global-configuration */
    playwrightConfig: {},
    browserChecks: {
      /* A glob pattern matches any Playwright .spec.ts files and automagically creates a Browser Check. This way, you
       * can just write native Playwright code. See https://www.checklyhq.com/docs/cli/using-check-test-match/
       * */
      testMatch: "**/__checks__/**/*.spec.ts",
      // alertChannels: [mail_alert],
    },
  },
  cli: {
    /* The default datacenter location to use when running npx checkly test */
    runLocation: "us-east-1",
    /* An array of default reporters to use when a reporter is not specified with the "--reporter" flag */
    reporters: ["list"],
    /* How many times to retry a failing test run when running `npx checkly test` or `npx checkly trigger` (max. 3) */
    retries: 0,
  },
});

export default config;
