// ets_tracing: off

import type { UnionURI } from "../../Algebra/Union/index.js"
import { interpreter } from "../../HKT/index.js"
import { guardApplyConfig, GuardType, GuardURI } from "../base/index.js"

export const guardUnionInterpreter = interpreter<GuardURI, UnionURI>()(() => ({
  _F: GuardURI,
  union:
    (...types) =>
    (config) =>
    (env) => {
      const guards = types.map((a) => a(env).guard)

      return new GuardType(
        guardApplyConfig(config?.conf)(
          {
            is: (u): u is any => {
              for (const k in guards) {
                if (guards[k].is(u)) {
                  return true
                }
              }
              return false
            }
          },
          env,
          {
            guards: guards as any
          }
        )
      )
    }
}))
