// ets_tracing: off

import type { HashMap } from "@effect-ts/core/Collections/Immutable/HashMap"

import type {
  AnyEnv,
  ConfigsForType,
  InterpreterURIS,
  Kind,
  Named
} from "../../HKT/index.js"

export const HashMapURI = "HashMapURI" as const

export type HashMapURI = typeof HashMapURI

export interface HashMapConfig<L, A, K> {}

export interface AlgebraHashMap<F extends InterpreterURIS, Env extends AnyEnv> {
  _F: F
  hashMap: <L, A, K>(
    domain: Kind<F, Env, string, K>,
    codomain: Kind<F, Env, L, A>,
    config?: Named<
      ConfigsForType<Env, Record<string, L>, HashMap<K, A>, HashMapConfig<L, A, K>>
    >
  ) => Kind<F, Env, Record<string, L>, HashMap<K, A>>
}
