import { create } from "zustand";
import type { HistoryData } from "../types/api";
import { getHistoryList } from "../mocks";

interface MyassetState {
  data: HistoryData[];
  setData: (data: HistoryData[]) => void;
}

export const useMyassetStore = create<MyassetState>((set) => ({
  data: getHistoryList(100),
  setData: (newData) => set({ data: newData }),
}));
