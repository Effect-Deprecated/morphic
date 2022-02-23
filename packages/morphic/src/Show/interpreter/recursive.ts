// ets_tracing: off

import { pipe } from "@effect-ts/core/Function"

import type { RecursiveURI } from "../../Algebra/Recursive/index.js"
import { interpreter } from "../../HKT/index.js"
import { memo } from "../../Utils/index.js"
import { showApplyConfig, ShowType, ShowURI } from "../base/index.js"

export const showRecursiveInterpreter = interpreter<ShowURI, RecursiveURI>()(() => ({
  _F: ShowURI,
  recursive: (a, config) => {
    const get = memo(() => a(res))
    const res: ReturnType<typeof a> = (env) =>
      pipe(
        () => get()(env).show,
        (getShow) =>
          new ShowType(
            showApplyConfig(config?.conf)({ show: (a) => getShow().show(a) }, env, {})
          )
      )
    return res
  }
}))
