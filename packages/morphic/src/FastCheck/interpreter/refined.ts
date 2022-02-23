// ets_tracing: off

import { pipe } from "@effect-ts/core/Function"

import type { RefinedURI } from "../../Algebra/Refined/index.js"
import { interpreter } from "../../HKT/index.js"
import { FastCheckType, FastCheckURI, fcApplyConfig } from "../base/index.js"

export const fcRefinedInterpreter = interpreter<FastCheckURI, RefinedURI>()(() => ({
  _F: FastCheckURI,
  refined: (getArb, ref, config) => (env) =>
    pipe(
      getArb(env).arb,
      (arb) =>
        new FastCheckType(fcApplyConfig(config?.conf)(arb.filter(ref), env, { arb }))
    ),
  constrained: (getArb, ref, config) => (env) =>
    pipe(
      getArb(env).arb,
      (arb) =>
        new FastCheckType(fcApplyConfig(config?.conf)(arb.filter(ref), env, { arb }))
    )
}))
