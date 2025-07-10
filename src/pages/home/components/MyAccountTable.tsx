import { createColumnHelper } from "@tanstack/react-table";
import { Loader } from "../../../components/common/Loader";
import { Table } from "../../../components/common/Table";
import type { AccountDataType, OrderType } from "../../../types/common";
import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { accountMasking, formatKoreanCurrency } from "../../../utils/fn";
import { SortIcon } from "../../../assets/icons/SortIcon";

interface SortStateType {
  key: keyof AccountDataType | null;
  order: OrderType;
}

interface Props {
  data: AccountDataType[] | null;
  isLoading?: boolean;
}

export const MyAccountTable = ({ data, isLoading }: Props) => {
  const [page, setPage] = useState(1);
  const [pageSize, _setPageSize] = useState(10);
  const [pagedDate, setPagedData] = useState<AccountDataType[]>([]); // 페이징 처리된 데이터
  const [selectedRow, setSelectedRow] = useState<AccountDataType | null>(null);
  const columnHelper = createColumnHelper<AccountDataType>();
  const [sortState, setSortState] = useState<SortStateType>({
    key: null,
    order: null,
  });

  useEffect(() => {
    if (!data) return;
    setPagedData(data.slice((page - 1) * 10, pageSize * page));
  }, [page, data]);

  const toggleSort = (key: keyof AccountDataType) => {
    setSortState((prev) => {
      let nextOrder: "asc" | "desc" | null;

      if (prev.key !== key) nextOrder = "asc";
      else if (prev.order === "asc") nextOrder = "desc";
      else if (prev.order === "desc") nextOrder = null;
      else nextOrder = "asc";

      // 정렬 적용
      if (!data) return { key, order: nextOrder };

      let sorted = [...data];

      if (nextOrder) {
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
      }

      const sliced = sorted.slice((page - 1) * pageSize, page * pageSize);
      setPagedData(sliced);

      return { key: nextOrder ? key : null, order: nextOrder };
    });
  };

  const columns = [
    // 은행명
    columnHelper.accessor("bankName", {
      header: () => (
        <div
          className="flex-center gap-1"
          onClick={() => toggleSort("bankName")}
        >
          은행명
          <SortIcon
            order={sortState.key === "bankName" ? sortState.order : null}
          />
        </div>
      ),
      cell: (info) => <div className="flex-center">{info.getValue()}</div>,
    }),
    // 자산종류
    columnHelper.accessor("accountType", {
      header: () => (
        <div
          className="flex-center gap-1"
          onClick={() => toggleSort("accountType")}
        >
          자산종류
          <SortIcon
            order={sortState.key === "accountType" ? sortState.order : null}
          />
        </div>
      ),
      cell: (info) => <div className="flex-center">{info.getValue()}</div>,
    }),
    // 계좌번호
    columnHelper.accessor("accountNumber", {
      header: () => (
        <div
          className="flex-center gap-1"
          onClick={() => toggleSort("accountNumber")}
        >
          계좌번호
          <SortIcon
            order={sortState.key === "accountNumber" ? sortState.order : null}
          />
        </div>
      ),
      cell: (info) => (
        <div className="flex-center">{accountMasking(info.getValue())}</div>
      ),
    }),
    // 잔액
    columnHelper.accessor("amount", {
      header: () => (
        <div className="flex-center gap-1" onClick={() => toggleSort("amount")}>
          잔액
          <SortIcon
            order={sortState.key === "accountNumber" ? sortState.order : null}
          />
        </div>
      ),
      cell: (info) => (
        <div className="flex-center">
          {formatKoreanCurrency(info.getValue())}
        </div>
      ),
    }),
    // 계좌생성일
    columnHelper.accessor("regiDate", {
      header: () => (
        <div
          className="flex-center gap-1"
          onClick={() => toggleSort("regiDate")}
        >
          계좌생성일
          <SortIcon
            order={sortState.key === "accountNumber" ? sortState.order : null}
          />
        </div>
      ),
      cell: (info) => <div className="flex-center">{info.getValue()}</div>,
    }),
  ];

  return (
    <div className="w-full h-full">
      {isLoading ? (
        <Loader />
      ) : pagedDate && pagedDate.length > 0 ? (
        <div className="w-full flex-center flex-col gap-4">
          <Table
            tableData={pagedDate}
            columns={columns}
            onRowClick={(row) => setSelectedRow(row)}
          />
          <Pagination
            current={page}
            total={data?.length}
            pageSize={pageSize}
            onChange={setPage}
          />
        </div>
      ) : (
        <div>데이터가 없습니다..</div>
      )}
    </div>
  );
};
