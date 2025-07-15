import { create } from "zustand";

interface ConfirmState {
  open: boolean;
  title?: string;
  message: string;
  confirmText: string; // 상호작용 버튼 텍스트
  onNext: () => void; // 확인 버튼 클릭
  openConfirm: (options: {
    title?: string;
    message: string;
    confirmText?: string;
    onNext?: () => void;
  }) => void;
  closeConfirm: () => void;
}

export const useConfirmStore = create<ConfirmState>((set) => ({
  open: false,
  title: "",
  message: "",
  type: "info",
  confirmText: "",
  onNext: () => {},
  openConfirm: ({ title, message, confirmText = "", onNext }) =>
    set((state) => {
      if (state.open) return state;
      return {
        ...state,
        open: true,
        title,
        message,
        confirmText,
        onNext: onNext || (() => {}),
      };
    }),
  closeConfirm: () =>
    set({
      open: false,
      title: "",
      message: "",
      confirmText: "",
      onNext: () => {},
    }),
}));
