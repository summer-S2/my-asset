import classNames from "classnames";
import type { ReactNode } from "react";
import type { SortStateType } from "../../types/common";
import { SortIcon } from "../../assets/icons/SortIcon";
import { toggleSort } from "../../utils/fn";
import { useUpdateSearchParams } from "../../hooks/useUpdateSearchParams";

interface Props<T> {
  contents: ReactNode;
  onClick?: () => void;
  sortState?: SortStateType<T>;
  setSortState?: React.Dispatch<React.SetStateAction<SortStateType<T>>>;
  sortKey?: keyof T;
}

export const TableHeader = <T,>({
  contents,
  onClick,
  sortState,
  setSortState,
  sortKey,
}: Props<T>) => {
  const { updateParams } = useUpdateSearchParams();

  return (
    <div
      onClick={
        sortKey && setSortState
          ? () => {
              toggleSort(sortKey, setSortState);
              updateParams({ page: 1 });
            }
          : onClick
      }
      className={classNames("flex-center", {
        "gap-1": !!sortState,
      })}
    >
      {contents}
      {sortState && (
        <SortIcon order={sortState.key === sortKey ? sortState.order : null} />
      )}
    </div>
  );
};
