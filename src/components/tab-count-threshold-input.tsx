import { Dispatch, SetStateAction } from "react";

type Props = {
  state: number;
  setState: (value: number) => void;
};

export default function TabCountThresholdInput({ state, setState }: Props) {
  return (
    <label>
      Tab Count Threshold:
      <input
        type="number"
        min={1}
        value={state}
        onChange={e => setState(Number(e.target.value))}
        style={{ width: "5em", marginLeft: "0.5em" }}
      />
    </label>
  );
}
