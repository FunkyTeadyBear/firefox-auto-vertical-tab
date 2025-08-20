import EnabledToggle from "@/components/enabled-toggle";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import githubLogo from "@/assets/github-mark-white.svg";
import wxtLogo from "@/assets/wxt.svg";

import { browser, storage } from "#imports";
import ReverseToggle from "@/components/reverse-toggle";
import WidthThresholdInput from "@/components/width-threshold-input";
import { ConfigMessageType } from "@/types/message";
import { StorageType } from "@/types/storage";
import { STORAGE_DEFAULT } from "@/utils/storage_defaults";
import "./app.css";

const getStoredValue = async <T,>(
  key: keyof StorageType,
  fallback: T,
  setState: Dispatch<SetStateAction<T>>,
): Promise<void> => {
  const storedValue = await storage.getItem(`local:${key}`, {
    fallback: fallback,
  });
  setState(storedValue);
};

const setConfigStateFunction = <T extends boolean | number>(
  key: keyof StorageType,
  setState: Dispatch<SetStateAction<T>>,
) => {
  return (value: T) => {
    // Closure magic
    if (key === "widthThreshold" && Number.isNaN(value)) {
      return;
    }

    setState(value);

    const message: ConfigMessageType = {
      changedItem: key,
      newValue: value,
    };

    storage.setItem(`local:${key}`, value);

    browser.runtime.sendMessage(message);
  };
};

function App() {
  const [enabled, setEnabled] = useState<boolean>(STORAGE_DEFAULT.enabled);
  const [widthThreshold, setWidthThreshold] = useState<number>(
    STORAGE_DEFAULT.widthThreshold,
  );
  const [reverseBehavior, setReverseBehavior] = useState<boolean>(
    STORAGE_DEFAULT.reverseBehavior,
  );

  // Initial state loading from local storage
  useEffect(() => {
    getStoredValue("enabled", STORAGE_DEFAULT.enabled, setEnabled);
    getStoredValue(
      "widthThreshold",
      STORAGE_DEFAULT.widthThreshold,
      setWidthThreshold,
    );
    getStoredValue(
      "reverseBehavior",
      STORAGE_DEFAULT.reverseBehavior,
      setReverseBehavior,
    );
  }, []);

  let content = (
    <div>
      <EnabledToggle
        state={enabled}
        setState={setConfigStateFunction("enabled", setEnabled)}
      />
      <WidthThresholdInput
        state={widthThreshold}
        setState={setConfigStateFunction("widthThreshold", setWidthThreshold)}
      />
      <ReverseToggle
        state={reverseBehavior}
        setState={setConfigStateFunction("reverseBehavior", setReverseBehavior)}
      />
    </div>
  );

  const userAgent = window.navigator.userAgent.match(/Firefox\/(\d+)/);

  if (userAgent === null) {
    content = (
      <div>
        <p>
          ERROR: Unknown user agent.
          <br />
          This extension only works on Firefox 142 or above.
        </p>
      </div>
    );
  } else if (parseInt(userAgent[1]) < 142) {
    content = (
      <div>
        <p>
          ERROR: This extension requires Firefox 142 or above.
          <br />
          Your version: {userAgent[1]}
        </p>
      </div>
    );
  }

  return (
    <>
      <h1>Auto Toggle Vertical Tab</h1>
      {content}
      <p className="read-the-docs">
        Source Code (GPLv3)
        <a
          href="https://github.com/regunakyle/firefox-auto-vertical-tab"
          target="_blank"
          rel="noreferrer"
        >
          <img src={githubLogo} className="logo" alt="Github logo" />
        </a>
      </p>
      <p className="read-the-docs">
        Written with WXT
        <a href="https://wxt.dev" target="_blank" rel="noreferrer">
          <img src={wxtLogo} className="logo" alt="WXT logo" />
        </a>
      </p>
    </>
  );
}

export default App;
