// tracing: off

import type { UnionURI } from "../../Algebra/Union"
import { interpreter } from "../../HKT"
import { reorderApplyConfig, ReorderType, ReorderURI } from "../base"

export const reorderUnionInterpreter = interpreter<ReorderURI, UnionURI>()(() => ({
  _F: ReorderURI,
  union: (...types) => (config) => (env) => {
    const reorders = types.map((a) => a(env).reorder)

    return new ReorderType(
      reorderApplyConfig(config?.conf)(
        {
          reorder: (u) => {
            for (const i in config.guards) {
              if (config.guards[i](u)) {
                return reorders[i].reorder(u)
              }
            }
            throw new Error("BUG: guard not found")
          }
        },
        env,
        {
          reorders: reorders as any
        }
      )
    )
  }
}))
