import { memo } from "react";

export const Loader = memo(() => {
  return (
    <div className="w-full h-full flex-center">
      <div className="loader"></div>
    </div>
  );
});
