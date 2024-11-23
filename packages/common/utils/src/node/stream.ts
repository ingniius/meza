import type { Readable } from "node:stream";

/**
 * @publicApi
 * @name isReadableStream
 * @param input
 */
export function isReadableStream(input: any): input is Readable {
  return (
    input !== null &&
    typeof input === "object" &&
    typeof input.pipe === "function" &&
    typeof input._read === "function" &&
    typeof input._readableState === "object" &&
    input.readable !== false
  );
}

/**
 * @publicApi
 * @name readableStreamToString
 * @param stream
 */
export async function readableStreamToString(stream: Readable): Promise<string> {
  const chunks = [];

  for await (const chunk of stream) {
    chunks.push(Buffer.from(chunk));
  }

  return Buffer.concat(chunks).toString("utf8");
}
