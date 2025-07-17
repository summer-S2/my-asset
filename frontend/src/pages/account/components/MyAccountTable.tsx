import { createColumnHelper } from "@tanstack/react-table";
import { Loader } from "../../../components/common/Loader";
import { Table } from "../../../components/common/Table";
import type { SortStateType } from "../../../types/common";
import { Button, Empty, Input, Pagination } from "antd";
import React, { useState } from "react";
import { accountMasking, formatKoreanCurrency } from "../../../utils/fn";
import { useNavigate } from "react-router-dom";
import { SectionTitle } from "../../../components/common/SectionTitle";
import { PlusIcon } from "../../../assets/icons/PlusIcon";
import { TableHeader } from "../../../components/common/TableHeader";
import { useGetAccount } from "../../../hooks/useGetAccount";
import type { Account } from "../../../types/api";
import { ACCOUNT_TYPE_MAP } from "../../../utils/constants";
import { useDeleteAccount } from "../../../hooks/useDeleteAccount";
import { useUpdateSearchParams } from "../../../hooks/useUpdateSearchParams";
import { DeleteIcon } from "../../../assets/icons/DeleteIcon";
import { useConfirmStore } from "../../../stores/confirmStore";

interface Props {
  setOpenAddModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MyAccountTable = ({ setOpenAddModal }: Props) => {
  const navigate = useNavigate();
  const columnHelper = createColumnHelper<Account>();
  const { openConfirm } = useConfirmStore();
  const { updateParams, searchParams } = useUpdateSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const keyword = searchParams.get("keyword") || "";
  const limit = Number(searchParams.get("limit") || 10);
  const [input, setInput] = useState(keyword);
  const [sortState, setSortState] = useState<SortStateType<Account>>({
    key: null,
    order: null,
  });

  const { data, isPending } = useGetAccount({
    page,
    limit,
    keyword,
    ...(sortState.order && { sort: `${sortState.key}.${sortState.order}` }),
  });

  const { mutate: del, isPending: delIsPending } = useDeleteAccount();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateParams({ page: 1, keyword: input }); // 검색 시 page 초기화
    // setSearchKeyword(input);
  };

  const columns = [
    // 은행명
    columnHelper.accessor("bank_name", {
      header: () => (
        <TableHeader
          contents={`은행명`}
          sortState={sortState}
          setSortState={setSortState}
          sortKey="bank_name"
        />
      ),
      cell: (info) => <div className="flex-center">{info.getValue()}</div>,
    }),
    // 자산종류
    columnHelper.accessor("account_type", {
      header: () => (
        <TableHeader
          contents={`자산종류`}
          sortState={sortState}
          setSortState={setSortState}
          sortKey="account_type"
        />
      ),
      cell: (info) => (
        <div className="flex-center">{ACCOUNT_TYPE_MAP[info.getValue()]}</div>
      ),
    }),
    // 계좌번호
    columnHelper.accessor("account_num", {
      header: () => (
        <TableHeader
          contents={`계좌번호`}
          sortState={sortState}
          setSortState={setSortState}
          sortKey="account_num"
        />
      ),
      cell: (info) => (
        <div className="flex-center">{accountMasking(info.getValue())}</div>
      ),
    }),
    // 잔액
    columnHelper.accessor("balance", {
      header: () => (
        <TableHeader
          contents={`잔액`}
          sortState={sortState}
          setSortState={setSortState}
          sortKey="balance"
        />
      ),
      cell: (info) => (
        <div className="flex-center">
          {formatKoreanCurrency(info.getValue())}
        </div>
      ),
    }),
    // 계좌생성일
    columnHelper.accessor("create_date", {
      header: () => (
        <TableHeader
          contents={`계좌생성일`}
          sortState={sortState}
          setSortState={setSortState}
          sortKey="create_date"
        />
      ),
      cell: (info) => (
        <div className="flex-center">{info.getValue().split("T")[0]}</div>
      ),
    }),
    // 삭제
    {
      id: "delete",
      header: () => <div className="flex-center">{"삭제"}</div>,
      cell: ({ row }: { row: any }) => (
        <div className="flex-center w-full">
          <Button
            className=""
            shape="circle"
            color="primary"
            variant="solid"
            icon={
              <div className="flex-center">
                <DeleteIcon />
              </div>
            }
            onClick={(e) => {
              e.stopPropagation();
              openConfirm({
                title: "계좌를 삭제하시겠습니까?",
                message: `확인 버튼을 누르면 계좌 정보가 영구히 삭제됩니다.\n삭제된 데이터는 복구할 수 없습니다.`,
                onNext: () => del(row.original.id),
              });
            }}
            loading={delIsPending}
          />
        </div>
      ),
    },
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
        <div>
          {data?.result && data?.result?.list.length > 0
            ? `조회된 데이터: ${data?.result.totalItems ?? 0}건`
            : ``}
        </div>

        <form onSubmit={handleSubmit} className="flex justify-end">
          <div className="flex gap-2 w-80">
            <Input
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="은행명, 계좌번호 검색"
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
        </form>
      </div>
      {isPending ? (
        <Loader />
      ) : data && data.result.list.length > 0 ? (
        <div className="w-full flex-center flex-col gap-4">
          <Table
            tableData={data.result.list}
            columns={columns}
            // onRowClick={(row) => setSelectedRow(row)}
            onRowClick={(row) => {
              // navigate("/detail", { state: { data: row } });
              navigate(`/account/${row.id}`);
            }}
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
        <div className="w-full h-full flex-center">
          <Empty description={`데이터가 없습니다.`} />
        </div>
      )}
    </div>
  );
};
