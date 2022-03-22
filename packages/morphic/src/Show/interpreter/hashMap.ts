// ets_tracing: off

import { Iterable, pipe } from "@effect-ts/core"

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
          show: (m) =>
            `new HashMap([${pipe(
              m,
              Iterable.map(([k, v]) => `[${show.show(k)}, ${coShow.show(v)}]`),
              Array.from
            )
              .sort()
              .join(", ")}])`
        },
        env,
        { show, coShow }
      )
    )
  }
}))
