import { useParams } from "react-router-dom";
import { PageLayout } from "../../components/layout/PageLayout";
import { useState } from "react";
import { accountMasking } from "../../utils/fn";
import { SectionTitle } from "../../components/common/SectionTitle";
import { AccountHistoryTable } from "./components/AccountHistoryTable";
import { ACCOUNT_TYPE_MAP } from "../../utils/constants";
import { Button } from "antd";
import { EditAccountModal } from "./components/EditAccountModal";
import { useGetAccountDetail } from "../../hooks/useGetAccountDetail";
import { Loader } from "../../components/common/Loader";
import { SettingIcon } from "../../assets/icons/SettingIcon";

export const AccountDetail = () => {
  const { id } = useParams();
  const [openEditModal, setOpenEditModal] = useState(false);

  const { data, isPending } = useGetAccountDetail(id ? Number(id) : undefined);

  console.log(data);

  const textStyle = "flex-2 flex items-center";

  return (
    <PageLayout>
      <div className="w-full h-full flex flex-col">
        {isPending ? (
          <Loader />
        ) : data?.result ? (
          <div className="w-full h-full flex flex-col">
            <div>
              {/* 계좌정보 영역 */}
              <div className="flex-center flex-col">
                <div className="flex justify-between items-center w-80">
                  <div className="flex-grow">
                    <SectionTitle
                      text="계좌 정보"
                      withUserName
                      classNames="py-4"
                    />
                  </div>

                  {/* 계좌 수정하기 버튼 */}
                  <Button
                    shape="circle"
                    icon={
                      <div className="flex-center">
                        <SettingIcon />
                      </div>
                    }
                    color="primary"
                    variant="solid"
                    onClick={() => setOpenEditModal(true)}
                  ></Button>
                </div>

                <div className="flex flex-col gap-2 p-4 rounded-xl bg-slate-200 w-80">
                  <div className="flex gap-4">
                    <div className="text-lg font-bold text-indigo-900 flex-1">
                      은행명
                    </div>
                    <div className={textStyle}>{data?.result.bank_name}</div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-lg font-bold text-indigo-900 flex-1">
                      자산종류
                    </div>
                    <div className={textStyle}>
                      {ACCOUNT_TYPE_MAP[data?.result.account_type]}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="text-lg font-bold text-indigo-900 flex-1">
                      계좌번호
                    </div>
                    <div className={textStyle}>
                      {accountMasking(data?.result.account_num)}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="text-lg font-bold text-indigo-900 flex-1">
                      잔액
                    </div>
                    <div
                      className={textStyle}
                    >{`${data?.result.balance.toLocaleString()}원`}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 테이블 영역 */}
            <div className="flex flex-col gap-2 flex-grow">
              <div className="flex px-4">
                <SectionTitle text="입출금 내역" />
              </div>
              <AccountHistoryTable accountId={Number(id)} />
            </div>
          </div>
        ) : (
          <div className="flex-grow flex-center">
            계좌정보를 가져올 수 없습니다 😢
          </div>
        )}
      </div>
      {data && openEditModal && (
        <EditAccountModal
          data={data.result}
          open={openEditModal}
          setOpen={setOpenEditModal}
        />
      )}
    </PageLayout>
  );
};
