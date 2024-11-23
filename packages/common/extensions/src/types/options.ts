import type { LOCAL_TYPES } from "@azem/tokens/field";
import type { Collection } from "@azem/types/collection";
import type { Field } from "@azem/types/field";
import type { Relation } from "@azem/types/relation";
import type { DeepPartial, Dict } from "@azem/types/util";

/**
 * @publicApi
 */
export type ExtensionOptionsContext = {
  collection: string | undefined;
  editing: string;
  field: DeepPartial<Field>;
  relations: {
    m2o: DeepPartial<Relation> | undefined;
    m2a?: DeepPartial<Relation> | undefined;
    o2m: DeepPartial<Relation> | undefined;
  };
  collections: {
    junction: DeepPartial<Collection & { fields: DeepPartial<Field>[] }> | undefined;
    related: DeepPartial<Collection & { fields: DeepPartial<Field>[] }> | undefined;
  };
  fields: {
    corresponding: DeepPartial<Field> | undefined;
    junctionCurrent: DeepPartial<Field> | undefined;
    junctionRelated: DeepPartial<Field> | undefined;
    sort: DeepPartial<Field> | undefined;
  };

  items: Dict<string, Dict[]>;

  localType: (typeof LOCAL_TYPES)[number];
  autoGenerateJunctionRelation: boolean;
  saving: boolean;
};
