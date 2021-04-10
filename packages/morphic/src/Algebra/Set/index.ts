// tracing: off

import type { Array } from "@effect-ts/core/Collections/Immutable/Array"
import type { Set } from "@effect-ts/core/Collections/Immutable/Set"
import type { Equal } from "@effect-ts/core/Equal"
import type { Ord } from "@effect-ts/core/Ord"

import type { AnyEnv, ConfigsForType, InterpreterURIS, Kind, Named } from "../../HKT"

export const SetURI = "SetURI" as const

export type SetURI = typeof SetURI

export interface SetConfig<L, A> {}

export interface AlgebraSet<F extends InterpreterURIS, Env extends AnyEnv> {
  _F: F
  set: <L, A>(
    a: Kind<F, Env, L, A>,
    ord: Ord<A>,
    eq?: Equal<A>,
    config?: Named<ConfigsForType<Env, Array<L>, Set<A>, SetConfig<L, A>>>
  ) => Kind<F, Env, Array<L>, Set<A>>
}
