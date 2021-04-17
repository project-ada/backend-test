import { Dayjs } from "@plandek-utils/ts-parse-dayjs";
import { TimePoint } from "./types";

export type Granularity = "day" | "week";

export function timePointsFor(args: { startDate: Dayjs; endDate: Dayjs; granularity: Granularity }): TimePoint[] {
  const { startDate, endDate, granularity } = args;
  const nextDateFor = (date: Dayjs): Dayjs | null => {
    const d = date.startOf(granularity).add(1, granularity);
    return d.isAfter(endDate) ? null : d;
  };

  const toFor = (date: Dayjs): Dayjs => {
    const d = date.add(1, granularity).subtract(1, "millisecond");
    return d.isAfter(endDate) ? endDate : d;
  };

  const dates = [] as Dayjs[];

  let date: Dayjs | null = startDate;

  while (date) {
    dates.push(date);
    date = nextDateFor(date);
  }

  return dates.map((d) => {
    return { from: d, to: toFor(d) };
  });
}
