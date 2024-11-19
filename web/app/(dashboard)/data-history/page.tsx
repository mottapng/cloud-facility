import { DataHistoryFilters } from "@/components/features/data-history/filters";
import { Pagination } from "@/components/features/data-history/pagination";
import { DataHistoryTable } from "@/components/features/data-history/table";
import { ErrorToast } from "@/components/shared/error-toast";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getData } from "@/utils/data/get-data";
import { getURLSearchParams } from "@/utils/functions";

const DataHistory = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const params = getURLSearchParams(searchParams);

  const { data, error } = await getData({ params });

  return (
    <main className="container mx-auto px-6 sm:px-14 flex flex-col items-center w-full h-full py-4 sm:py-8">
      <h2 className="text-3xl font-semibold mb-6 mr-auto">
        Histórico de Dados das Bombas
      </h2>

      <Card className="w-full h-full flex flex-col">
        <CardHeader>
          <DataHistoryFilters />
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <DataHistoryTable data={data?.data || []} />
          {data && (
            <Pagination
              currentPage={Number(data.meta.page)}
              totalPages={Number(data.meta.totalPages)}
              itemsPerPage={Number(data.meta.limit)}
              totalItems={Number(data.meta.total)}
            />
          )}
        </CardContent>
      </Card>
      {error && <ErrorToast error={error} />}
    </main>
  );
};

export default DataHistory;
