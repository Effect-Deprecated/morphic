// ets_tracing: off

import { pipe } from "@effect-ts/core/Function"

import type { RecursiveURI } from "../../Algebra/Recursive/index.js"
import { interpreter } from "../../HKT/index.js"
import { memo } from "../../Utils/index.js"
import { guardApplyConfig, GuardType, GuardURI } from "../base/index.js"
import type { AOfGuard } from "./common.js"

export const guardRecursiveInterpreter = interpreter<GuardURI, RecursiveURI>()(() => ({
  _F: GuardURI,
  recursive: (a, config) => {
    const get = memo(() => a(res))
    const res: ReturnType<typeof a> = (env) =>
      new GuardType(
        pipe(
          () => get()(env).guard,
          (getGuard) =>
            guardApplyConfig(config?.conf)(
              {
                is: (u): u is AOfGuard<ReturnType<typeof getGuard>> => getGuard().is(u)
              },
              env,
              {}
            )
        )
      )
    return res
  }
}))
