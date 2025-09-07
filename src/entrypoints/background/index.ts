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
      reverseBehavior: STORAGE_DEFAULT.reverseBehavior,
      tabCountThreshold: STORAGE_DEFAULT.tabCountThreshold,
    };

    if (userAgent === null) {
      console.error("Unknown user agent");
      return;
    } else if (parseInt(userAgent[1]) < 142) {
      console.error(
        `This extension requires Firefox 142 or above. Your version: ${userAgent[1]}`,
      );
      return;
    }

    const toggleVerticalTabByTabCount = async () => {
      try {
        const tabs = await browser.tabs.query({});
        const numberOfTabs = tabs.length;
        if (config.enabled && config.tabCountThreshold && numberOfTabs >= config.tabCountThreshold) {
          // Enable vertical tabs
          // @ts-expect-error browserSettings does not exist in WxtBrowser
          browser.browserSettings.verticalTabs.set({ value: !config.reverseBehavior });
        } else {
          // Restore to width-based toggle
          toggleVerticalTab();
        }
      } catch (err) {
        console.error("Failed to toggle by tab count:", err);
      }
    };
    
    const toggleVerticalTab = () => {
      browser.windows.getLastFocused().then((window) => {
        if (window.width) {
          if (window.width <= config.widthThreshold) {
            // @ts-expect-error browserSettings does not exist in WxtBrowser
            browser.browserSettings.verticalTabs.set({
              value: !config.reverseBehavior,
            });
          } else {
            // @ts-expect-error browserSettings does not exist in WxtBrowser
            browser.browserSettings.verticalTabs.set({
              value: config.reverseBehavior,
            });
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
          switch (key) {
            case "reverseBehavior":
              config.reverseBehavior = value as boolean;
              break;
            case "widthThreshold":
              config.widthThreshold = value as number;
              break;
            case "enabled":
              config.enabled = value as boolean;
              if (config.enabled) {
                interval = setInterval(toggleVerticalTab, delay);
                console.log(`Interval started, ID: ${interval}`);
              }
              break;
            case "tabCountThreshold":
              config.tabCountThreshold = value as number;
              break;
            default:
              console.error(`Unknown key: ${key} with value: ${value}`);
          }
        }
      });
    });

    // Listen to tab events and check if toggle needed
    browser.tabs.onCreated.addListener(toggleVerticalTabByTabCount);
    browser.tabs.onRemoved.addListener(toggleVerticalTabByTabCount);

    // check on startup
    toggleVerticalTabByTabCount();


    browser.runtime.onMessage.addListener((message: ConfigMessageType) => {
      console.log(message);

      switch (message.changedItem) {
        case "widthThreshold":
          if (Number.isNaN(message.newValue)) {
            config.widthThreshold = 0;
          } else {
            config.widthThreshold = message.newValue as number;
          }
          break;
        case "enabled":
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
          break;
        case "reverseBehavior":
          config.reverseBehavior = message.newValue as boolean;
          break;
        case "tabCountThreshold":
          config.tabCountThreshold = message.newValue as number;
          break;  
        default:
          console.error(
            `Unexpected message: changedItem ${message.changedItem} with newValue ${message.newValue}`,
          );
      }
    });
  },
});
