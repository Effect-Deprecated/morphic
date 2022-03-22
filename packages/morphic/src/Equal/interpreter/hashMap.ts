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
                C.from(a.tupleIterator),
                C.zipWith(
                  C.from(b.tupleIterator),
                  (x, y) =>
                    eq.equals(x.get(0), y.get(0)) && coEq.equals(x.get(1), y.get(1))
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
