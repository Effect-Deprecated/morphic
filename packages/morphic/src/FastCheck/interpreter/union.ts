// ets_tracing: off

import { pipe } from "@effect-ts/core/Function"

import type { UnionURI } from "../../Algebra/Union/index.js"
import { interpreter } from "../../HKT/index.js"
import { accessFC, FastCheckType, FastCheckURI, fcApplyConfig } from "../base/index.js"

export const fcUnionInterpreter = interpreter<FastCheckURI, UnionURI>()(() => ({
  _F: FastCheckURI,
  union:
    (...dic) =>
    (config) =>
    (env) =>
      new FastCheckType(
        pipe(
          dic.map((getArb) => getArb(env).arb),
          (arbs) =>
            fcApplyConfig(config?.conf)(accessFC(env).oneof(...arbs) as any, env, {
              arbs: arbs as any
            })
        )
      )
}))
