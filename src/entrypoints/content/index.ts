import { MessageType } from "@/types/message";
import { defineContentScript, ContentScriptContext, browser } from "#imports";

export default defineContentScript({
  matches: ["<all_urls>"],
  matchOriginAsFallback: true,
  runAt: "document_start",

  // Executed when content script is loaded, can be async
  async main(ctx: ContentScriptContext) {
    if (ctx.isValid) {
      browser.runtime.sendMessage("Opened a new tab").then(() => {
        window.addEventListener("resize", (event) => {
          const target = event.target as Window;
          const message: MessageType<number> = {
            changedItem: "window.outerWidth",
            newValue: target.outerWidth,
          };
          browser.runtime.sendMessage(message);
        });
      });
    }
  },
});
