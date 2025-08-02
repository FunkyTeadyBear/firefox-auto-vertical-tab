import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  imports: false,
  srcDir: "src",
  manifest: {
    name: "Auto Toggle Vertical Tab",
    permissions: ["browserSettings", "storage"],
    browser_specific_settings: {
      gecko: {
        id: "{b7eef7b5-1504-4fe1-a48b-3d08859a7761}",
      },
    },
  },
  webExt: {
    firefoxArgs: ["--start-url", "about:debugging#/runtime/this-firefox"],
  },
});
