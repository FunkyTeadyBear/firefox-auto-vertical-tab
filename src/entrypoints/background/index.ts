import {
  browser,
  Browser,
  defineBackground,
  storage,
  StorageItemKey,
} from "#imports";
import { MessageType } from "@/types/message";
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

    if (userAgent === null) {
      console.error("Unknown user agent");
      return;
    } else if (parseInt(userAgent[1]) < 142) {
      console.error(
        `This extension requires Firefox 142 or higher. Your version: ${userAgent[1]}`,
      );
      return;
    }

    // Set default values in storage if they don't exist
    Object.keys(STORAGE_DEFAULT).forEach((key) => {
      const typedKey = key as keyof StorageType;
      const storageKey = `local:${key}` as StorageItemKey;
      storage.getItem(storageKey).then((value) => {
        if (value === null) {
          storage.setItem(storageKey, STORAGE_DEFAULT[typedKey]);
        }
      });
    });

    const toggleVerticalTabs = (
      window: Browser.windows.Window | undefined,
      threshold: number,
    ) => {
      if (window && window.width) {
        if (window.width <= threshold) {
          // @ts-expect-error browserSettings does not exist in WxtBrowser
          browser.browserSettings.verticalTabs.set({ value: true });
        } else {
          // @ts-expect-error see above
          browser.browserSettings.verticalTabs.set({ value: false });
        }
      }
    };

    browser.windows.onFocusChanged.addListener((id) => {
      console.log(`Window focus changed: ${id}`);
      if (id >= 1) {
        storage
          .getItem("local:enabled", { fallback: STORAGE_DEFAULT.enabled })
          .then((enabled) => {
            if (enabled) {
              browser.windows.get(id).then((window) => {
                storage
                  .getItem("local:widthThreshold", {
                    fallback: STORAGE_DEFAULT.widthThreshold,
                  })
                  .then((widthThreshold) => {
                    toggleVerticalTabs(window, widthThreshold);
                  });
              });
            }
          });
      }
    });

    browser.runtime.onMessage.addListener((message: MessageType<unknown>) => {
      console.log(message);

      storage
        .getItem("local:enabled", { fallback: STORAGE_DEFAULT.enabled })
        .then((enabled) => {
          if (enabled) {
            browser.windows.getCurrent().then((window) => {
              storage
                .getItem("local:widthThreshold", {
                  fallback: STORAGE_DEFAULT.widthThreshold,
                })
                .then((widthThreshold) => {
                  toggleVerticalTabs(window, widthThreshold);
                });
            });
          }
        });
    });
  },
});
