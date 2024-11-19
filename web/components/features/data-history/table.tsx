"use client";

import { ArrowUpDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { translateStatus } from "@/utils/translate";
import { Data, DataSortByTypes } from "@/utils/types";

export const DataHistoryTable = ({ data }: { data: Data[] | undefined }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSortParams = useCallback(
    (key: DataSortByTypes) => {
      const newParams = new URLSearchParams(searchParams.toString());
      const currentSortBy = newParams.get("sortBy");
      const currentSortOrder = newParams.get("sortOrder");

      if (currentSortBy === key) {
        if (currentSortOrder === "asc") {
          newParams.set("sortOrder", "desc");
        } else if (currentSortOrder === "desc") {
          newParams.delete("sortBy");
          newParams.delete("sortOrder");
        }
      } else {
        newParams.set("sortBy", key);
        newParams.set("sortOrder", "asc");
      }

      router.push(`${pathname}?${newParams.toString()}`);
    },
    [searchParams, pathname, router]
  );

  return (
    <div className="h-full max-h-[calc(100vh-360px)] overflow-y-auto">
      <Table className={data && data.length % 2 === 1 ? "border-b" : ""}>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[25%]">
              <Button variant="ghost" className="w-full">
                Bomba
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="w-[25%]">
              <Button
                variant="ghost"
                className={`w-full ${
                  searchParams.get("sortBy") === "value" ? "bg-accent" : ""
                }`}
                onClick={() => handleSortParams("value")}
              >
                Vazão (L/s)
                <ArrowUpDown
                  className={`ml-2 h-4 w-4 transition-transform duration-200 ${
                    searchParams.get("sortBy") === "value" &&
                    searchParams.get("sortOrder") === "asc"
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </Button>
            </TableHead>
            <TableHead className="w-[15%]">
              <Button variant="ghost" className="w-full">
                Status
              </Button>
            </TableHead>
            <TableHead className="w-[35%] text-right">
              <Button
                variant="ghost"
                className={`w-full ${
                  searchParams.get("sortBy") === "timestamp" ? "bg-accent" : ""
                }`}
                onClick={() => handleSortParams("timestamp")}
              >
                Data e Hora
                <ArrowUpDown
                  className={`ml-2 h-4 w-4 transition-transform duration-200 ${
                    searchParams.get("sortBy") === "timestamp" &&
                    searchParams.get("sortOrder") === "asc"
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.map((data, index) => (
              <TableRow
                key={index}
                className={index % 2 === 0 ? "bg-background" : "bg-muted/50"}
              >
                <TableCell className="text-center">Bomba MQTT</TableCell>
                <TableCell className="text-center">{data.value}</TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline">{translateStatus(data.status)}</Badge>
                </TableCell>
                <TableCell className="text-center whitespace-nowrap">
                  {new Date(data.timestamp).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};
