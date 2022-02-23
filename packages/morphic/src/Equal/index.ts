// ets_tracing: off

import type { Equal } from "@effect-ts/core/Equal"

import type { M, Summoner } from "../Batteries/summoner/index.js"
import { summonFor } from "../Batteries/summoner/index.js"
import type { Materialized } from "../Batteries/usage/materializer/index.js"
import type {
  SummonerEnv,
  SummonerInterpURI,
  SummonerProgURI
} from "../Batteries/usage/summoner/index.js"
import type { EqType, EqURI } from "./base/index.js"
import { modelEqInterpreter } from "./interpreter/index.js"

export { eqExtension } from "./interpreter/index.js"
export { EqURI, eqApplyConfig, EqType } from "./base/index.js"

export function deriveFor<S extends Summoner<any>>(S: S) {
  return (_: {
      [k in EqURI & keyof SummonerEnv<S>]: SummonerEnv<S>[k]
    }) =>
    <L, A>(
      F: Materialized<SummonerEnv<S>, L, A, SummonerProgURI<S>, SummonerInterpURI<S>>
    ) =>
      F.derive(modelEqInterpreter<SummonerEnv<S>>())(_)
}

const equals = new Map<any, any>()
const defDerive = deriveFor(summonFor({}).make)({})

export function equal<E, A>(F: M<{}, E, A>): Equal<A> {
  if (equals.has(F)) {
    return equals.get(F).eq
  }
  const d = defDerive(F)
  equals.set(F, d)
  return d.eq
}

export function equalType<E, A>(F: M<{}, E, A>): EqType<A> {
  if (equals.has(F)) {
    return equals.get(F)
  }
  const d = defDerive(F)
  equals.set(F, d)
  return d
}
