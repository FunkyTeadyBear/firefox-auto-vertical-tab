import { InputPropType } from "@/types/input-prop";

function EnabledToggle({
  state: storageKey,
  setState,
}: InputPropType<boolean>) {
  return (
    <div className="input-container">
      <abbr title="Enable or disable the extension">Extension Status:</abbr>
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
