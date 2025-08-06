import { InputPropType } from "@/types/input-prop";

function WidthThresholdInput({
  state: storageKey,
  setState,
}: InputPropType<number>) {
  return (
    <div className="input-container">
      <label>
        <abbr title="Automatically enable (or disable) vertical tabs if the width of currently focused Firefox window is lower than or equal to (or higher than) this value">
          Width Threshold (in pixels):
        </abbr>

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
