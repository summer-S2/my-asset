import { Button, Modal } from "antd";
import { useAlertStore } from "../../stores/alertStore";

export const Alert = () => {
  const { open, title, message, onClose, closeAlert } = useAlertStore();

  const handleClose = () => {
    if (onClose) onClose();

    // 스토어 상태 초기화
    closeAlert();
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      centered
      zIndex={9999}
      styles={{
        content: {
          borderRadius: "16px",
        },
      }}
      okText="확인"
      cancelText="취소"
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
          <pre className="flex-center whitespace-pre-wrap text-center font-['Pretendard'] text-BODY_1 leading-[21px]">
            {message}
          </pre>
        </div>

        <div className={"flex-center"}>
          <Button color="primary" variant="solid" onClick={handleClose}>
            확인
          </Button>
        </div>
      </div>
    </Modal>
  );
};
