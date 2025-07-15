import { create } from "zustand";

interface AlertState {
  open: boolean;
  title?: string;
  message: string;
  onClose?: () => void; // 닫을때 동작하고싶은 콜백 함수
  openAlert: (params: {
    title?: string;
    message: string;
    onClose?: () => void;
  }) => void;
  closeAlert: () => void;
}

export const useAlertStore = create<AlertState>((set) => ({
  open: false,
  title: "",
  message: "",
  type: "info",
  onClose: undefined,
  openAlert: ({ title, message, onClose }) =>
    set((state) => {
      if (state.open) return state; // 이미 alert이 열려있으면 무시
      return {
        ...state,
        open: true,
        title,
        message,
        onClose,
      };
    }),
  closeAlert: () =>
    set({
      open: false,
      title: "",
      message: "",
      onClose: undefined,
    }),
}));
