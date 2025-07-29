import { useState, useEffect, Dispatch, SetStateAction } from "react";
import EnabledToggle from "@/components/enabled-toggle";

import wxtLogo from "@/assets/wxt.svg";
import githubLogo from "@/assets/github-mark-white.svg";

import "./app.css";
import { useIsFirstRender } from "@/hooks/is-first-render";
import { storage, browser } from "#imports";
import { STORAGE_DEFAULT } from "@/utils/storage_defaults";
import { MessageType } from "@/types/message";
import { StorageType } from "@/types/storage";
import WidthThresholdInput from "@/components/width-threshold-input";

const getStoredValue = async <T,>(
  key: string,
  fallback: T,
  setState: Dispatch<SetStateAction<T>>
): Promise<void> => {
  const storedValue = await storage.getItem(`local:${key}`, {
    fallback: fallback,
  });
  setState(storedValue);
};

const setStoredValue = async <T,>(key: string, value: T): Promise<void> => {
  await storage.setItem(`local:${key}`, value);
};

function App() {
  const [enabled, setEnabled] = useState<boolean>(STORAGE_DEFAULT.enabled);
  const [widthThreshold, setWidthThreshold] = useState<number>(
    STORAGE_DEFAULT.widthThreshold
  );

  const isFirstRender = useIsFirstRender();

  // Initial state loading from local storage
  useEffect(() => {
    getStoredValue("enabled", STORAGE_DEFAULT.enabled, setEnabled);
    getStoredValue(
      "widthThreshold",
      STORAGE_DEFAULT.widthThreshold,
      setWidthThreshold
    );
  }, []);

  useEffect(() => {
    if (!isFirstRender) {
      setStoredValue("enabled", enabled);
      setStoredValue("widthThreshold", widthThreshold);

      const message: MessageType<StorageType> = {
        changedItem: "config",
        newValue: {
          enabled: enabled,
          widthThreshold: widthThreshold,
        },
      };

      browser.runtime.sendMessage(message);
    }
  }, [enabled, widthThreshold]);

  return (
    <>
      <EnabledToggle storageKey={enabled} setState={setEnabled} />
      <WidthThresholdInput
        storageKey={widthThreshold}
        setState={setWidthThreshold}
      />
      <p className="read-the-docs">
        Written with WXT
        <a href="https://wxt.dev" target="_blank">
          <img src={wxtLogo} className="logo" alt="WXT logo" />
        </a>
        <a
          href="https://github.com/regunakyle/firefox-auto-vertical-tab"
          target="_blank"
        >
          <img src={githubLogo} className="logo" alt="Github logo" />
        </a>
      </p>
    </>
  );
}

export default App;
