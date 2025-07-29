import { MessageType } from "@/types/message";
import { defineContentScript, ContentScriptContext, browser } from "#imports";

export default defineContentScript({
  matches: ["<all_urls>"],
  matchOriginAsFallback: true,

  // Executed when content script is loaded, can be async
  async main(ctx: ContentScriptContext) {
    if (ctx.isValid) {
      window.addEventListener("resize", (event) => {
        const target = event.target as Window;
        const message: MessageType = {
          outerWidth: target.outerWidth,
          outerHeight: target.outerHeight,
        };
        browser.runtime.sendMessage(message);
      });
    }
  },
});
