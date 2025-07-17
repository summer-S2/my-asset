import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { useConfirmStore } from "../../stores/confirmStore";

export const Confirm = () => {
  const { open, title, message, confirmText, onNext, closeConfirm } =
    useConfirmStore();
  const [isVisible, setIsVisible] = useState(open);

  const handleOk = () => {
    onNext();
    handleCancel();
  };

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
    closeConfirm();
  };

  return (
    <Modal
      centered
      zIndex={9999}
      open={isVisible} // 모달이 보이는 상태 설정
      onCancel={handleCancel} // 모달 닫기 버튼 클릭 시 실행되는 함수
      afterClose={handleAfterClose} // 모달이 닫힌 후 실행되는 함수
      footer={null}
    >
      <div className="flex flex-col gap-[24px]">
        {/* 모달 헤더 */}
        {
          <div className="flex h-[34px] items-center">
            <div className="flex-center flex-grow text-lg font-bold">
              {title}
            </div>
          </div>
        }

        {/* 모달 바디 */}
        <div>
          {/* 메시지 */}
          <pre className="flex-center whitespace-pre-wrap text-center font-['Pretendard'] leading-[21px]">
            {message}
          </pre>
        </div>
        {/* 버튼 */}

        <div className={"flex-center gap-2"}>
          <Button color="primary" variant="solid" onClick={handleOk}>
            {confirmText ? confirmText : `확인`}
          </Button>
          <Button onClick={handleCancel}>취소</Button>
        </div>
      </div>
    </Modal>
  );
};
