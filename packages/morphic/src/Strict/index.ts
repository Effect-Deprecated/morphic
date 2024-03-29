// ets_tracing: off

import type { M, Summoner } from "../Batteries/summoner/index.js"
import { summonFor } from "../Batteries/summoner/index.js"
import type { Materialized } from "../Batteries/usage/materializer/index.js"
import type {
  SummonerEnv,
  SummonerInterpURI,
  SummonerProgURI
} from "../Batteries/usage/summoner/index.js"
import type { Strict, StrictURI } from "./base/index.js"
import { modelStrictInterpreter } from "./interpreter/index.js"

export { strictExtension } from "./interpreter/index.js"
export { StrictURI, Strict, strictApplyConfig, StrictType } from "./base/index.js"

export function deriveFor<S extends Summoner<any>>(S: S) {
  return (_: {
      [k in StrictURI & keyof SummonerEnv<S>]: SummonerEnv<S>[k]
    }) =>
    <L, A>(
      F: Materialized<SummonerEnv<S>, L, A, SummonerProgURI<S>, SummonerInterpURI<S>>
    ) =>
      F.derive(modelStrictInterpreter<SummonerEnv<S>>())(_).strict
}

const stricts = new Map<any, any>()
const defDerive = deriveFor(summonFor({}).make)({})

export function strict<E, A>(F: M<{}, E, A>): Strict<A> {
  if (stricts.has(F)) {
    return stricts.get(F)
  }
  const d = defDerive(F)
  stricts.set(F, d)
  return d
}
