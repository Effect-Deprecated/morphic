// ets_tracing: off

import { pipe } from "@effect-ts/core/Function"
import * as T from "@effect-ts/core/Sync"

import type { RefinedURI } from "../../Algebra/Refined/index.js"
import { interpreter } from "../../HKT/index.js"
import { reorderApplyConfig, ReorderType, ReorderURI } from "../base/index.js"

export const reorderRefinedInterpreter = interpreter<ReorderURI, RefinedURI>()(() => ({
  _F: ReorderURI,
  refined: (getReorder, _ref, config) => (env) =>
    pipe(
      getReorder(env).reorder,
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
    ),
  constrained: (getReorder, _ref, config) => (env) =>
    pipe(
      getReorder(env).reorder,
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
