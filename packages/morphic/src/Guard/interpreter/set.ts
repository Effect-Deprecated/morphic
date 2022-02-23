// ets_tracing: off

import { every_, Set } from "@effect-ts/core/Collections/Immutable/Set"
import { pipe } from "@effect-ts/core/Function"

import type { SetURI } from "../../Algebra/Set/index.js"
import { interpreter } from "../../HKT/index.js"
import { guardApplyConfig, GuardType, GuardURI } from "../base/index.js"
import type { AOfGuard } from "./common.js"

export const guardSetInterpreter = interpreter<GuardURI, SetURI>()(() => ({
  _F: GuardURI,
  set: (a, _, __, config) => (env) =>
    pipe(
      a(env).guard,
      (guard) =>
        new GuardType(
          guardApplyConfig(config?.conf)(
            {
              is: (u): u is Set<AOfGuard<typeof guard>> =>
                u instanceof Set && every_(u, guard.is)
            },
            env,
            { guard }
          )
        )
    )
}))
