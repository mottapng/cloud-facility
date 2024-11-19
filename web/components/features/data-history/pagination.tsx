"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React, { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
}

const isValidNumber = (value: number): boolean => {
  return typeof value === "number" && !isNaN(value) && isFinite(value);
};

const getStartItem = (page: number, itemsPerPage: number): number => {
  if (!isValidNumber(page) || !isValidNumber(itemsPerPage)) return 0;
  return Math.max((page - 1) * itemsPerPage + 1, 0);
};

const getEndItem = (
  page: number,
  itemsPerPage: number,
  totalItems: number
): number => {
  if (
    !isValidNumber(page) ||
    !isValidNumber(itemsPerPage) ||
    !isValidNumber(totalItems)
  )
    return 0;
  return Math.min(page * itemsPerPage, totalItems);
};

const formatPaginationText = (
  start: number,
  end: number,
  total: number
): string => {
  if (!isValidNumber(start) || !isValidNumber(end) || !isValidNumber(total)) {
    return "0 - 0 de 0";
  }
  return `${start} - ${end} de ${total}`;
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [page, setPage] = useState(currentPage);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    handlePageParams(newPage);
  };

  const handlePageParams = useCallback(
    (page: number) => {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("page", page.toString());
      router.push(`${pathname}?${newParams.toString()}`);
    },
    [searchParams, pathname, router]
  );

  const startItem = getStartItem(page, itemsPerPage);
  const endItem = getEndItem(page, itemsPerPage, totalItems);
  const paginationText = formatPaginationText(startItem, endItem, totalItems);

  return (
    <div className="w-full flex justify-between space-x-2 mt-4">
      <div className="flex items-center space-x-2">
        <span className="text-sm text-muted-foreground">{paginationText}</span>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1 || !isValidNumber(page)}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(page + 1)}
          disabled={
            page >= totalPages ||
            !isValidNumber(page) ||
            !isValidNumber(totalPages)
          }
        >
          Próximo
        </Button>
      </div>
    </div>
  );
};
