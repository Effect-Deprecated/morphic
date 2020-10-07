import type { M, Summoner } from "../Batteries/summoner"
import { summonFor } from "../Batteries/summoner"
import type { Materialized } from "../Batteries/usage/materializer"
import type {
  SummonerEnv,
  SummonerInterpURI,
  SummonerProgURI
} from "../Batteries/usage/summoner"
import type { Guard, GuardURI } from "./hkt"
import { modelGuardInterpreter } from "./interpreter"

export const deriveFor = <S extends Summoner<any>>(S: S) => (
  _: { [k in GuardURI & keyof SummonerEnv<S>]: SummonerEnv<S>[k] }
) => <L, A>(
  F: Materialized<SummonerEnv<S>, L, A, SummonerProgURI<S>, SummonerInterpURI<S>>
) => F.derive(modelGuardInterpreter<SummonerEnv<S>>())(_).guard

const guards = new Map<any, any>()

export const guard = <E, A>(F: M<{}, E, A>): Guard<A> => {
  if (guards.has(F)) {
    return guards.get(F)
  }
  const d = deriveFor(summonFor({}).make)({})(F)
  guards.set(F, d)
  return d
}
