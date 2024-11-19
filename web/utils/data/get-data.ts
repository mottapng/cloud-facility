"server only";

import { ErrorResponse, GetDataResponse } from "../types";

const DEFAULT_PARAMS = {
  limit: 10,
};

export async function getData({
  params,
}: {
  params: URLSearchParams;
}): Promise<{
  data: GetDataResponse | null;
  error: ErrorResponse | null;
}> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const newParams = new URLSearchParams(params.toString());
    newParams.set("limit", DEFAULT_PARAMS.limit.toString());

    if (!apiUrl) {
      throw new Error("NEXT_PUBLIC_API_URL is not set");
    }

    const result = await fetch(`${apiUrl}/api/data?${newParams}`);

    let response = await result.json();
    return { data: response, error: null };
  } catch (error) {
    return {
      data: null,
      error: {
        title: "Não foi possível buscar os dados",
        description:
          "Ocorreu um problema ao buscar os dados, por favor tente novamente mais tarde.",
      },
    };
  }
}
