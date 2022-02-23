// ets_tracing: off

import { pipe } from "@effect-ts/core/Function"

import type { RecursiveURI } from "../../Algebra/Recursive/index.js"
import { interpreter } from "../../HKT/index.js"
import { memo } from "../../Utils/index.js"
import { strictApplyConfig, StrictType, StrictURI } from "../base/index.js"

export const strictRecursiveInterpreter = interpreter<StrictURI, RecursiveURI>()(
  () => ({
    _F: StrictURI,
    recursive: (a, config) => {
      const get = memo(() => a(res))
      const res: ReturnType<typeof a> = (env) =>
        new StrictType(
          pipe(
            () => get()(env).strict,
            (getStrict) =>
              strictApplyConfig(config?.conf)(
                {
                  shrink: (u) => getStrict().shrink(u)
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
