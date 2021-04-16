import { isNotNone } from "@plandek-utils/safe-compact";
import { Dayjs, parseDayjs, TimeDefault } from "@plandek-utils/ts-parse-dayjs";
import { ParseOptions } from "@plandek-utils/ts-parse-dayjs/build/main/options";
import { safeFloat } from "@utils/safe-float";
import { GraphQLScalarType, ValueNode } from "graphql";
import { GraphQLError } from "graphql/error";
import { Kind } from "graphql/language";
import { round } from "lodash";

const nameTypeForFloat = (precision: number): string => `FloatRounded${precision}`;

function typeForFloat(precision: number): GraphQLScalarType {
  return new GraphQLScalarType({
    name: nameTypeForFloat(precision),
    description: `float number, rounded to ${precision} precision`,

    serialize(raw: number | null): number | null {
      return isNotNone(raw) ? round(raw, precision) : null;
    },

    parseValue(value: string | number | null): number | null {
      return isNotNone(value) ? round(safeFloat(value), precision) : null;
    },

    parseLiteral(ast: ValueNode): number | null {
      if (ast.kind !== Kind.STRING && ast.kind !== Kind.INT) {
        throw new GraphQLError(`Can only parse strings & integers to floats but got a: ${ast.kind}`);
      }
      const value = ast.value;
      return isNotNone(value) ? round(safeFloat(value), precision) : null;
    },
  });
}

function typeForDate(name: string, options?: ParseOptions): GraphQLScalarType {
  return new GraphQLScalarType({
    name,
    serialize(value: Dayjs | Date | string | number): string {
      const d = parseDayjs(value, options);
      if (!d) {
        throw new TypeError(`Value is not a valid Date: ${JSON.stringify(value)}`);
      }
      return d.toISOString();
    },

    parseValue(value: Dayjs | Date | string | number): Dayjs {
      const d = parseDayjs(value, options);
      if (!d) {
        throw new TypeError(`Value is not a valid Date: ${JSON.stringify(value)}`);
      }
      return d;
    },

    parseLiteral(ast: ValueNode): Dayjs {
      if (ast.kind !== Kind.STRING && ast.kind !== Kind.INT) {
        throw new GraphQLError(`Can only parse strings & integers to dates but got a: ${ast.kind}`);
      }
      const d = parseDayjs(ast.value, options);
      if (!d) {
        throw new GraphQLError(`Value is not a valid Date: ${JSON.stringify(ast.value)}`);
      }
      return d;
    },
  });
}

export default {
  [nameTypeForFloat(1)]: typeForFloat(1),
  [nameTypeForFloat(2)]: typeForFloat(2),
  JSDate: typeForDate("JSDate"),
  UTCDate: typeForDate("UTCDate"),
  UTCEndOfDay: typeForDate("UTCEndOfDay", { time: TimeDefault.EndOfDayIfMissing }),
  UTCStartOfDay: typeForDate("UTCStartOfDay", { time: TimeDefault.StartOfDayIfMissing }),
};
