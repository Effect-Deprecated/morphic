// ets_tracing: off

import { pipe } from "@effect-ts/core/Function"
import * as T from "@effect-ts/core/Sync"

import type { SetURI } from "../../Algebra/Set/index.js"
import { interpreter } from "../../HKT/index.js"
import { reorderApplyConfig, ReorderType, ReorderURI } from "../base/index.js"

export const reorderSetInterpreter = interpreter<ReorderURI, SetURI>()(() => ({
  _F: ReorderURI,
  set: (a, _, __, config) => (env) =>
    pipe(
      a(env).reorder,
      (reorder) =>
        new ReorderType(
          reorderApplyConfig(config?.conf)(
            {
              reorder: T.succeed
            },
            env,
            { reorder }
          )
        )
    )
}))
