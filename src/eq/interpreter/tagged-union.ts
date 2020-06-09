import { mapRecord, memo } from "../../utils"
import { eqApplyConfig } from "../config"
import { EqType, EqURI } from "../hkt"

import type { AnyEnv } from "@matechs/morphic-alg/config"
import type { MatechsAlgebraTaggedUnions1 } from "@matechs/morphic-alg/tagged-union"

export const eqTaggedUnionInterpreter = memo(
  <Env extends AnyEnv>(): MatechsAlgebraTaggedUnions1<EqURI, Env> => ({
    _F: EqURI,
    taggedUnion: (tag, types, config) => (env) => {
      const equals = mapRecord(types, (a) => a(env).eq.equals)
      return new EqType(
        eqApplyConfig(config?.conf)(
          {
            equals: (a, b): boolean => {
              if (a === b) {
                return true
              } else {
                const aTag = a[tag]
                return aTag === b[tag] ? equals[aTag](a, b) : false
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
  })
)
