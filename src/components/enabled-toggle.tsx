import { useState, useEffect } from "react";
import { useIsFirstRender } from "@/hooks/is-first-render";
import { storage } from "#imports";

const STORAGE_KEY = "local:enabled";

function EnabledToggle() {
  const [enabled, setEnabled] = useState<boolean>(true);

  const isFirstRender = useIsFirstRender();

  // Initial state loading from local storage
  useEffect(() => {
    const getStoredValue = async () => {
      const storedValue = await storage.getItem(STORAGE_KEY, {
        fallback: true,
      });
      setEnabled(storedValue);
    };

    getStoredValue();
  }, []);

  useEffect(() => {
    const setStoredValue = async () => {
      await storage.setItem(STORAGE_KEY, enabled);
    };

    if (!isFirstRender) setStoredValue();
  }, [enabled]);

  return (
    <div>
      Extension Status:
      <label>
        <input
          type="radio"
          name="toggle"
          value="enabled"
          checked={enabled}
          onChange={() => setEnabled(true)}
        />
        Enabled
      </label>
      <label>
        <input
          type="radio"
          name="toggle"
          value="disabled"
          checked={!enabled}
          onChange={() => setEnabled(false)}
        />
        Disabled
      </label>
    </div>
  );
}

export default EnabledToggle;
