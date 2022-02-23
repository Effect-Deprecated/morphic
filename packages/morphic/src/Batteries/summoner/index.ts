// ets_tracing: off

import type { Erase } from "@effect-ts/core/Utils"

import { cacheUnaryFunction } from "../../Algebra/Core/index.js"
import type { BaseFC } from "../../FastCheck/base/index.js"
import type { AnyEnv } from "../../HKT/index.js"
import type { InterpreterURI } from "../interpreter/index.js"
import type { ProgramURI } from "../program/index.js"
import type { Materialized } from "../usage/materializer/index.js"
import type { ProgramType } from "../usage/program-type/index.js"
import type {
  AnyConfigEnv,
  ExtractEnv,
  SummonerOps,
  Summoners
} from "../usage/summoner/index.js"
import { makeSummoner } from "../usage/summoner/index.js"

export interface MM<R, L, A>
  extends Materialized<R, L, A, ProgramURI, InterpreterURI> {}

export interface MM_<R, A> extends MM<R, {}, A> {}

export interface M_<R, A> extends MM_<R & BaseFC, A> {}

export interface M<R, L, A> extends MM<R & BaseFC, L, A> {}

export const opaque =
  <E, A>() =>
  <R extends {}>(x: M<R, E, A>): M<R, E, A> =>
    x

export const opaque_ =
  <A>() =>
  <R extends {}>(x: M<R, any, A>): M_<R, A> =>
    x

export interface Summoner<R> extends Summoners<ProgramURI, InterpreterURI, R> {
  <L, A>(F: ProgramType<R, L, A>[ProgramURI]): M<
    unknown extends Erase<R, BaseFC> ? {} : Erase<R, BaseFC>,
    L,
    A
  >
}

export const summonFor: <R extends AnyEnv = {}>(
  env: ExtractEnv<R, never>
) => SummonerOps<Summoner<R & BaseFC>> = <R extends AnyConfigEnv = {}>(
  _env: ExtractEnv<R, never>
) =>
  makeSummoner<Summoner<R & BaseFC>>(cacheUnaryFunction, () => {
    return {
      build: (a) => a
    }
  })
