// ets_tracing: off

import type { TaggedUnionURI } from "../../Algebra/TaggedUnion/index.js"
import { interpreter } from "../../HKT/index.js"
import { mapRecord } from "../../Utils/index.js"
import { reorderApplyConfig, ReorderType, ReorderURI } from "../base/index.js"

export const reorderTaggedUnionInterpreter = interpreter<ReorderURI, TaggedUnionURI>()(
  () => ({
    _F: ReorderURI,
    taggedUnion: (tag, types, config) => (env) => {
      const reorders = mapRecord(types, (a) => a(env).reorder)

      return new ReorderType(
        reorderApplyConfig(config?.conf)(
          {
            reorder: (u) => reorders[u[tag as any] as any].reorder(u)
          },
          env,
          {
            reorders: reorders as any
          }
        )
      )
    }
  })
)
