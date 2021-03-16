// tracing: off

import type { Dictionary } from "@effect-ts/core/Dictionary"

import type { AnyEnv, ConfigsForType, InterpreterURIS, Kind, Named } from "../../HKT"

export const RecordURI = "RecordURI" as const

export type RecordURI = typeof RecordURI

export interface RecordConfig<L, A> {}

export interface AlgebraRecord<F extends InterpreterURIS, Env extends AnyEnv> {
  _F: F
  record: <L, A>(
    codomain: Kind<F, Env, L, A>,
    config?: Named<
      ConfigsForType<Env, Dictionary<L>, Dictionary<A>, RecordConfig<L, A>>
    >
  ) => Kind<F, Env, Dictionary<L>, Dictionary<A>>
}
