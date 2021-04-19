import { QueryResolvers } from "@generated-types/schema-types";

const Query: Required<Pick<QueryResolvers, "cars" | "incidents">> = {
  cars: (_root, args, context) => {
    return context.carsAPI.loadCars();
  },
  incidents: (_root, args, context) => {
    return context.incidentsAPI.loadIncidents();
  },
};

export default { Query };
