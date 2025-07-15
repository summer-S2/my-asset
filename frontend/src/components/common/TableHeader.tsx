import classNames from "classnames";
import type { ReactNode } from "react";
import type { SortStateType } from "../../types/common";
import { SortIcon } from "../../assets/icons/SortIcon";
import { toggleSort } from "../../utils/fn";

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
  return (
    <div
      onClick={
        sortKey && setSortState
          ? () => toggleSort(sortKey, setSortState)
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
