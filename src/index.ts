import type { Summoner } from "./batteries/summoner"
import type { Materialized } from "./batteries/usage/materializer"
import type {
  SummonerEnv,
  SummonerInterpURI,
  SummonerProgURI
} from "./batteries/usage/summoner"
import { EqURI, modelEqInterpreter } from "./eq"

export { AsOpaque, AsUOpaque, M, Summoner, summonFor, UM } from "./batteries/summoner"
export { AType, EType, RType } from "./batteries/usage/utils"
export { EqURI } from "./eq/hkt"
export { ModelURI } from "./model/hkt"

export const eqFor = <S extends Summoner<any>>(S: S) => (
  _: { [k in EqURI & keyof SummonerEnv<S>]: SummonerEnv<S>[k] }
) => <L, A>(
  F: Materialized<SummonerEnv<S>, L, A, SummonerProgURI<S>, SummonerInterpURI<S>>
) => F.derive(modelEqInterpreter<SummonerEnv<S>>())(_).eq
