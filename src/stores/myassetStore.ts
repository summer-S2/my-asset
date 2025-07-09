import { create } from "zustand";
import type { AssetData } from "../types/api";
import { generateFakeData } from "../mocks";

interface MyassetState {
  data: AssetData;
  setData: (data: AssetData) => void;
}

export const useMyassetStore = create<MyassetState>((set) => ({
  data: generateFakeData(),
  setData: (newData) => set({ data: newData }),
}));
