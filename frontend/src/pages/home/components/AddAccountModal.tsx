import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { SectionTitle } from "../../../components/common/SectionTitle";
import { ModalLayout } from "../../../components/layout/ModalLayout";
import type { AddAccountSchema } from "../../../validators/addAccount";
import { Button, Input } from "antd";
interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const AddAccountModal = ({ open, setOpen }: Props) => {
  const { control, handleSubmit } = useForm<AddAccountSchema>({});

  const onSubmit: SubmitHandler<AddAccountSchema> = async (data) => {
    console.log(data);
  };
  return (
    <ModalLayout open={open} setOpen={setOpen}>
      <div className="flex flex-col gap-4">
        <SectionTitle text="계좌 추가하기" classNames="" />

        <div>
          <form
            id="addAccountForm"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* 은행명 */}
            <div>
              <label className="pl-1" htmlFor="bankName">
                은행명
              </label>
              <Controller
                name={"bankName"}
                control={control}
                render={({ field }) => (
                  // <Select
                  //   style={{ width: "100%" }}
                  //   options={[
                  //     { value: "1", label: "농협은행" },
                  //     { value: "2", label: "QTB은행" },
                  //   ]}
                  //   {...field}
                  // />
                  <Input
                    size="large"
                    id={"bankName"}
                    placeholder="은행명을 입력해주세요."
                    {...field}
                  />
                )}
              />
            </div>

            <div>
              <label className="pl-1" htmlFor="accountType">
                자산 종류
              </label>
              <Controller
                name={"accountType"}
                control={control}
                render={({ field }) => (
                  <Input
                    size="large"
                    id={"accountType"}
                    placeholder="자산 종류를 입력해주세요."
                    {...field}
                  />
                )}
              />
            </div>

            <div>
              <label className="pl-1" htmlFor="amount">
                잔액
              </label>
              <Controller
                name={"amount"}
                control={control}
                render={({ field }) => (
                  <Input
                    size="large"
                    id={"amount"}
                    placeholder="잔액을 입력해주세요."
                    {...field}
                  />
                )}
              />
            </div>

            <div>
              <label className="pl-1" htmlFor="date">
                계좌 생성일
              </label>
              <Controller
                name={"date"}
                control={control}
                render={({ field }) => (
                  <Input
                    size="large"
                    id={"date"}
                    placeholder="계좌 생성일을 입력해주세요."
                    {...field}
                  />
                )}
              />
            </div>
          </form>
        </div>

        <div className="flex-center gap-2">
          <Button
            color="primary"
            variant="solid"
            form="addAccountForm"
            htmlType="submit"
          >
            저장
          </Button>
          <Button onClick={() => setOpen(false)} htmlType="button">
            취소
          </Button>
        </div>
      </div>
    </ModalLayout>
  );
};
