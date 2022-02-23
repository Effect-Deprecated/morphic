// ets_tracing: off

import { pipe } from "@effect-ts/core/Function"

import type { IntersectionURI } from "../../Algebra/Intersection/index.js"
import { interpreter } from "../../HKT/index.js"
import { accessFC, FastCheckType, FastCheckURI, fcApplyConfig } from "../base/index.js"

export const fcIntersectionInterpreter = interpreter<FastCheckURI, IntersectionURI>()(
  () => ({
    _F: FastCheckURI,
    intersection:
      (...items) =>
      (config) =>
      (env) =>
        pipe(
          items.map((getArb) => getArb(env).arb),
          (arbs) =>
            new FastCheckType(
              fcApplyConfig(config?.conf)(
                accessFC(env)
                  .genericTuple(arbs)
                  .map((all) => Object.assign({}, ...all)),
                env,
                { arbs: arbs as any }
              )
            )
        )
  })
)
