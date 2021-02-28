import type { TaggedUnionURI } from "../../Algebra/TaggedUnion"
import { interpreter } from "../../HKT"
import { mapRecord } from "../../Utils"
import { eqApplyConfig, EqType, EqURI } from "../base"

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
