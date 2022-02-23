// ets_tracing: off

import { pipe } from "@effect-ts/core/Function"

import type { RefinedURI } from "../../Algebra/Refined/index.js"
import { interpreter } from "../../HKT/index.js"
import { eqApplyConfig, EqType, EqURI } from "../base/index.js"

export const eqRefinedInterpreter = interpreter<EqURI, RefinedURI>()(() => ({
  _F: EqURI,
  refined: (getEq, _ref, config) => (env) =>
    pipe(
      getEq(env).eq,
      (eq) => new EqType(eqApplyConfig(config?.conf)(eq, env, { eq, eqRefined: eq }))
    ),
  constrained: (getEq, _ref, config) => (env) =>
    pipe(
      getEq(env).eq,
      (eq) => new EqType(eqApplyConfig(config?.conf)(eq, env, { eq }))
    )
}))
