import { PumpStatus } from "./types";

export const translateStatus = (status: PumpStatus) => {
  switch (status) {
    case "normal":
      return "Normal";
    case "warning":
      return "Aviso";
    case "critical":
      return "Crítico";
  }
}
