import { Empty, List } from "antd";
import { useGetAccountHistoryAll } from "../../../hooks/useGetAccountHistoryAll";
import { BANK_TYPE_MAP, TRANSACTION_TYPE_MAP } from "../../../utils/constants";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../../components/common/Loader";
import { formatKST } from "../../../utils/fn";
import { SectionTitle } from "../../../components/common/SectionTitle";

export const MonthlyCard = () => {
  const navigate = useNavigate();
  const { data, isPending } = useGetAccountHistoryAll({
    keyword: "2025-07",
  });

  return (
    <div className="h-[320px] overflow-scroll relative flex flex-grow flex-col p-4 pt-0">
      <SectionTitle
        text="이번달 입출금 내역"
        classNames="sticky top-0 bg-white py-1 z-10 justify-start"
      />

      {isPending ? (
        <Loader />
      ) : data && data?.result.list.length > 0 ? (
        <List
          itemLayout="horizontal"
          dataSource={data?.result.list ?? []}
          renderItem={(item) => (
            <List.Item
              onClick={() => {
                navigate(`/account/${item.account_id}?keyword=${"2025-07"}`);
              }}
              className="hover:bg-indigo-50 rounded-md "
              style={{ padding: "4px", cursor: "pointer" }}
            >
              <List.Item.Meta
                title={
                  <div className="font-semibold text-indigo-900">
                    {BANK_TYPE_MAP[item.bank_id]}
                  </div>
                }
                description={
                  <div className="flex gap-2">
                    <p>{formatKST(item.transaction_date)}</p>
                    <p>{item.transactor}</p>
                    <p
                      className={classNames("font-semibold", {
                        "text-red-500": item.transaction_type === "WITHDRAWAL",
                        "text-blue-500": item.transaction_type === "DEPOSIT",
                      })}
                    >{`${
                      TRANSACTION_TYPE_MAP[item.transaction_type]
                    } ${item.amount.toLocaleString()}원`}</p>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      ) : (
        <div className="flex-grow flex-center">
          <Empty description={`이번달 입출금 내역이 없습니다. 😅`} />
        </div>
      )}
    </div>
  );
};
