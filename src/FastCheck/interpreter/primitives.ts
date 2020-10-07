import { isNonEmpty } from "@effect-ts/core/Classic/Array"
import { left, right } from "@effect-ts/core/Classic/Either"
import { fromNullable, none, some } from "@effect-ts/core/Classic/Option"
import { pipe } from "@effect-ts/core/Function"

import type { AnyEnv } from "../../Algebra/config"
import type { AlgebraPrimitive1 } from "../../Algebra/primitives"
import { memo } from "../../Internal/Utils"
import { accessFC, fcApplyConfig } from "../config"
import { FastCheckType, FastCheckURI } from "../hkt"

export const fcPrimitiveInterpreter = memo(
  <Env extends AnyEnv>(): AlgebraPrimitive1<FastCheckURI, Env> => ({
    _F: FastCheckURI,
    function: (i, o, config) => (env) =>
      new FastCheckType(
        fcApplyConfig(config?.conf)(
          o(env).arb.map((r) => () => r),
          env,
          {}
        )
      ),
    unknownE: (k, config) => (env) =>
      new FastCheckType(fcApplyConfig(config?.conf)(k(env).arb, env, {})),
    date: (config) => (env) =>
      pipe(
        accessFC(env).integer(),
        (arb) =>
          new FastCheckType(
            fcApplyConfig(config?.conf)(
              arb.map((n) => new Date(n)),
              env,
              {}
            )
          )
      ),
    boolean: (config) => (env) =>
      new FastCheckType(fcApplyConfig(config?.conf)(accessFC(env).boolean(), env, {})),
    string: (config) => (env) =>
      new FastCheckType(fcApplyConfig(config?.conf)(accessFC(env).string(), env, {})),
    number: (config) => (env) =>
      new FastCheckType(fcApplyConfig(config?.conf)(accessFC(env).float(), env, {})),
    bigint: (config) => (env) =>
      new FastCheckType(fcApplyConfig(config?.conf)(accessFC(env).bigInt(), env, {})),
    stringLiteral: (l, config) => (env) =>
      new FastCheckType(
        fcApplyConfig(config?.conf)(accessFC(env).constant(l), env, {})
      ),
    numberLiteral: (l, config) => (env) =>
      new FastCheckType(
        fcApplyConfig(config?.conf)(accessFC(env).constant(l), env, {})
      ),
    oneOfLiterals: (ls, config) => (env) =>
      new FastCheckType(
        fcApplyConfig(config?.conf)(accessFC(env).constantFrom(...ls), env, {})
      ),
    keysOf: (k, config) => (env) =>
      new FastCheckType(
        fcApplyConfig(config?.conf)(
          accessFC(env).oneof(
            ...(Object.keys(k) as (keyof typeof k & string)[]).map(
              accessFC(env).constant
            )
          ),
          env,
          {}
        )
      ),
    nullable: (T, config) => (env) =>
      pipe(
        T(env).arb,
        (arb) =>
          new FastCheckType(
            fcApplyConfig(config?.conf)(
              accessFC(env).option(arb).map(fromNullable),
              env,
              {
                arb
              }
            )
          )
      ),
    mutable: (T, config) => (env) =>
      pipe(
        T(env).arb,
        (arb) =>
          new FastCheckType(
            fcApplyConfig(config?.conf)(arb, env, {
              arb
            })
          )
      ),
    optional: (T, config) => (env) =>
      pipe(
        T(env).arb,
        (arb) =>
          new FastCheckType(
            fcApplyConfig(config?.conf)(
              accessFC(env)
                .option(arb)
                .map((a) => (a == null ? undefined : a)),
              env,
              { arb }
            )
          )
      ),
    array: (T, config) => (env) =>
      pipe(
        T(env).arb,
        (arb) =>
          new FastCheckType(
            fcApplyConfig(config?.conf)(accessFC(env).array(arb), env, { arb })
          )
      ),
    nonEmptyArray: (T, config) => (env) =>
      pipe(
        T(env).arb,
        (arb) =>
          new FastCheckType(
            fcApplyConfig(config?.conf)(
              accessFC(env).array(arb).filter(isNonEmpty) as any,
              env,
              { arb }
            )
          )
      ),
    uuid: (config) => (env) =>
      new FastCheckType(
        fcApplyConfig(config?.conf)(accessFC(env).uuid() as any, env, {})
      ),
    either: (e, a, config) => (env) =>
      pipe(e(env).arb, (l) =>
        pipe(
          a(env).arb,
          (r) =>
            new FastCheckType(
              fcApplyConfig(config?.conf)(
                accessFC(env).oneof(l.map(left), r.map(right)) as any,
                env,
                {
                  left: l,
                  right: r
                }
              )
            )
        )
      ),
    option: (a, config) => (env) =>
      pipe(
        a(env).arb,
        (arb) =>
          new FastCheckType(
            fcApplyConfig(config?.conf)(
              accessFC(env).oneof(arb.map(some), accessFC(env).constant(none)),
              env,
              { arb }
            )
          )
      )
  })
)
