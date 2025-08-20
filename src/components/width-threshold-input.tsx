import { InputPropType } from "@/types/input-prop";

function WidthThresholdInput({ state, setState }: InputPropType<number>) {
  return (
    <div className="input-container">
      <label>
        <abbr title="Automatically enable (or disable) vertical tabs if the width of currently focused Firefox window is below or equal to (or above) this value">
          Width Threshold (in pixels):
        </abbr>

        <input
          type="number"
          value={state}
          min={0}
          onChange={(event) => setState(parseInt(event.target.value))}
        />
      </label>
    </div>
  );
}

export default WidthThresholdInput;
