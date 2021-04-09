// tracing: off

import type { M, Summoner } from "../Batteries/summoner"
import { summonFor } from "../Batteries/summoner"
import type { Materialized } from "../Batteries/usage/materializer"
import type {
  SummonerEnv,
  SummonerInterpURI,
  SummonerProgURI
} from "../Batteries/usage/summoner"
import type { TypeHash, TypeHashURI } from "./base"
import { modelHashInterpreter } from "./interpreter"

export { typeHashExtension } from "./interpreter"
export { TypeHashURI, TypeHash } from "./base"

export function deriveFor<S extends Summoner<any>>(S: S) {
  return (
    _: {
      [k in TypeHashURI & keyof SummonerEnv<S>]: SummonerEnv<S>[k]
    }
  ) => <L, A>(
    F: Materialized<SummonerEnv<S>, L, A, SummonerProgURI<S>, SummonerInterpURI<S>>
  ) => F.derive(modelHashInterpreter<SummonerEnv<S>>())(_).typeHash
}

const hashes = new Map<any, any>()
const defDerive = deriveFor(summonFor({}).make)({})

export function hash<E, A>(F: M<{}, E, A>): TypeHash {
  if (hashes.has(F)) {
    return hashes.get(F)
  }
  const d = defDerive(F)
  hashes.set(F, d)
  return d
}
