import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { SectionTitle } from "../../../components/common/SectionTitle";
import { ModalLayout } from "../../../components/layout/ModalLayout";
import type { AddAccountSchema } from "../../../validators/addAccount";
import { Button, Input } from "antd";

import { useEffect } from "react";
import type { Account } from "../../../types/api";
import { usePatchAccount } from "../../../hooks/usePatchAccount";
interface Props {
  data: Account;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const EditAccountModal = ({ data, open, setOpen }: Props) => {
  const { control, handleSubmit } = useForm<AddAccountSchema>({
    defaultValues: {
      account_num: data.account_num,
      account_type: data.account_type,
      balance: data.balance,
      bank_id: data.bank_id,
    },
  });

  const { mutate: patchAccount, isSuccess, isPending } = usePatchAccount();

  const onSubmit: SubmitHandler<AddAccountSchema> = async (values) => {
    const formData = new FormData();

    formData.append("id", data.id.toString());
    formData.append("account_num", values.account_num);
    formData.append("balance", values.balance.toString());
    formData.append("account_type", values.account_type.toString());
    formData.append("bank_id", values.bank_id.toString());
    formData.append("user_id", "1");

    patchAccount(formData);
  };

  // 등록 성공시 모달 닫음
  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
    }
  }, [isSuccess]);

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
              <label className="pl-1" htmlFor="bank_id">
                은행명
              </label>
              <Controller
                name={"bank_id"}
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
                    id={"bank_id"}
                    placeholder="은행명을 입력해주세요."
                    {...field}
                  />
                )}
              />
            </div>

            <div>
              <label className="pl-1" htmlFor="account_type">
                자산 종류
              </label>
              <Controller
                name={"account_type"}
                control={control}
                render={({ field }) => (
                  <Input
                    size="large"
                    id={"account_type"}
                    placeholder="자산 종류를 입력해주세요."
                    {...field}
                  />
                )}
              />
            </div>

            <div>
              <label className="pl-1" htmlFor="balance">
                잔액
              </label>
              <Controller
                name={"balance"}
                control={control}
                render={({ field }) => (
                  <Input
                    size="large"
                    id={"balance"}
                    placeholder="잔액을 입력해주세요."
                    {...field}
                  />
                )}
              />
            </div>

            <div>
              <label className="pl-1" htmlFor="account_num">
                계좌 번호
              </label>
              <Controller
                name={"account_num"}
                control={control}
                render={({ field }) => (
                  <Input
                    size="large"
                    id={"account_num"}
                    placeholder="계좌 번호를 입력해주세요."
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
            loading={isPending}
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
