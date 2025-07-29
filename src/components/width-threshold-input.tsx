import { useState, useEffect } from "react";
import { useIsFirstRender } from "@/hooks/is-first-render";
import { storage } from "#imports";
import { InputPropType } from "@/types/input-prop";

function WidthThresholdInput({ storageKey, setState }: InputPropType<number>) {
  return (
    <div>
      <label>
        Width Threshold (in pixels):
        <input
          type="number"
          value={storageKey}
          min={0}
          onChange={(event) => setState(parseInt(event.target.value))}
        />
      </label>
    </div>
  );
}

export default WidthThresholdInput;
