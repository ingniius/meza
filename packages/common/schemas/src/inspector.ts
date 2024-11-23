import type { Knex } from "knex";

import { Cockroach, MSSQL, MySQL, Oracle, Pg, SQLite3 } from "./adapters";
import type { InspectorConstructor } from "./types";

/**
 * @publicApi
 * @name createInspector
 * @param knex
 */
export const createInspector = (knex: Knex) => {
  let constructor: InspectorConstructor;

  switch (knex.client.constructor.name) {
    case "Client_CockroachDB":
      constructor = Cockroach;
      break;
    case "Client_MySQL":
    case "Client_MySQL2":
      constructor = MySQL;
      break;
    case "Client_MSSQL":
      constructor = MSSQL;
      break;
    case "Client_Oracledb":
    case "Client_Oracle":
      constructor = Oracle;
      break;
    case "Client_PG":
      constructor = Pg;
      break;
    case "Client_SQLite3":
      constructor = SQLite3;
      break;

    default:
      throw Error("Unsupported driver used: " + knex.client.constructor.name);
  }

  return new constructor(knex);
};
