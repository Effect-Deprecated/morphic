import type { Show } from "@effect-ts/core/Classic/Show"

import type { M, Summoner } from "../Batteries/summoner"
import { summonFor } from "../Batteries/summoner"
import type { Materialized } from "../Batteries/usage/materializer"
import type {
  SummonerEnv,
  SummonerInterpURI,
  SummonerProgURI
} from "../Batteries/usage/summoner"
import type { ShowURI } from "./hkt"
import { modelShowInterpreter } from "./interpreter"

export const deriveFor = <S extends Summoner<any>>(S: S) => (
  _: { [k in ShowURI & keyof SummonerEnv<S>]: SummonerEnv<S>[k] }
) => <L, A>(
  F: Materialized<SummonerEnv<S>, L, A, SummonerProgURI<S>, SummonerInterpURI<S>>
) => F.derive(modelShowInterpreter<SummonerEnv<S>>())(_).show

const shows = new Map<any, any>()

export const show = <E, A>(F: M<{}, E, A>): Show<A> => {
  if (shows.has(F)) {
    return shows.get(F)
  }
  const d = deriveFor(summonFor({}).make)({})(F)
  shows.set(F, d)
  return d
}
