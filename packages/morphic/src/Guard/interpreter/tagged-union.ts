// ets_tracing: off

import type { TaggedUnionURI } from "../../Algebra/TaggedUnion/index.js"
import { interpreter } from "../../HKT/index.js"
import { mapRecord } from "../../Utils/index.js"
import { guardApplyConfig, GuardType, GuardURI } from "../base/index.js"

export const guardTaggedUnionInterpreter = interpreter<GuardURI, TaggedUnionURI>()(
  () => ({
    _F: GuardURI,
    taggedUnion: (tag, types, config) => (env) => {
      const guards = mapRecord(types, (a) => a(env).guard)

      return new GuardType(
        guardApplyConfig(config?.conf)(
          {
            is: (u): u is any =>
              typeof u === "object" &&
              u !== null &&
              tag in u &&
              (u as any)[tag] in guards &&
              guards[(u as any)[tag]].is(u)
          },
          env,
          {
            guards: guards as any
          }
        )
      )
    }
  })
)
