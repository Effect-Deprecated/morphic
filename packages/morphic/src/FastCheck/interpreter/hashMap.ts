// ets_tracing: off

import * as A from "@effect-ts/core/Collections/Immutable/Array"
import * as HM from "@effect-ts/core/Collections/Immutable/HashMap"

import type { HashMapURI } from "../../Algebra/HashMap/index.js"
import { interpreter } from "../../HKT/index.js"
import { accessFC, FastCheckType, FastCheckURI, fcApplyConfig } from "../base/index.js"

const HashMapFromArray = <K, A>(fa: [K, A][]) =>
  A.reduce_(fa, HM.make<K, A>(), (h, v) => HM.set_(h, v[0], v[1]))

export const fcHashMapInterpreter = interpreter<FastCheckURI, HashMapURI>()(() => ({
  _F: FastCheckURI,
  hashMap: (domain, codomain, config) => (env) => {
    const arb = domain(env).arb
    const coArb = codomain(env).arb
    return new FastCheckType(
      fcApplyConfig(config?.conf)(
        accessFC(env).array(accessFC(env).tuple(arb, coArb)).map(HashMapFromArray),
        env,
        {
          arb
        }
      )
    )
  }
}))
