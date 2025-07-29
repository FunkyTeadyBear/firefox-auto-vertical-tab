import { MessageType } from "@/types/message";
import { StorageType, STORAGE_DEFAULT } from "@/utils/storage_defaults";
import {
  storage,
  defineBackground,
  browser,
  StorageItemKey,
  Browser,
} from "#imports";

export default defineBackground({
  // Set manifest options
  persistent: false,
  type: "module",

  // Executed when background is loaded, CANNOT BE ASYNC
  main() {
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
      threshold: number
    ) => {
      if (window && window.width) {
        if (window.width <= threshold) {
          // @ts-ignore
          browser.browserSettings.verticalTabs.set({ value: true });
        } else {
          // @ts-ignore
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

    browser.runtime.onMessage.addListener((message: MessageType) => {
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
