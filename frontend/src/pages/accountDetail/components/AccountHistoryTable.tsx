import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "../../../components/common/Table";
import type { History } from "../../../types/api";
import { useState } from "react";
import type { SortStateType } from "../../../types/common";
import { Loader } from "../../../components/common/Loader";
import { Button, Empty, Input, Pagination } from "antd";
import { TableHeader } from "../../../components/common/TableHeader";
import { useGetAccountHistory } from "../../../hooks/useGetAccountHistory";
import { TRANSACTION_TYPE_MAP } from "../../../utils/constants";
import { useUpdateSearchParams } from "../../../hooks/useUpdateSearchParams";

interface Props {
  accountId: number;
  // data: History[];
}

export const AccountHistoryTable = ({ accountId }: Props) => {
  const columnHelper = createColumnHelper<History>();
  const { updateParams, searchParams } = useUpdateSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const keyword = searchParams.get("keyword") || "";
  const limit = Number(searchParams.get("limit") || 10);
  const [input, setInput] = useState(keyword);
  const [sortState, setSortState] = useState<SortStateType<History>>({
    // 기본 > 날짜별 내림차순
    // key: "transaction_date",
    // order: "desc",
    key: null,
    order: null,
  });

  const { data, isPending } = useGetAccountHistory({
    page,
    limit,
    keyword,
    accountId: accountId,
    ...(sortState.order && { sort: `${sortState.key}.${sortState.order}` }),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateParams({ page: 1, keyword: input }); // 검색 시 page 초기화
    // setSearchKeyword(input);
  };

  const columns = [
    columnHelper.accessor("transaction_date", {
      header: () => (
        <TableHeader
          contents={`거래일`}
          sortState={sortState}
          setSortState={setSortState}
          sortKey="transaction_date"
        />
      ),
      cell: (info) => (
        <div className="flex-center">{info.getValue().split("T")[0]}</div>
      ),
    }),
    columnHelper.accessor("transaction_type", {
      header: () => (
        <TableHeader
          contents={`거래 유형`}
          sortState={sortState}
          setSortState={setSortState}
          sortKey="transaction_type"
        />
      ),
      cell: (info) => (
        <div className="flex-center">
          {TRANSACTION_TYPE_MAP[info.getValue()]}
        </div>
      ),
    }),
    columnHelper.accessor("transactor", {
      header: () => (
        <TableHeader
          contents={`거래자`}
          sortState={sortState}
          setSortState={setSortState}
          sortKey="transactor"
        />
      ),
      cell: (info) => <div className="flex-center">{info.getValue()}</div>,
    }),
    columnHelper.accessor("amount", {
      header: () => (
        <TableHeader
          contents={`금액`}
          sortState={sortState}
          setSortState={setSortState}
          sortKey="amount"
        />
      ),
      cell: (info) => (
        <div className="flex-center">{`${
          info.getValue().toLocaleString() ?? 0
        }원`}</div>
      ),
    }),
    columnHelper.accessor("memo", {
      header: () => (
        <TableHeader
          contents={`메모`}
          sortState={sortState}
          setSortState={setSortState}
          sortKey="memo"
        />
      ),
      cell: (info) => <div className="flex-center">{info.getValue()}</div>,
    }),
  ];

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="flex justify-between items-center px-4">
        <div>{`조회된 데이터: ${data?.result.totalItems ?? 0}건`}</div>

        <form onSubmit={handleSubmit} className="flex justify-end">
          {
            <div className="flex gap-2">
              <Input
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                width={`200px`}
                placeholder="거래일, 보낸 사람 검색"
                allowClear
                disabled={!keyword && data?.result.totalItems === 0}
              />
              <Button
                htmlType="submit"
                disabled={!keyword && data?.result.totalItems === 0}
              >
                조회
              </Button>
            </div>
          }
        </form>
      </div>
      {isPending ? (
        <Loader />
      ) : data && data.result.list.length > 0 ? (
        <div className="w-full flex-center flex-col gap-4">
          <Table
            tableData={data.result.list}
            columns={columns}
            isHeaderClickable
          />
          <Pagination
            current={page}
            total={data.result.totalItems}
            pageSize={limit}
            // onChange={setPage}
            onChange={(page) => updateParams({ page })}
          />
        </div>
      ) : (
        <div className="flex-grow flex-center">
          <Empty description={`데이터가 없습니다.`} />
        </div>
      )}
    </div>
  );
};
