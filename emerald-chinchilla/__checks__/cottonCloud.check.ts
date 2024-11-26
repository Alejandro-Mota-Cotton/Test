import { BrowserCheck, CheckGroup, Frequency } from "checkly/constructs";
import * as path from "path";
import { emailChannel } from "../checkly.config";
const CottonCloudGroup = new CheckGroup("Cotton_Cloud_Group", {
  name: "Cotton Cloud",
  locations: ["us-west-1"],
  frequency: Frequency.EVERY_12H,
  alertChannels: [emailChannel],
});

new BrowserCheck("Login_test", {
  name: "Cotton Cloud - Login 1",
  group: CottonCloudGroup,
  locations: ["us-west-1"],
  code: {
    entrypoint: path.join(__dirname, "cotton_cloud/login.spec.ts"),
  },
});

new BrowserCheck("Input_fields", {
  name: "Cotton Cloud - Playground - Input fields",
  group: CottonCloudGroup,
  locations: ["us-west-1"],
  code: {
    entrypoint: path.join(__dirname, "cotton_cloud/inputs.spec.ts"),
  },
});

new BrowserCheck("Data_grid", {
  name: "Cotton Cloud - Playground - Data grid",
  group: CottonCloudGroup,
  locations: ["us-west-1"],
  code: {
    entrypoint: path.join(__dirname, "cotton_cloud/data_grid.spec.ts"),
  },
});
