// tracing: off

import type { NonEmptyArray } from "@effect-ts/core/Collections/Immutable/NonEmptyArray"
import type { Refinement } from "@effect-ts/system/Function"

import type {
  AnyEnv,
  ConfigsForType,
  HKT,
  InterpreterURIS,
  Kind,
  Named
} from "../../HKT"

export const UnionURI = "UnionURI" as const
export type UnionURI = typeof UnionURI

export type UnionValues<O> = {
  [o in keyof O]: O[o]
}

export interface UnionConfig<Types> {}

export type UnionTypes<F extends InterpreterURIS, E, A, R> = {
  [o in keyof A & keyof E]: Kind<F, R, E[o], A[o]>
}

export interface AlgebraUnion<F extends InterpreterURIS, Env extends AnyEnv> {
  _F: F
  union<Types extends NonEmptyArray<Kind<F, Env, any, any>>>(
    ...types: Types
  ): (
    config: {
      guards: {
        [k in keyof Types]: [Types[number]] extends [HKT<Env, any, infer All>]
          ? [Types[k]] extends [HKT<Env, any, infer Single>]
            ? Single extends All
              ? Refinement<All, Single>
              : never
            : never
          : never
      }
    } & Named<
      ConfigsForType<
        Env,
        {
          [h in keyof Types]: [Types[h]] extends [HKT<Env, infer E, any>] ? E : never
        }[number],
        {
          [h in keyof Types]: [Types[h]] extends [HKT<Env, any, infer A>] ? A : never
        }[number],
        UnionConfig<Types>
      >
    >
  ) => Kind<
    F,
    Env,
    {
      [h in keyof Types]: [Types[h]] extends [HKT<Env, infer E, any>] ? E : never
    }[number],
    {
      [h in keyof Types]: [Types[h]] extends [HKT<Env, any, infer A>] ? A : never
    }[number]
  >
}
