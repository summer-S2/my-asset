import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "../../../components/common/Table";
import type { HistoryData } from "../../../types/api";
import { useEffect, useState } from "react";
import type { SortStateType } from "../../../types/common";
import { Loader } from "../../../components/common/Loader";
import { Button, Input, Pagination } from "antd";
import { TableHeader } from "../../../components/common/TableHeader";

interface Props {
  data: HistoryData[];
  isLoading?: boolean;
}

export const AccountHistoryTable = ({ data, isLoading }: Props) => {
  const columnHelper = createColumnHelper<HistoryData>();
  const [filteredData, setFilteredData] = useState<HistoryData[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, _setPageSize] = useState(10);
  const [pagedDate, setPagedData] = useState<HistoryData[]>([]); // 페이징 처리된 데이터
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색어
  const [sortState, setSortState] = useState<SortStateType<HistoryData>>({
    // 기본 > 날짜별 내림차순
    key: "date",
    order: "desc",
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data && data?.length > 0) {
      const keys: (keyof HistoryData)[] = ["sender", "date"]; // 보낸사람, 거래일 조회
      const filtered = data.filter((item) =>
        keys.some((key) => item[key].toString().includes(searchKeyword))
      );
      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    if (data && data.length > 0) {
      setFilteredData(data);
    } else {
      setFilteredData([]);
    }
  }, [data]);

  useEffect(() => {
    // 정렬 키값이 있음
    if (sortState.key && sortState.order) {
      let sorted = [...filteredData];
      let key = sortState.key;
      let nextOrder = sortState.order;
      sorted.sort((a, b) => {
        const aVal = a[key];
        const bVal = b[key];

        if (typeof aVal === "string" && typeof bVal === "string") {
          return nextOrder === "asc"
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }

        if (typeof aVal === "number" && typeof bVal === "number") {
          return nextOrder === "asc" ? aVal - bVal : bVal - aVal;
        }

        return 0;
      });
      const sliced = sorted.slice((page - 1) * pageSize, page * pageSize);
      setPagedData(sliced);
      return;
    }
    setPagedData(filteredData.slice((page - 1) * 10, pageSize * page));
  }, [page, filteredData, sortState]);

  const columns = [
    columnHelper.accessor("date", {
      header: () => (
        <TableHeader
          contents={`거래일`}
          sortState={sortState}
          setSortState={setSortState}
          sortKey="date"
        />
      ),
      cell: (info) => <div className="flex-center">{info.getValue()}</div>,
    }),
    columnHelper.accessor("transactionType", {
      header: () => (
        <TableHeader
          contents={`거래 유형`}
          sortState={sortState}
          setSortState={setSortState}
          sortKey="transactionType"
        />
      ),
      cell: (info) => <div className="flex-center">{info.getValue()}</div>,
    }),
    columnHelper.accessor("sender", {
      header: () => (
        <TableHeader
          contents={`보낸 사람`}
          sortState={sortState}
          setSortState={setSortState}
          sortKey="sender"
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
    columnHelper.accessor("description", {
      header: () => (
        <TableHeader
          contents={`메모`}
          sortState={sortState}
          setSortState={setSortState}
          sortKey="description"
        />
      ),
      cell: (info) => <div className="flex-center">{info.getValue()}</div>,
    }),
  ];

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="flex justify-between items-center px-4">
        <div>{`조회된 데이터: ${filteredData.length ?? 0}건`}</div>

        <form onSubmit={handleSubmit} className="flex justify-end">
          <div className="flex gap-2">
            <Input
              id="searchKeyword"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              width={`200px`}
              placeholder="거래일, 보낸 사람 검색"
              allowClear
            />
            <Button htmlType="submit">조회</Button>
          </div>
        </form>
      </div>
      {isLoading ? (
        <Loader />
      ) : pagedDate && pagedDate.length > 0 ? (
        <div className="w-full flex-center flex-col gap-4">
          <Table tableData={pagedDate} columns={columns} isHeaderClickable />
          <Pagination
            current={page}
            total={filteredData?.length}
            pageSize={pageSize}
            onChange={setPage}
          />
        </div>
      ) : (
        <div className="flex-grow flex-center">데이터가 없습니다..</div>
      )}
    </div>
  );
};
