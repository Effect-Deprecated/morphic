// tracing: off

import type { UnionURI } from "../../Algebra/Union"
import { interpreter } from "../../HKT"
import { strictApplyConfig, StrictType, StrictURI } from "../base"

export const strictUnionInterpreter = interpreter<StrictURI, UnionURI>()(() => ({
  _F: StrictURI,
  union:
    (...types) =>
    (config) =>
    (env) => {
      const stricts = types.map((a) => a(env).strict)

      return new StrictType(
        strictApplyConfig(config?.conf)(
          {
            shrink: (u) => {
              for (const i in config.guards) {
                if (config.guards[i](u)) {
                  return stricts[i].shrink(u)
                }
              }
              throw new Error("BUG: guard not found")
            }
          },
          env,
          {
            stricts: stricts as any
          }
        )
      )
    }
}))
