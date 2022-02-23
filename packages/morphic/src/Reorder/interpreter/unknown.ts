// ets_tracing: off

import * as T from "@effect-ts/core/Sync"

import type { UnknownURI } from "../../Algebra/Unknown/index.js"
import { interpreter } from "../../HKT/index.js"
import { reorderApplyConfig, ReorderType, ReorderURI } from "../base/index.js"

export const reorderUnknownInterpreter = interpreter<ReorderURI, UnknownURI>()(() => ({
  _F: ReorderURI,
  unknown: (cfg) => (env) =>
    new ReorderType(
      reorderApplyConfig(cfg?.conf)(
        {
          reorder: T.succeed
        },
        env,
        {}
      )
    )
}))
