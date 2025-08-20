import { InputPropType } from "@/types/input-prop";

function ReverseToggle({ state, setState }: InputPropType<boolean>) {
  return (
    <div className="input-container">
      <abbr title="Enable vertical tab when the window width is ABOVE the threshold (rather than below, which is the default behavior)">
        Reverse Behavior:
      </abbr>
      <label>
        <input
          type="radio"
          value="enabled"
          checked={state}
          onChange={() => setState(true)}
        />
        Yes
      </label>
      <label>
        <input
          type="radio"
          value="disabled"
          checked={!state}
          onChange={() => setState(false)}
        />
        No
      </label>
    </div>
  );
}

export default ReverseToggle;
