import { Incident } from "@generated-types/schema-types";
import { parseDayjsOrError } from "@plandek-utils/ts-parse-dayjs";
import { pickRandom } from "@utils/array";
import { timePointsFor } from "@utils/time-points-for";
import * as fs from "fs";
import path from "path";
import CARS from "./cars.json";

const SEVERITIES = [1, 2, 3, 4, 5];

const CAR_IDS = CARS.map((x) => x.id);

const startDate = parseDayjsOrError("2020-06-01"); // June 1st 2020, Monday
const endDate = parseDayjsOrError("2020-06-21"); // June 21st 2020, Sunday

const timePoints = timePointsFor({ startDate, endDate, granularity: "day" });
const DATES = timePoints.map((x) => x.from);

const incidents: Incident[] = [];

for (let i = 0; i < 100; i++) {
  const id = `incident-${i + 1}`;
  const carID = pickRandom(CAR_IDS);
  const severity = pickRandom(SEVERITIES);
  const date = pickRandom(DATES);
  incidents.push({ id, carID, severity, date });
}

const raw = incidents.map((x) => ({ ...x, date: x.date.toISOString() }));
const serialized = JSON.stringify(raw);

const dir = path.dirname(__filename);
const jsonFilename = path.join(dir, "incidents.json");
fs.writeFileSync(jsonFilename, serialized);
console.log("[DATA GENERATOR] incidents.json file generated");
