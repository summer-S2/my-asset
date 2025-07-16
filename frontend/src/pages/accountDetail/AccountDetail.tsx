import { useLocation } from "react-router-dom";
import { PageLayout } from "../../components/layout/PageLayout";
import { useEffect, useState } from "react";
import type { Account } from "../../types/api";
import { accountMasking } from "../../utils/fn";
import { SectionTitle } from "../../components/common/SectionTitle";
import { AccountHistoryTable } from "./components/AccountHistoryTable";

import { ACCOUNT_TYPE_MAP } from "../../utils/constants";
import { Button } from "antd";
import { EditAccountModal } from "./components/EditAccountModal";

export const AccountDetail = () => {
  const location = useLocation();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [data, setData] = useState<Account | null>(null);

  useEffect(() => {
    if (location) {
      setData(location?.state?.data ?? null);
    }
  }, [location]);

  const textStyle = "flex-2 flex items-center";

  return (
    <PageLayout>
      <div className="w-full h-full flex flex-col">
        {data ? (
          <div className="w-full h-full flex flex-col">
            <div>
              {/* 계좌정보 영역 */}
              <div className="flex-center flex-col">
                <div className="flex justify-between">
                  <SectionTitle
                    text="계좌 정보"
                    withUserName
                    classNames="py-4"
                  />
                  <Button onClick={() => setOpenEditModal(true)}>수정</Button>
                </div>

                <div className="flex flex-col gap-2 p-4 rounded-xl bg-slate-200">
                  <div className="flex gap-4 w-52">
                    <div className="text-lg font-bold text-indigo-900 flex-1">
                      은행명
                    </div>
                    <div className={textStyle}>{data?.bank_name}</div>
                  </div>
                  <div className="flex gap-4 w-52">
                    <div className="text-lg font-bold text-indigo-900 flex-1">
                      자산종류
                    </div>
                    <div className={textStyle}>
                      {ACCOUNT_TYPE_MAP[data?.account_type]}
                    </div>
                  </div>

                  <div className="flex gap-4 w-52">
                    <div className="text-lg font-bold text-indigo-900 flex-1">
                      계좌번호
                    </div>
                    <div className={textStyle}>
                      {accountMasking(data?.account_num)}
                    </div>
                  </div>

                  <div className="flex gap-4 w-52">
                    <div className="text-lg font-bold text-indigo-900 flex-1">
                      잔액
                    </div>
                    <div
                      className={textStyle}
                    >{`${data?.balance.toLocaleString()}원`}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 테이블 영역 */}
            <div className="flex flex-col gap-2 flex-grow">
              <div className="flex px-4">
                <SectionTitle text="입출금 내역" />
              </div>
              <AccountHistoryTable accountId={data.id} />
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
          data={data}
          open={openEditModal}
          setOpen={setOpenEditModal}
        />
      )}
    </PageLayout>
  );
};
