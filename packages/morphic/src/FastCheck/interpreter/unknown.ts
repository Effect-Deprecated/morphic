// ets_tracing: off

import { pipe } from "@effect-ts/core/Function"

import type { UnknownURI } from "../../Algebra/Unknown/index.js"
import { interpreter } from "../../HKT/index.js"
import { accessFC, FastCheckType, FastCheckURI, fcApplyConfig } from "../base/index.js"

export const fcUnknownInterpreter = interpreter<FastCheckURI, UnknownURI>()(() => ({
  _F: FastCheckURI,
  unknown: (configs) => (env) =>
    pipe(
      accessFC(env).anything(),
      (arb) => new FastCheckType(fcApplyConfig(configs?.conf)(arb, env, { arb }))
    )
}))
