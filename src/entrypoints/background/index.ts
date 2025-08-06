import { browser, defineBackground, storage, StorageItemKey } from "#imports";
import { ConfigMessageType } from "@/types/message";
import { StorageType } from "@/types/storage";
import { STORAGE_DEFAULT } from "@/utils/storage_defaults";

export default defineBackground({
  // Set manifest options
  persistent: false,
  type: "module",

  // Executed when background is loaded, CANNOT BE ASYNC
  main() {
    // Assume that user agent cannot be modified by third parties in background scripts
    const userAgent = window.navigator.userAgent.match(/Firefox\/(\d+)/);
    const delay = 100;

    let interval: ReturnType<typeof setInterval> | null = null;
    const config: StorageType = {
      enabled: STORAGE_DEFAULT.enabled,
      widthThreshold: STORAGE_DEFAULT.widthThreshold,
    };

    if (userAgent === null) {
      console.error("Unknown user agent");
      return;
    } else if (parseInt(userAgent[1]) < 142) {
      console.error(
        `This extension requires Firefox 142 or higher. Your version: ${userAgent[1]}`,
      );
      return;
    }

    const toggleVerticalTab = () => {
      browser.windows.getLastFocused().then((window) => {
        if (window.width) {
          if (window.width <= config.widthThreshold) {
            // @ts-expect-error browserSettings does not exist in WxtBrowser
            browser.browserSettings.verticalTabs.set({ value: true });
          } else {
            // @ts-expect-error browserSettings does not exist in WxtBrowser
            browser.browserSettings.verticalTabs.set({ value: false });
          }
        }
      });
    };

    /* Init:
     * 1. Set default values into local storage if they don't exist
     * 2. If enabled, start an interval that auto toggle vertical tab
     */
    Object.keys(STORAGE_DEFAULT).forEach((key) => {
      const typedKey = key as keyof StorageType;
      const storageKey = `local:${key}` as StorageItemKey;

      storage.getItem(storageKey).then((value) => {
        if (value === null) {
          storage.setItem(storageKey, STORAGE_DEFAULT[typedKey]);

          if (key === "enabled") {
            interval = setInterval(toggleVerticalTab, delay);
            console.log(`Interval started, ID: ${interval}`);
          }
        } else {
          if (key === "widthThreshold") {
            config.widthThreshold = value as number;
          } else if (key === "enabled") {
            config.enabled = value as boolean;
            if (config.enabled) {
              interval = setInterval(toggleVerticalTab, delay);
              console.log(`Interval started, ID: ${interval}`);
            }
          }
        }
      });
    });

    browser.runtime.onMessage.addListener((message: ConfigMessageType) => {
      console.log(message);

      if (message.changedItem === "widthThreshold") {
        if (Number.isNaN(message.newValue)) {
          config.widthThreshold = 0;
        }
        config.widthThreshold = message.newValue as number;
      }

      if (message.changedItem === "enabled") {
        config.enabled = message.newValue as boolean;

        if (message.newValue && !interval) {
          interval = setInterval(toggleVerticalTab, delay);
          console.log(`Interval started, ID: ${interval}`);
        }
        if (!message.newValue && interval) {
          console.log(`Clearing interval, ID: ${interval}`);
          clearInterval(interval);
          interval = null;
        }
      }
    });
  },
});
