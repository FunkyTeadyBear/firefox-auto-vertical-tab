import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  imports: false,
  srcDir: "src",
  manifest: {
    name: "Auto Toggle Vertical Tab",
    permissions: ["browserSettings", "storage"],
  },
  webExt: {
    firefoxArgs: ["--start-url", "about:debugging#/runtime/this-firefox"],
  },
});
