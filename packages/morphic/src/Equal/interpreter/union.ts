// tracing: off

import type { UnionURI } from "../../Algebra/Union"
import { interpreter } from "../../HKT"
import { eqApplyConfig, EqType, EqURI } from "../base"

export const eqUnionInterpreter = interpreter<EqURI, UnionURI>()(() => ({
  _F: EqURI,
  union: (...types) => (config) => (env) => {
    const equals = types.map((a) => a(env).eq)

    return new EqType(
      eqApplyConfig(config?.conf)(
        {
          equals: (a, b): boolean => {
            if (a === b) {
              return true
            }
            for (const i in config.guards) {
              if (config.guards[i](a)) {
                if (config.guards[i](b)) {
                  return equals[i].equals(a, b)
                }
              }
            }
            return false
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
