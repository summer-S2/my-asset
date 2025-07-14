import { Modal } from "antd";
import { useEffect, useState, type ReactNode } from "react";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children?: ReactNode;
}

export const ModalLayout = ({ open, setOpen, children }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  // 모달의 열림 상태를 감지하고 isVisible 상태를 업데이트
  useEffect(
    function checkModalOpenEffect() {
      if (open) {
        setIsVisible(true);
      }
    },
    [open] // open 상태가 변경될 때마다 useEffect 실행
  );

  // 모달 닫기 버튼 클릭 시 호출되는 함수
  const handleCancel = () => {
    setIsVisible(false);
  };

  // 모달이 완전히 닫힌 후 실행되는 함수 (닫히는 애니메이션이 완료된 후)
  const handleAfterClose = () => {
    setOpen(false); // 부모 컴포넌트의 open 상태를 false로 변경
  };

  return (
    <Modal
      open={isVisible}
      onCancel={handleCancel}
      afterClose={handleAfterClose}
      centered
    >
      {children}
    </Modal>
  );
};
