import { defaultShouldDehydrateQuery, QueryClient } from "@tanstack/react-query";
import SuperJSON from "superjson";

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      dehydrate: {
        serializeData: SuperJSON.serialize,
        shouldDehydrateQuery: query => defaultShouldDehydrateQuery(query) || query.state.status === "pending",
        shouldRedactErrors: () => false,
      },
      hydrate: { deserializeData: SuperJSON.deserialize },
      queries: { staleTime: 30 * 1000 },
    },
  });
}
