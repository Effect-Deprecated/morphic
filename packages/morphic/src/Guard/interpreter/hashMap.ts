// ets_tracing: off

import { Chunk } from "@effect-ts/core"
import * as HM from "@effect-ts/core/Collections/Immutable/HashMap"
import { pipe } from "@effect-ts/core/Function"

import type { HashMapURI } from "../../Algebra/HashMap/index.js"
import { interpreter } from "../../HKT/index.js"
import { guardApplyConfig, GuardType, GuardURI } from "../base/index.js"
import type { AOfGuard } from "./common.js"

export const guardHashMapInterpreter = interpreter<GuardURI, HashMapURI>()(() => ({
  _F: GuardURI,
  hashMap: (getDomain, getCodomain, config) => (env) => {
    const guard = getDomain(env).guard
    const coGuard = getCodomain(env).guard
    return new GuardType(
      guardApplyConfig(config?.conf)(
        {
          is: (
            u
          ): u is Readonly<
            HM.HashMap<AOfGuard<typeof guard>, AOfGuard<typeof coGuard>>
          > =>
            u instanceof HM.HashMap &&
            pipe(
              Chunk.from(u),
              Chunk.forAll((t) => guard.is(t[0]) && coGuard.is(t[1]))
            )
        },
        env,
        { guard, coGuard }
      )
    )
  }
}))
