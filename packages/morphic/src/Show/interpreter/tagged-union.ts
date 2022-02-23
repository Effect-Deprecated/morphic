// ets_tracing: off

import type { TaggedUnionURI } from "../../Algebra/TaggedUnion/index.js"
import { interpreter } from "../../HKT/index.js"
import { mapRecord } from "../../Utils/index.js"
import { showApplyConfig, ShowType, ShowURI } from "../base/index.js"

export const showTaggedUnionInterpreter = interpreter<ShowURI, TaggedUnionURI>()(
  () => ({
    _F: ShowURI,
    taggedUnion: (tag, types, config) => (env) => {
      const shows = mapRecord(types, (a) => a(env).show)
      return new ShowType(
        showApplyConfig(config?.conf)(
          {
            show: (a): string => (shows as any)[a[tag as any]].show(a)
          },
          env,
          {
            shows: shows as any
          }
        )
      )
    }
  })
)
