import { Incident } from "@generated-types/schema-types";
import { parseDayjsOrError } from "@plandek-utils/ts-parse-dayjs";
import { pickRandom } from "@utils/pick-random";
import * as fs from "fs";
import path from "path";
import CARS from "./cars.json";

const SEVERITIES = [1, 2, 3, 4, 5];

const CAR_IDS = CARS.map((x) => x.id);

const DATES = [
  "2020-06-01", // June 1st 2020, Monday
  "2020-06-02",
  "2020-06-03",
  "2020-06-04",
  "2020-06-05",
  "2020-06-06",
  "2020-06-07",
  "2020-06-08",
  "2020-06-09",
  "2020-06-10",
  "2020-06-11",
  "2020-06-12",
  "2020-06-13",
  "2020-06-14",
  "2020-06-15",
  "2020-06-16",
  "2020-06-17",
  "2020-06-18",
  "2020-06-19",
  "2020-06-20",
  "2020-06-21", // June 21st 2020, Sunday
].map((x) => parseDayjsOrError(x));

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
