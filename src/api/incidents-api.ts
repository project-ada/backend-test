import { Incident } from "@generated-types/schema-types";
import { safeCompact } from "@plandek-utils/safe-compact";
import { Dayjs, parseDayjsOrError } from "@plandek-utils/ts-parse-dayjs";

export type RawIncident = Omit<Incident, "date"> & { date: string | Dayjs };

export function rawIncidentFrom(x: Incident): RawIncident {
  return { ...x, date: x.date.toISOString() };
}

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
