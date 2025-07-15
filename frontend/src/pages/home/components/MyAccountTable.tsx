import { createColumnHelper } from "@tanstack/react-table";
import { Loader } from "../../../components/common/Loader";
import { Table } from "../../../components/common/Table";
import type { AccountDataType, SortStateType } from "../../../types/common";
import { Button, Input, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { accountMasking, formatKoreanCurrency } from "../../../utils/fn";
import { useNavigate } from "react-router-dom";
import { SectionTitle } from "../../../components/common/SectionTitle";
import { PlusIcon } from "../../../assets/icons/PlusIcon";
import { TableHeader } from "../../../components/common/TableHeader";

interface Props {
  data: AccountDataType[] | null;
  isLoading?: boolean;
  setOpenAddModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MyAccountTable = ({ data, isLoading, setOpenAddModal }: Props) => {
  const navigate = useNavigate();
  const columnHelper = createColumnHelper<AccountDataType>();
  const [filteredData, setFilteredData] = useState<AccountDataType[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, _setPageSize] = useState(10);
  const [pagedDate, setPagedData] = useState<AccountDataType[]>([]); // 페이징 처리된 데이터
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색어
  const [sortState, setSortState] = useState<SortStateType<AccountDataType>>({
    key: null,
    order: null,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data && data?.length > 0) {
      const keys: (keyof AccountDataType)[] = ["bankName", "accountNumber"]; // 은행명, 계좌번호
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
    // 은행명
    columnHelper.accessor("bankName", {
      header: () => (
        <TableHeader
          contents={`은행명`}
          sortState={sortState}
          setSortState={setSortState}
          sortKey="bankName"
        />
      ),
      cell: (info) => <div className="flex-center">{info.getValue()}</div>,
    }),
    // 자산종류
    columnHelper.accessor("accountType", {
      header: () => (
        <TableHeader
          contents={`자산종류`}
          sortState={sortState}
          setSortState={setSortState}
          sortKey="accountType"
        />
      ),
      cell: (info) => <div className="flex-center">{info.getValue()}</div>,
    }),
    // 계좌번호
    columnHelper.accessor("accountNumber", {
      header: () => (
        <TableHeader
          contents={`계좌번호`}
          sortState={sortState}
          setSortState={setSortState}
          sortKey="accountNumber"
        />
      ),
      cell: (info) => (
        <div className="flex-center">{accountMasking(info.getValue())}</div>
      ),
    }),
    // 잔액
    columnHelper.accessor("amount", {
      header: () => (
        <TableHeader
          contents={`잔액`}
          sortState={sortState}
          setSortState={setSortState}
          sortKey="amount"
        />
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
        <TableHeader
          contents={`계좌생성일`}
          sortState={sortState}
          setSortState={setSortState}
          sortKey="regiDate"
        />
      ),
      cell: (info) => <div className="flex-center">{info.getValue()}</div>,
    }),
  ];

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="flex justify-between items-center px-4">
        <SectionTitle text="보유 계좌 목록" />

        <Button
          htmlType="button"
          variant="solid"
          color="primary"
          icon={
            <div className="flex-center">
              <PlusIcon />
            </div>
          }
          onClick={() => setOpenAddModal(true)}
        >
          계좌 추가
        </Button>
      </div>
      <div className="flex justify-between items-center px-4">
        <div>{`조회된 데이터: ${filteredData.length ?? 0}건`}</div>

        <form onSubmit={handleSubmit} className="flex justify-end">
          <div className="flex gap-2">
            <Input
              id="searchKeyword"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              width={`200px`}
              placeholder="은행명, 계좌번호 검색"
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
          <Table
            tableData={pagedDate}
            columns={columns}
            // onRowClick={(row) => setSelectedRow(row)}
            onRowClick={(row) => {
              navigate("/detail", { state: { data: row } });
            }}
            isHeaderClickable
          />
          <Pagination
            current={page}
            total={filteredData?.length}
            pageSize={pageSize}
            onChange={setPage}
          />
        </div>
      ) : (
        <div className="w-full h-full flex-center">{`데이터가 없습니다..`}</div>
      )}
    </div>
  );
};
