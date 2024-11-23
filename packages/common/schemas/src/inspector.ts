import type { Knex } from "knex";

import { Cockroach } from "./shared/adapters/cockroach";
import { MSSQL } from "./shared/adapters/mssql";
import { MySQL } from "./shared/adapters/mysql";
import { Oracle } from "./shared/adapters/oracle";
import { Pg } from "./shared/adapters/pg";
import { SQLite3 } from "./shared/adapters/sqlite3";
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
