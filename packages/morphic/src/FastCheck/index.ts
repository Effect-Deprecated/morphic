// ets_tracing: off

import type { Arbitrary } from "fast-check"
import * as fc from "fast-check"

import type { M, Summoner } from "../Batteries/summoner/index.js"
import { summonFor } from "../Batteries/summoner/index.js"
import type { Materialized } from "../Batteries/usage/materializer/index.js"
import type {
  SummonerEnv,
  SummonerInterpURI,
  SummonerProgURI
} from "../Batteries/usage/summoner/index.js"
import { FastCheckURI } from "./base/index.js"
import { modelFcInterpreter } from "./interpreter/index.js"

export { fcExtension } from "./interpreter/index.js"
export {
  FastCheckURI,
  accessFC,
  fcApplyConfig,
  BaseFC,
  FastCheckType
} from "./base/index.js"

export function deriveFor<S extends Summoner<any>>(S: S) {
  return (_: {
      [k in FastCheckURI & keyof SummonerEnv<S>]: SummonerEnv<S>[k]
    }) =>
    <L, A>(
      F: Materialized<SummonerEnv<S>, L, A, SummonerProgURI<S>, SummonerInterpURI<S>>
    ) =>
      F.derive(modelFcInterpreter<SummonerEnv<S>>())(_).arb
}

const arbitraries = new Map<any, any>()
const defDerive = deriveFor(summonFor({}).make)({
  [FastCheckURI]: {
    module: fc
  }
})

export function arbitrary<E, A>(F: M<{}, E, A>): Arbitrary<A> {
  if (arbitraries.has(F)) {
    return arbitraries.get(F)
  }
  const d = defDerive(F)
  arbitraries.set(F, d)
  return d
}
