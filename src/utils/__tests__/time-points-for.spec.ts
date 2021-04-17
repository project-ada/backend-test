import { parseDayjsOrError } from "@plandek-utils/ts-parse-dayjs";
import { timePointsFor } from "@utils/time-points-for";
import { TimePoint } from "@utils/types";

describe("timePointsFor({ startDate, endDate, granularity }) => TimePoint[]", () => {
  it("calculates the time points that represent each bucket of the time series and returns them (in order)", () => {
    const startDate = parseDayjsOrError("2020-01-06T00:00:00.000Z");
    const endDate = parseDayjsOrError("2020-01-08T23:59:59.999Z");
    const granularity = "day";
    const expected: TimePoint[] = [
      {
        from: parseDayjsOrError("2020-01-06T00:00:00.000Z"),
        to: parseDayjsOrError("2020-01-06T23:59:59.999Z"),
      },
      {
        from: parseDayjsOrError("2020-01-07T00:00:00.000Z"),
        to: parseDayjsOrError("2020-01-07T23:59:59.999Z"),
      },
      {
        from: parseDayjsOrError("2020-01-08T00:00:00.000Z"),
        to: parseDayjsOrError("2020-01-08T23:59:59.999Z"),
      },
    ];

    expect(timePointsFor({ startDate, endDate, granularity })).toEqual(expected);
  });

  it("works with granularity week (ok with end point not being sunday eod)", () => {
    const startDate = parseDayjsOrError("2020-01-06T00:00:00.000Z");
    const endDate = parseDayjsOrError("2020-01-23T23:59:59.999Z");
    const granularity = "week";
    const expected: TimePoint[] = [
      {
        from: parseDayjsOrError("2020-01-06T00:00:00.000Z"),
        to: parseDayjsOrError("2020-01-12T23:59:59.999Z"),
      },
      {
        from: parseDayjsOrError("2020-01-13T00:00:00.000Z"),
        to: parseDayjsOrError("2020-01-19T23:59:59.999Z"),
      },
      {
        from: parseDayjsOrError("2020-01-20T00:00:00.000Z"),
        to: parseDayjsOrError("2020-01-23T23:59:59.999Z"),
      },
    ];

    expect(timePointsFor({ startDate, endDate, granularity })).toEqual(expected);
  });
});
