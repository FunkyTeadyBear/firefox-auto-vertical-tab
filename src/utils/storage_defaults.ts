export type StorageType = {
  enabled: boolean;
  widthThreshold: number;
};

export const STORAGE_DEFAULT: StorageType = {
  enabled: false,
  widthThreshold: 1080,
};
