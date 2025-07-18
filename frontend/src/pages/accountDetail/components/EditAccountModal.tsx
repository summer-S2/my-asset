import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { SectionTitle } from "../../../components/common/SectionTitle";
import { ModalLayout } from "../../../components/layout/ModalLayout";
import type { AddAccountSchema } from "../../../validators/addAccount";
import { Button, Input, Select } from "antd";

import { useEffect } from "react";
import type { Account } from "../../../types/api";
import { usePatchAccount } from "../../../hooks/usePatchAccount";
import { accountMasking, formatKoreanCurrency } from "../../../utils/fn";
import { ACCOUNT_TYPE_OPTION, BANK_OPTION } from "../../../utils/constants";
import { Label } from "../../../components/common/Label";
interface Props {
  data: Account;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const EditAccountModal = ({ data, open, setOpen }: Props) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { isDirty },
  } = useForm<AddAccountSchema>({
    defaultValues: {
      account_num: accountMasking(data.account_num),
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

  // 수정 성공시 모달 닫음
  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
    }
  }, [isSuccess]);

  return (
    <ModalLayout open={open} setOpen={setOpen}>
      <div className="flex flex-col gap-4">
        <SectionTitle text="계좌 수정하기" classNames="" />

        <div>
          <form
            id="addAccountForm"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* 은행명 */}
            <div>
              <Label id="bank_id" text="은행명" />

              <Controller
                name={"bank_id"}
                control={control}
                render={({ field }) => (
                  <Select
                    style={{ width: "100%" }}
                    size="large"
                    options={[
                      {
                        value: 0,
                        label: "은행을 선택해 주세요.",
                        disabled: true,
                      },
                      ...BANK_OPTION,
                    ]}
                    {...field}
                  />
                )}
              />
            </div>

            <div>
              <Label id="account_type" text="자산 종류" />

              <Controller
                name={"account_type"}
                control={control}
                render={({ field }) => (
                  <Select
                    style={{ width: "100%" }}
                    size="large"
                    options={[
                      {
                        value: 0,
                        label: "자산 종류를 선택해 주세요.",
                        disabled: true,
                      },
                      ...ACCOUNT_TYPE_OPTION,
                    ]}
                    {...field}
                  />
                )}
              />
            </div>

            <div>
              <div className="flex w-full justify-between">
                <Label id="balance" text="잔액" />

                {watch("balance") && (
                  <p className="text-xs text-gray-400">
                    {formatKoreanCurrency(watch("balance"))}
                  </p>
                )}
              </div>
              <Controller
                name={"balance"}
                control={control}
                render={({ field }) => (
                  <Input disabled size="large" id={"balance"} {...field} />
                )}
              />
            </div>

            <div>
              <Label id="account_num" text="계좌번호" />

              <Controller
                name={"account_num"}
                control={control}
                render={({ field }) => (
                  <Input disabled size="large" id={"account_num"} {...field} />
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
            disabled={!isDirty}
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
