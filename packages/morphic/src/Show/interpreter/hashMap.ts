// ets_tracing: off

import * as HM from "@effect-ts/core/Collections/Immutable/HashMap"

import type { HashMapURI } from "../../Algebra/HashMap/index.js"
import { interpreter } from "../../HKT/index.js"
import { showApplyConfig, ShowType, ShowURI } from "../base/index.js"

export const showHashMapInterpreter = interpreter<ShowURI, HashMapURI>()(() => ({
  _F: ShowURI,
  hashMap: (domain, codomain, config) => (env) => {
    const show = domain(env).show
    const coShow = codomain(env).show

    return new ShowType(
      showApplyConfig(config?.conf)(
        {
          show: (m) => {
            const entries: string[] = []
            HM.mapWithIndex_(m, (k, v) => {
              entries.push(`[${show.show(k)}, ${coShow.show(v)}]`)
            })
            return `new HashMap([${entries.sort().join(", ")}])`
          }
        },
        env,
        { show, coShow }
      )
    )
  }
}))
