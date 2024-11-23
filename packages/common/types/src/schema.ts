/**
 * @publicApi
 */
export interface Column {
  name: string;
  table: string;
  //
  data_type: string;
  default_value: string | number | boolean | null;
  max_length: number | null;
  numeric_precision: number | null;
  numeric_scale: number | null;
  //
  foreign_key_column: string | null;
  foreign_key_table: string | null;
  generation_expression?: string | null;
  has_auto_increment: boolean;
  is_nullable: boolean;
  is_unique: boolean;
  is_indexed: boolean;
  is_primary_key: boolean;
  is_generated: boolean;
  // Not supported in SQLite or MSSQL
  comment?: string | null;
  // Postgres Only
  foreign_key_schema?: string | null;
  schema?: string;
}

/**
 * @publicApi
 */
export type ForeignKey = {
  table: string;
  column: string;
  foreign_key_table: string;
  foreign_key_column: string;
  foreign_key_schema?: string;
  constraint_name: null | string;
  on_update: null | "NO ACTION" | "RESTRICT" | "CASCADE" | "SET NULL" | "SET DEFAULT";
  on_delete: null | "NO ACTION" | "RESTRICT" | "CASCADE" | "SET NULL" | "SET DEFAULT";
};

/**
 * @publicApi
 */
export interface Overview {
  [table: string]: {
    primary: string | null;
    columns: {
      [column: string]: {
        table_name: string;
        column_name: string;
        default_value: string | null;
        is_nullable: boolean;
        is_generated: boolean;
        data_type: string;
        numeric_precision?: number | null;
        numeric_scale?: number | null;
        max_length: number | null;
      };
    };
  };
}

/**
 * @publicApi
 */
export interface Table {
  name: string;
  // Not supported in SQLite + comment in mssql
  comment?: string | null;
  schema?: string;
  // MySQL Only
  collation?: string;
  engine?: string;
  // Postgres Only
  owner?: string;
  // SQLite Only
  sql?: string;
  //MSSQL only
  catalog?: string;
}
