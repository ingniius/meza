import type { MergeCoreCollection } from "../index";
import type { MezaFolder } from "./folder";
import type { MezaUser } from "./user";

/**
 * @publicApi
 */
export type MezaFile<Schema = any> = MergeCoreCollection<
  Schema,
  "meza_files",
  {
    id: string;
    storage: string;
    filename_disk: string | null;
    filename_download: string;
    title: string | null;
    type: string | null;
    folder: MezaFolder<Schema> | string | null;
    uploaded_by: MezaUser<Schema> | string | null;
    uploaded_on: "datetime";
    modified_by: MezaUser<Schema> | string | null;
    modified_on: "datetime";
    charset: string | null;
    filesize: string | null;
    width: number | null;
    height: number | null;
    duration: number | null;
    embed: unknown | null;
    description: string | null;
    location: string | null;
    tags: string[] | null;
    metadata: Record<string, any> | null;
    focal_point_x: number | null;
    focal_point_y: number | null;
  }
>;
