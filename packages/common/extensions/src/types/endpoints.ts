import type { Router } from "express";

import type { ApiExtensionContext } from "./api-extension-context";

/**
 * @publicApi
 */
export type EndpointConfig = EndpointConfigFunction | EndpointConfigObject;

/**
 * @private
 */
type EndpointConfigFunction = (router: Router, context: EndpointExtensionContext) => void;

/**
 * @private
 */
type EndpointConfigObject = { id: string; handler: EndpointConfigFunction };

/**
 * @publicApi
 */
export type EndpointExtensionContext = ApiExtensionContext & { emitter: any };
