// ets_tracing: off

import type { TaggedUnionURI } from "../../Algebra/TaggedUnion/index.js"
import { interpreter } from "../../HKT/index.js"
import { mapRecord } from "../../Utils/index.js"
import { eqApplyConfig, EqType, EqURI } from "../base/index.js"

export const eqTaggedUnionInterpreter = interpreter<EqURI, TaggedUnionURI>()(() => ({
  _F: EqURI,
  taggedUnion: (tag, types, config) => (env) => {
    const equals = mapRecord(types, (a) => a(env).eq)
    return new EqType(
      eqApplyConfig(config?.conf)(
        {
          equals: (a, b): boolean => {
            if (a === b) {
              return true
            } else {
              const aTag = a[tag as any]
              return aTag === b[tag as any] ? equals[aTag as any].equals(a, b) : false
            }
          }
        },
        env,
        {
          equals: equals as any
        }
      )
    )
  }
}))
