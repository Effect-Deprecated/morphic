// ets_tracing: off

import * as R from "@effect-ts/core/Collections/Immutable/Dictionary"
import { pipe } from "@effect-ts/core/Function"
import * as T from "@effect-ts/core/Sync"

import type { RecordURI } from "../../Algebra/Record/index.js"
import { interpreter } from "../../HKT/index.js"
import { reorderApplyConfig, ReorderType, ReorderURI } from "../base/index.js"

export const reorderRecordInterpreter = interpreter<ReorderURI, RecordURI>()(() => ({
  _F: ReorderURI,
  record: (getCodomain, config) => (env) =>
    pipe(
      getCodomain(env).reorder,
      (reorder) =>
        new ReorderType(
          reorderApplyConfig(config?.conf)(
            {
              reorder: R.forEachF(T.Applicative)(reorder.reorder)
            },
            env,
            { reorder }
          )
        )
    )
}))
