import type { Dict } from "./util";

/**
 * @publicApi
 */
export interface Flow {
  id: string;
  name: string | null;
  icon: string | null;
  description: string | null;
  status: Status;
  trigger: TriggerType | null;
  options: Dict;
  operation: Operation | null;
  accountability: "all" | "activity" | null;
}

/**
 * @publicApi
 */
export interface Operation {
  id: string;
  name: string | null;
  key: string;
  type: string;
  position_x: number;
  position_y: number;
  options: Dict;
  resolve: Operation | null;
  reject: Operation | null;
}

/**
 * @publicApi
 */
export interface FlowRaw {
  id: string;
  name: string;
  icon: string | null;
  color: string | null;
  description: string | null;
  status: Status;
  trigger: TriggerType | null;
  options: Dict | null;
  operation: string | null;
  operations: OperationRaw[];
  date_created: string;
  user_created: string;
  accountability: "all" | "activity" | null;
}

/**
 * @publicApi
 */
export interface OperationRaw {
  id: string;
  name: string | null;
  key: string;
  type: string;
  position_x: number;
  position_y: number;
  options: Dict;
  resolve: string | null;
  reject: string | null;
  flow: string;
  date_created: string;
  user_created: string;
}

/**
 * @internal
 */
type Status = "active" | "inactive";

/**
 * @publicApi
 */
export type TriggerType = "event" | "schedule" | "operation" | "webhook" | "manual";
