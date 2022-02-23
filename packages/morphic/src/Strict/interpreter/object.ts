// ets_tracing: off

import * as R from "@effect-ts/core/Collections/Immutable/Dictionary"
import { pipe } from "@effect-ts/core/Function"
import * as O from "@effect-ts/core/Option"
import * as T from "@effect-ts/core/Sync"

import type { ObjectURI, PropsKind } from "../../Algebra/Object/index.js"
import { mergePrefer, originalSort } from "../../Decoder/interpreter/common.js"
import type { AnyEnv } from "../../HKT/index.js"
import { interpreter } from "../../HKT/index.js"
import { projectFieldWithEnv } from "../../Utils/index.js"
import type { Strict } from "../base/index.js"
import { strictApplyConfig, StrictType, StrictURI } from "../base/index.js"

export const strictObjectInterpreter = interpreter<StrictURI, ObjectURI>()(() => ({
  _F: StrictURI,
  interface: (props, config) => (env) =>
    pipe(projectFieldWithEnv(props, env)("strict"), (strict) => {
      return new StrictType(
        strictApplyConfig(config?.conf)(interfaceStrict(strict) as any, env, {
          strict: strict as any
        })
      )
    }),
  partial: (props, config) => (env) =>
    pipe(projectFieldWithEnv(props, env)("strict"), (strict) => {
      return new StrictType(
        strictApplyConfig(config?.conf)(partialStrict(strict) as any, env, {
          strict: strict as any
        })
      )
    }),
  both: (props, partial, config) => (env) =>
    pipe(projectFieldWithEnv(props, env)("strict"), (strict) =>
      pipe(projectFieldWithEnv(partial, env)("strict"), (strictPartial) => {
        return new StrictType(
          strictApplyConfig(config?.conf)(
            {
              shrink: (u) => {
                return T.map_(
                  T.zip_(
                    interfaceStrict(strict).shrink(u as any),
                    partialStrict(strictPartial).shrink(u as any)
                  ),
                  ([r, o]) => originalSort(u, mergePrefer(u, r, o))
                ) as any
              }
            },
            env,
            {
              strict: strict as any,
              strictPartial: strictPartial as any
            }
          )
        ) as any
      })
    )
}))

function partialStrict<PropsA, PropsE, Env extends AnyEnv>(strict: {
  [q in keyof PropsKind<StrictURI, PropsA, PropsE, Env>]: ReturnType<
    PropsKind<StrictURI, PropsA, PropsE, Env>[q]
  >["strict"]
}): Strict<Partial<Readonly<PropsA>>> {
  return {
    shrink: (u) =>
      pipe(
        strict as Record<string, any>,
        R.forEachWithIndexF(T.Applicative)((k) =>
          k in u
            ? typeof u[k] !== "undefined"
              ? T.map_((strict[k] as Strict<any>).shrink(u[k]), O.some)
              : T.succeed(O.some(u[k]))
            : T.succeed(O.none)
        ),
        T.map(R.compact),
        T.map((x) => x as any)
      )
  }
}

function interfaceStrict<PropsA, PropsE, Env extends AnyEnv>(strict: {
  [q in keyof PropsKind<StrictURI, PropsA, PropsE, Env>]: ReturnType<
    PropsKind<StrictURI, PropsA, PropsE, Env>[q]
  >["strict"]
}): Strict<Readonly<PropsA>> {
  return {
    shrink: (u) =>
      pipe(
        strict as Record<string, any>,
        R.forEachWithIndexF(T.Applicative)((k) =>
          (strict[k] as Strict<any>).shrink(u[k])
        ),
        T.map((x) => x as any)
      )
  }
}
