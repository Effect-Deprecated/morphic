// ets_tracing: off

import type { TaggedUnionURI } from "../../Algebra/TaggedUnion/index.js"
import { interpreter } from "../../HKT/index.js"
import { mapRecord } from "../../Utils/index.js"
import { strictApplyConfig, StrictType, StrictURI } from "../base/index.js"

export const strictTaggedUnionInterpreter = interpreter<StrictURI, TaggedUnionURI>()(
  () => ({
    _F: StrictURI,
    taggedUnion: (tag, types, config) => (env) => {
      const stricts = mapRecord(types, (a) => a(env).strict)

      return new StrictType(
        strictApplyConfig(config?.conf)(
          {
            shrink: (u) => stricts[u[tag as any] as any].shrink(u)
          },
          env,
          {
            stricts: stricts as any
          }
        )
      )
    }
  })
)
