// ets_tracing: off

import type { IntersectionURI } from "../../Algebra/Intersection/index.js"
import { interpreter } from "../../HKT/index.js"
import { showApplyConfig, ShowType, ShowURI } from "../base/index.js"

export const showIntersectionInterpreter = interpreter<ShowURI, IntersectionURI>()(
  () => ({
    _F: ShowURI,
    intersection:
      (...types) =>
      (config) =>
      (env) => {
        const shows = types.map((getShow) => getShow(env).show)
        return new ShowType(
          showApplyConfig(config?.conf)(
            {
              show: (a) => shows.map((s) => s.show(a)).join(" & ")
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
