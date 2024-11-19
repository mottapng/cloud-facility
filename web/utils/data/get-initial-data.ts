"server only";

import { Data } from "../types";

export async function getInitialData() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not set");
  }

  const result = await fetch(`${apiUrl}/api/initial-data`);

  const data: Data = await result.json();
  return data;
}
