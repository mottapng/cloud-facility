import {
  Status,
  STATUS_CRITICAL,
  STATUS_NORMAL,
  STATUS_WARNING,
} from '../interfaces/data.interface';

export function getStatusByValue(value: number): Status {
  if (value > 70) return STATUS_CRITICAL;
  if (value > 40) return STATUS_WARNING;
  return STATUS_NORMAL;
}
