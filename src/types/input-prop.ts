export type InputPropType<T> = {
  state: T;
  setState: (value: T) => void;
};
