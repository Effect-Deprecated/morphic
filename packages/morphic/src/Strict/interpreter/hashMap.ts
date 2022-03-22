// ets_tracing: off

import { Chunk } from "@effect-ts/core"
import * as HM from "@effect-ts/core/Collections/Immutable/HashMap"
import { flow } from "@effect-ts/core/Function"
import * as Sy from "@effect-ts/core/Sync"

import type { HashMapURI } from "../../Algebra/HashMap/index.js"
import { interpreter } from "../../HKT/index.js"
import type { Strict } from "../base/index.js"
import { strictApplyConfig, StrictType, StrictURI } from "../base/index.js"

export type AOfStrict<X extends Strict<any>> = X extends Strict<infer A> ? A : never

export const strictHashMapInterpreter = interpreter<StrictURI, HashMapURI>()(() => ({
  _F: StrictURI,
  hashMap: (getDomain, getCodomain, config) => (env) => {
    const strict = getDomain(env).strict
    const coStrict = getCodomain(env).strict

    return new StrictType(
      strictApplyConfig(config?.conf)(
        {
          shrink: flow(
            (m) => Chunk.from(m.tupleIterator),
            Sy.forEach((t) =>
              Sy.tuple(strict.shrink(t.get(0)), coStrict.shrink(t.get(1)))
            ),
            Sy.map(
              Chunk.reduce(
                HM.make<AOfStrict<typeof strict>, AOfStrict<typeof coStrict>>(),
                (h, t) => HM.set_(h, t[0], t[1])
              )
            )
          )
        },
        env,
        { strict }
      )
    )
  }
}))
