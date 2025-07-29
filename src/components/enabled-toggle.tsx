import { useState, useEffect } from "react";
import { useIsFirstRender } from "@/hooks/is-first-render";
import { storage } from "#imports";
import { InputPropType } from "@/types/input-prop";

const STORAGE_KEY = "local:enabled";

function EnabledToggle({ storageKey, setState }: InputPropType<boolean>) {
  return (
    <div>
      Extension Status:
      <label>
        <input
          type="radio"
          name="toggle"
          value="enabled"
          checked={storageKey}
          onChange={() => setState(true)}
        />
        Enabled
      </label>
      <label>
        <input
          type="radio"
          name="toggle"
          value="disabled"
          checked={!storageKey}
          onChange={() => setState(false)}
        />
        Disabled
      </label>
    </div>
  );
}

export default EnabledToggle;
