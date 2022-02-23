// ets_tracing: off

import { getEqual as SgetEq } from "@effect-ts/core/Collections/Immutable/Set"
import { pipe } from "@effect-ts/core/Function"

import type { SetURI } from "../../Algebra/Set/index.js"
import { interpreter } from "../../HKT/index.js"
import { eqApplyConfig, EqType, EqURI } from "../base/index.js"

export const eqSetInterpreter = interpreter<EqURI, SetURI>()(() => ({
  _F: EqURI,
  set: (a, _ord, _eq, config) => (env) =>
    pipe(
      a(env).eq,
      (eq) => new EqType(eqApplyConfig(config?.conf)(SgetEq(eq), env, { eq }))
    )
}))
