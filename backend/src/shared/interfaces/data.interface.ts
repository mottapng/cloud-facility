export interface RawData {
  ValorPublicando: number;
  ts: number;
}

export const STATUS_NORMAL = 'normal';
export const STATUS_WARNING = 'warning';
export const STATUS_CRITICAL = 'critical';

export type Status =
  | typeof STATUS_NORMAL
  | typeof STATUS_WARNING
  | typeof STATUS_CRITICAL;

export interface ProcessedData {
  value: number;
  status: Status;
  timestamp: Date;
}
