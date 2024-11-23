import type { MezaFile } from "../../../schemas/file";
import type { AssetsQuery } from "../../../types";
import type { RestCommand } from "../../types";
import { throwIfEmpty } from "../../utils";

/**
 * @publicApi
 * @name readAssetRaw
 * @description Read the contents of a file as a ReadableStream.
 * @param key
 * @param query
 */
export const readAssetRaw =
  <Schema>(key: MezaFile<Schema>["id"], query?: AssetsQuery): RestCommand<ReadableStream<Uint8Array>, Schema> =>
  () => {
    throwIfEmpty(String(key), "Key cannot be empty");

    return {
      path: `/assets/${key}`,
      params: query ?? {},
      method: "GET",
      onResponse: (response) => response.body,
    };
  };

/**
 * @publicApi
 * @name readAssetBlob
 * @description Read the contents of a file as a Blob.
 * @param key
 * @param query
 */
export const readAssetBlob =
  <Schema>(key: MezaFile<Schema>["id"], query?: AssetsQuery): RestCommand<Blob, Schema> =>
  () => {
    throwIfEmpty(String(key), "Key cannot be empty");

    return {
      path: `/assets/${key}`,
      params: query ?? {},
      method: "GET",
      onResponse: (response) => response.blob(),
    };
  };

/**
 * @publicApi
 * @name readAssetArrayBuffer
 * @description Read the contents of a file as a ArrayBuffer.
 * @param key
 * @param query
 */
export const readAssetArrayBuffer =
  <Schema>(key: MezaFile<Schema>["id"], query?: AssetsQuery): RestCommand<ArrayBuffer, Schema> =>
  () => {
    throwIfEmpty(String(key), "Key cannot be empty");

    return {
      path: `/assets/${key}`,
      params: query ?? {},
      method: "GET",
      onResponse: (response) => response.arrayBuffer(),
    };
  };
