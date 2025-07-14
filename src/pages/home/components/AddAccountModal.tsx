import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { SectionTitle } from "../../../components/common/SectionTitle";
import { ModalLayout } from "../../../components/layout/ModalLayout";
import type { AddAccountSchema } from "../../../validators/addAccount";
import { Input } from "antd";
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
      <div>
        <SectionTitle text="계좌 추가하기" classNames="py-4" />

        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name={"bankName"}
              control={control}
              render={({ field }) => (
                <Input
                  size="large"
                  id={"bankName"}
                  placeholder="은행명을 압력해주세요."
                  {...field}
                />
              )}
            />
          </form>
        </div>
      </div>
    </ModalLayout>
  );
};
