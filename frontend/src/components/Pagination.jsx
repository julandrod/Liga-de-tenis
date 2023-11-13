"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ButtonLink from "./ButtonLink";

const Pagination = ({ totalCount, pageSize }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const page = searchParams.get("page") || 1;

  const params = new URLSearchParams(searchParams);

  const hasPrev = pageSize * (parseInt(page) - 1) > 0;
  const hasNext = pageSize * (parseInt(page) - 1) + pageSize < totalCount;

  const handlePagination = (type) => {
    type === "prev"
      ? params.set("page", parseInt(page) - 1)
      : params.set("page", parseInt(page) + 1);
    replace(`${pathname}?${params}`);
  };

  return (
    <div className="flex justify-between items-center p-4">
      <div>
        <ButtonLink
          text="Anterior"
          disabled={!hasPrev}
          onClick={() => handlePagination("prev")}
        />
        <ButtonLink
          text="Siguiente"
          disabled={!hasNext}
          onClick={() => handlePagination("next")}
        />
      </div>
      <div className="flex">
        <p className="mr-4">Página: {page}</p>
        <p>Total: {totalCount}</p>
      </div>
    </div>
  );
};

export default Pagination;
