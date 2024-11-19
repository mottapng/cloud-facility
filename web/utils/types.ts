export interface Pump {
  name: string;
  unit: string;
  status: PumpStatus;
  flow: number;
  lastUpdated: Date;
}

export type PumpStatus = "normal" | "warning" | "critical";

export interface Data {
  value: number;
  timestamp: string;
  status: PumpStatus;
}

export interface ErrorResponse {
  title: string;
  description: string;
}

export interface GetDataResponse {
  data: Data[];
  meta: {
    total: number;
    page: string;
    limit: string;
    totalPages: number;
  };
}

export interface GetDataParams {
  dataStart?: string;
  dataEnd?: string;
  page?: string;
  limit?: string;
  sortBy?: DataSortByTypes;
  sortOrder?: DataSortOrderTypes;
}

export type DataSortByTypes = "value" | "timestamp";
export type DataSortOrderTypes = "asc" | "desc";
