// ets_tracing: off

import { pipe } from "@effect-ts/core"
import * as C from "@effect-ts/core/Collections/Immutable/Chunk"
import {} from "@effect-ts/core/Collections/Immutable/HashMap"

import type { HashMapURI } from "../../Algebra/HashMap/index.js"
import { interpreter } from "../../HKT/index.js"
import { eqApplyConfig, EqType, EqURI } from "../base/index.js"

export const eqHashMapInterpreter = interpreter<EqURI, HashMapURI>()(() => ({
  _F: EqURI,
  hashMap: (getDomain, getCodomain, config) => (env) => {
    const { eq } = getDomain(env)
    const { eq: coEq } = getCodomain(env)
    return new EqType(
      eqApplyConfig(config?.conf)(
        {
          equals: (a, b) =>
            a === b ||
            (a.size === b.size &&
              pipe(
                C.from(a),
                C.zipWith(
                  C.from(b),
                  (x, y) => eq.equals(x[0], y[0]) && coEq.equals(x[1], y[1])
                ),
                C.forAll((x) => x)
              ))
        },
        env,
        { eq, coEq }
      )
    )
  }
}))
