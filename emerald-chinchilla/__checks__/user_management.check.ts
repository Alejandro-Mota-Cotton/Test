// Documentation: https://github.com/Alejandro-Mota-Cotton/Test/wiki/'User-Management'-module
import { BrowserCheck, CheckGroup, Frequency } from "checkly/constructs";
import * as path from "path";
import { emailChannel } from "../checkly.config";

const CottonCloudGroup = new CheckGroup("Cotton_Cloud_Group_User_Management", {
  name: "User Management",
  tags: ["User Management Module"],
  locations: ["us-west-1"],
  frequency: Frequency.EVERY_24H,
  alertChannels: [emailChannel],
});

new BrowserCheck("RouteAccess", {
  name: "User Management - Routte Access",
  group: CottonCloudGroup,
  locations: ["us-west-1"],
  code: {
    entrypoint: path.join(__dirname, "user_management/1_RouteAccess.spec.ts"),
  },
});

new BrowserCheck("LandingPage", {
  name: "User Management - Landing Page",
  group: CottonCloudGroup,
  locations: ["us-west-1"],
  code: {
    entrypoint: path.join(__dirname, "user_management/2_LandingPage.spec.ts"),
  },
});

new BrowserCheck("GridTests", {
  name: "User Management - Grid Tests",
  group: CottonCloudGroup,
  locations: ["us-west-1"],
  code: {
    entrypoint: path.join(__dirname, "user_management/3_GridTests.spec.ts"),
  },
});

new BrowserCheck("UserDetails", {
  name: "User Management - User Details",
  group: CottonCloudGroup,
  locations: ["us-west-1"],
  code: {
    entrypoint: path.join(__dirname, "user_management/4_UserDetails.spec.ts"),
  },
});

new BrowserCheck("RoleManagement", {
  name: "User Management - Role Management",
  group: CottonCloudGroup,
  locations: ["us-west-1"],
  code: {
    entrypoint: path.join(
      __dirname,
      "user_management/5_RoleManagement.spec.ts"
    ),
  },
});

new BrowserCheck("DataModification", {
  name: "User Management - Data Modification",
  group: CottonCloudGroup,
  locations: ["us-west-1"],
  code: {
    entrypoint: path.join(
      __dirname,
      "user_management/6_DataModification.spec.ts"
    ),
  },
});

new BrowserCheck("DocumentsManagement", {
  name: "User Management - Documents Management",
  group: CottonCloudGroup,
  locations: ["us-west-1"],
  code: {
    entrypoint: path.join(
      __dirname,
      "user_management/7_DocumentsManagement.spec.ts"
    ),
  },
});

new BrowserCheck("NotesManagement", {
  name: "User Management - Notes Management",
  group: CottonCloudGroup,
  locations: ["us-west-1"],
  code: {
    entrypoint: path.join(
      __dirname,
      "user_management/8_NotesManagement.spec.ts"
    ),
  },
});

new BrowserCheck("HistoryTracking", {
  name: "User Management - History Tracking",
  group: CottonCloudGroup,
  locations: ["us-west-1"],
  code: {
    entrypoint: path.join(
      __dirname,
      "user_management/9_HistoryTracking.spec.ts"
    ),
  },
});
