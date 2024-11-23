import type { Column, ForeignKey, Overview, Table } from "@azem/types/schema";

import type { Knex } from "knex";

/**
 * @publicApi
 */
export interface Inspector {
  knex: Knex;
  //
  overview: () => Promise<Overview>;
  //
  tables(): Promise<string[]>;
  tableInfo(): Promise<Table[]>;
  tableInfo(table: string): Promise<Table>;
  hasTable(table: string): Promise<boolean>;
  //
  columns(table?: string): Promise<{ table: string; column: string }[]>;
  columnInfo(): Promise<Column[]>;
  columnInfo(table?: string): Promise<Column[]>;
  columnInfo(table: string, column: string): Promise<Column>;
  hasColumn(table: string, column: string): Promise<boolean>;
  //
  primary(table: string): Promise<string | null>;
  foreignKeys(table?: string): Promise<ForeignKey[]>;
  // Not in MySQL
  withSchema?(schema: string): void;
}

/**
 * @publicApi
 */
export interface InspectorConstructor {
  new (knex: Knex): Inspector;
}
