import { safeCompact } from "@plandek-utils/safe-compact";
import { Dayjs, parseDayjsOrError } from "@plandek-utils/ts-parse-dayjs";

export type RawIncident = { id: number; carID: number; severity: number; date: string | Dayjs };
export type Incident = { id: number; carID: number; severity: number; date: Dayjs };

export interface IncidentsAPI {
  loadIncidents(): Promise<Incident[]>;
}

export function buildIncidentsAPIFor(rawData: RawIncident[]): IncidentsAPI {
  return new IncidentsAPIStatic(rawData);
}

class IncidentsAPIStatic implements IncidentsAPI {
  constructor(protected readonly rawData: RawIncident[]) {}

  loadIncidents(): Promise<Incident[]> {
    return Promise.resolve(
      safeCompact(
        this.rawData.map((raw) => {
          const date = parseDayjsOrError(raw.date);
          return { ...raw, date };
        })
      )
    );
  }
}
