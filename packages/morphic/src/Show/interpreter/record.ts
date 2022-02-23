// ets_tracing: off

import { getShow as RgetShow } from "@effect-ts/core/Collections/Immutable/Dictionary"
import { pipe } from "@effect-ts/core/Function"

import type { RecordURI } from "../../Algebra/Record/index.js"
import { interpreter } from "../../HKT/index.js"
import { showApplyConfig, ShowType, ShowURI } from "../base/index.js"

export const showRecordInterpreter = interpreter<ShowURI, RecordURI>()(() => ({
  _F: ShowURI,
  record: (codomain, config) => (env) =>
    pipe(
      codomain(env).show,
      (show) =>
        new ShowType(showApplyConfig(config?.conf)(RgetShow(show), env, { show }))
    )
}))
