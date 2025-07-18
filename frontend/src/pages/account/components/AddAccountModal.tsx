import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { SectionTitle } from "../../../components/common/SectionTitle";
import { ModalLayout } from "../../../components/layout/ModalLayout";
import {
  addAccountValidator,
  type AddAccountSchema,
} from "../../../validators/addAccount";
import { Button, Input, Select } from "antd";
import { usePostAccount } from "../../../hooks/usePostAccount";
import { useEffect } from "react";
import { ACCOUNT_TYPE_OPTION, BANK_OPTION } from "../../../utils/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorText } from "../../../components/common/ErrorText";
import { formatKoreanCurrency } from "../../../utils/fn";
import { Label } from "../../../components/common/Label";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddAccountModal = ({ open, setOpen }: Props) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid, errors },
  } = useForm<AddAccountSchema>({
    mode: "onChange",
    resolver: yupResolver(addAccountValidator),
    defaultValues: {
      bank_id: 0,
      account_type: 0,
    },
  });

  const { mutate: postAccount, isSuccess, isPending } = usePostAccount();

  const onSubmit: SubmitHandler<AddAccountSchema> = async (data) => {
    const formData = new FormData();

    formData.append("account_num", data.account_num);
    formData.append("balance", data.balance.toString());
    formData.append("account_type", data.account_type.toString());
    formData.append("bank_id", data.bank_id.toString());
    formData.append("user_id", "1");

    postAccount(formData);
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
              <Label id="bank_id" text="은행명" />

              <Controller
                name={"bank_id"}
                control={control}
                render={({ field }) => (
                  <Select
                    id={"bank_id"}
                    style={{ width: "100%" }}
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
                    id={"account_type"}
                    style={{ width: "100%" }}
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
                  <Input
                    size="large"
                    id={"balance"}
                    placeholder="잔액을 입력해 주세요."
                    status={!!errors.balance ? "error" : ""}
                    type="number"
                    {...field}
                  />
                )}
              />
              <ErrorText text={errors.balance?.message} />
            </div>

            <div>
              <Label id="account_num" text="계좌번호" />

              <Controller
                name={"account_num"}
                control={control}
                render={({ field }) => (
                  <Input
                    size="large"
                    id={"account_num"}
                    placeholder="계좌번호를 입력해 주세요."
                    status={!!errors.account_num ? "error" : ""}
                    type="number"
                    {...field}
                  />
                )}
              />
              <ErrorText text={errors.account_num?.message} />
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
            disabled={!isValid}
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
