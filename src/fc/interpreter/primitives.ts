import { memo } from "../../utils"
import { fcApplyConfig, accessFC } from "../config"
import { FastCheckType, FastCheckURI } from "../hkt"

import { isNonEmpty } from "@matechs/core/Array"
import { left, right } from "@matechs/core/Either"
import { introduce } from "@matechs/core/Function"
import { fromNullable, none, some } from "@matechs/core/Option"
import type { AnyEnv } from "@matechs/morphic-alg/config"
import type { MatechsAlgebraPrimitive1 } from "@matechs/morphic-alg/primitives"

export const fcPrimitiveInterpreter = memo(
  <Env extends AnyEnv>(): MatechsAlgebraPrimitive1<FastCheckURI, Env> => ({
    _F: FastCheckURI,
    date: (config) => (env) =>
      introduce(accessFC(env).integer())(
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
      introduce(T(env).arb)(
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
      introduce(T(env).arb)(
        (arb) =>
          new FastCheckType(
            fcApplyConfig(config?.conf)(arb, env, {
              arb
            })
          )
      ),
    optional: (T, config) => (env) =>
      introduce(T(env).arb)(
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
      introduce(T(env).arb)(
        (arb) =>
          new FastCheckType(
            fcApplyConfig(config?.conf)(accessFC(env).array(arb), env, { arb })
          )
      ),
    nonEmptyArray: (T, config) => (env) =>
      introduce(T(env).arb)(
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
      introduce(e(env).arb)((l) =>
        introduce(a(env).arb)(
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
      introduce(a(env).arb)(
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
