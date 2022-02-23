// ets_tracing: off

import { pipe } from "@effect-ts/core/Function"

import type { RecursiveURI } from "../../Algebra/Recursive/index.js"
import { interpreter } from "../../HKT/index.js"
import { memo } from "../../Utils/index.js"
import { reorderApplyConfig, ReorderType, ReorderURI } from "../base/index.js"

export const reorderRecursiveInterpreter = interpreter<ReorderURI, RecursiveURI>()(
  () => ({
    _F: ReorderURI,
    recursive: (a, config) => {
      const get = memo(() => a(res))
      const res: ReturnType<typeof a> = (env) =>
        new ReorderType(
          pipe(
            () => get()(env).reorder,
            (getReorder) =>
              reorderApplyConfig(config?.conf)(
                {
                  reorder: (u) => getReorder().reorder(u)
                },
                env,
                {}
              )
          )
        )
      return res
    }
  })
)
