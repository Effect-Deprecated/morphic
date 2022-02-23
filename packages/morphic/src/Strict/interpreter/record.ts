// ets_tracing: off

import * as R from "@effect-ts/core/Collections/Immutable/Dictionary"
import { pipe } from "@effect-ts/core/Function"
import * as T from "@effect-ts/core/Sync"

import type { RecordURI } from "../../Algebra/Record/index.js"
import { interpreter } from "../../HKT/index.js"
import { strictApplyConfig, StrictType, StrictURI } from "../base/index.js"

export const strictRecordInterpreter = interpreter<StrictURI, RecordURI>()(() => ({
  _F: StrictURI,
  record: (getCodomain, config) => (env) =>
    pipe(
      getCodomain(env).strict,
      (strict) =>
        new StrictType(
          strictApplyConfig(config?.conf)(
            {
              shrink: R.forEachF(T.Applicative)(strict.shrink)
            },
            env,
            { strict }
          )
        )
    )
}))
