// ets_tracing: off

import { getEqual as RgetEq } from "@effect-ts/core/Collections/Immutable/Dictionary"
import { pipe } from "@effect-ts/core/Function"

import type { RecordURI } from "../../Algebra/Record/index.js"
import { interpreter } from "../../HKT/index.js"
import { eqApplyConfig, EqType, EqURI } from "../base/index.js"

export const eqRecordMapInterpreter = interpreter<EqURI, RecordURI>()(() => ({
  _F: EqURI,
  record: (getCodomain, config) => (env) =>
    pipe(
      getCodomain(env).eq,
      (eq) => new EqType(eqApplyConfig(config?.conf)(RgetEq(eq), env, { eq }))
    )
}))
