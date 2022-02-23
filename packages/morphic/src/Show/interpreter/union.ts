// ets_tracing: off

import type { UnionURI } from "../../Algebra/Union/index.js"
import { interpreter } from "../../HKT/index.js"
import { showApplyConfig, ShowType, ShowURI } from "../base/index.js"

export const showUnionInterpreter = interpreter<ShowURI, UnionURI>()(() => ({
  _F: ShowURI,
  union:
    (...types) =>
    (config) =>
    (env) => {
      const shows = types.map((a) => a(env).show)

      return new ShowType(
        showApplyConfig(config?.conf)(
          {
            show: (a): string => {
              for (const i in config.guards) {
                if (config.guards[i](a)) {
                  return shows[i].show(a)
                }
              }
              throw new Error("BUG: guard not found")
            }
          },
          env,
          {
            shows: shows as any
          }
        )
      )
    }
}))
