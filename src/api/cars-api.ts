import { cloneDeep } from "lodash";
export type Car = { id: number; model: string; type: string; colour: string };

export interface CarsAPI {
  loadCars(): Promise<Car[]>;
}

export function buildCarsAPIFor(rawData: Car[]): CarsAPI {
  return new CarsAPIStatic(rawData);
}

class CarsAPIStatic implements CarsAPI {
  constructor(protected readonly rawData: Car[]) {}

  loadCars(): Promise<Car[]> {
    return Promise.resolve(cloneDeep(this.rawData));
  }
}
