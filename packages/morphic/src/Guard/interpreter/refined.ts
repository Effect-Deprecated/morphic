// ets_tracing: off

import type { Refinement } from "@effect-ts/core/Function"
import { pipe } from "@effect-ts/core/Function"

import type { RefinedURI } from "../../Algebra/Refined/index.js"
import { interpreter } from "../../HKT/index.js"
import { guardApplyConfig, GuardType, GuardURI } from "../base/index.js"
import type { AOfGuard } from "./common.js"

type BOfRefinement<X> = X extends Refinement<infer A, infer B> ? B : never

export const guardRefinedInterpreter = interpreter<GuardURI, RefinedURI>()(() => ({
  _F: GuardURI,
  refined: (getGuard, ref, config) => (env) =>
    pipe(
      getGuard(env).guard,
      (guard) =>
        new GuardType(
          guardApplyConfig(config?.conf)(
            {
              is: (u): u is BOfRefinement<typeof ref> => guard.is(u) && ref(u)
            },
            env,
            { guard }
          )
        )
    ),
  constrained: (getGuard, ref, config) => (env) =>
    pipe(
      getGuard(env).guard,
      (guard) =>
        new GuardType(
          guardApplyConfig(config?.conf)(
            {
              is: (u): u is AOfGuard<typeof guard> => guard.is(u) && ref(u)
            },
            env,
            { guard }
          )
        )
    )
}))
