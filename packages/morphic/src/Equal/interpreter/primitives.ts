import * as A from "@effect-ts/core/Array"
import { getEqual as EgetEq } from "@effect-ts/core/Either"
import * as Equal from "@effect-ts/core/Equal"
import { pipe } from "@effect-ts/core/Function"
import { getEqual as LgetEq } from "@effect-ts/core/List"
import { getEqual as OgetEq } from "@effect-ts/core/Option"

import type { PrimitivesURI, UUID } from "../../Algebra/Primitives"
import { interpreter } from "../../HKT"
import { eqApplyConfig, EqType, EqURI } from "../base"

export const eqPrimitiveInterpreter = interpreter<EqURI, PrimitivesURI>()(() => ({
  _F: EqURI,
  function: (_, __, config) => (env) =>
    new EqType(
      eqApplyConfig(config?.conf)(
        {
          equals: (y) => (x) => x === y
        },
        env,
        {}
      )
    ),
  unknownE: (k, config) => (env) =>
    new EqType(eqApplyConfig(config?.conf)(k(env).eq, env, {})),
  date: (config) => (env) =>
    pipe(
      Equal.number,
      Equal.contramap((date: Date) => date.getTime()),
      (eq) => new EqType(eqApplyConfig(config?.conf)(eq, env, {}))
    ),
  boolean: (config) => (env) =>
    new EqType(eqApplyConfig(config?.conf)(Equal.boolean, env, {})),
  string: (config) => (env) =>
    new EqType(eqApplyConfig(config?.conf)(Equal.string, env, {})),
  number: (config) => (env) =>
    new EqType(eqApplyConfig(config?.conf)(Equal.number, env, {})),
  bigint: (config) => (env) =>
    new EqType<bigint>(eqApplyConfig(config?.conf)(Equal.strict(), env, {})),
  stringLiteral: (k, config) => (env) =>
    new EqType<typeof k>(eqApplyConfig(config?.conf)(Equal.string, env, {})),
  numberLiteral: (k, config) => (env) =>
    new EqType<typeof k>(eqApplyConfig(config?.conf)(Equal.number, env, {})),
  oneOfLiterals: (..._ls) => (config) => (env) =>
    pipe(
      Equal.strict(),
      (eq) => new EqType(eqApplyConfig(config?.conf)(eq, env, { eq }))
    ),
  keysOf: (keys, config) => (env) =>
    new EqType<keyof typeof keys & string>(
      eqApplyConfig(config?.conf)(Equal.strict(), env, {})
    ),
  nullable: (getType, config) => (env) =>
    pipe(
      getType(env).eq,
      (eq) => new EqType(eqApplyConfig(config?.conf)(OgetEq(eq), env, { eq }))
    ),
  mutable: (getType, config) => (env) =>
    pipe(
      getType(env).eq,
      (eq) => new EqType(eqApplyConfig(config?.conf)(eq, env, { eq }))
    ),
  optional: (getType, config) => (env) =>
    pipe(
      getType(env).eq,
      (eq) =>
        new EqType(
          eqApplyConfig(config?.conf)(
            {
              equals: (y) => (x) =>
                typeof x === "undefined" && typeof y === "undefined"
                  ? true
                  : typeof x === "undefined"
                  ? false
                  : typeof y === "undefined"
                  ? false
                  : eq.equals(y)(x)
            },
            env,
            { eq }
          )
        )
    ),
  array: (getType, config) => (env) =>
    pipe(
      getType(env).eq,
      (eq) => new EqType(eqApplyConfig(config?.conf)(A.getEqual(eq), env, { eq }))
    ),
  list: (getType, config) => (env) =>
    pipe(
      getType(env).eq,
      (eq) => new EqType(eqApplyConfig(config?.conf)(LgetEq(eq), env, { eq }))
    ),
  nonEmptyArray: (getType, config) => (env) =>
    pipe(
      getType(env).eq,
      (eq) => new EqType(eqApplyConfig(config?.conf)(A.getEqual(eq), env, { eq }))
    ),
  uuid: (config) => (env) =>
    new EqType<UUID>(eqApplyConfig(config?.conf)(Equal.string, env, {})),
  either: (e, a, config) => (env) =>
    pipe(e(env).eq, (left) =>
      pipe(
        a(env).eq,
        (right) =>
          new EqType(
            eqApplyConfig(config?.conf)(EgetEq(left, right), env, {
              left,
              right
            })
          )
      )
    ),
  option: (a, config) => (env) =>
    pipe(
      a(env).eq,
      (eq) =>
        new EqType(
          eqApplyConfig(config?.conf)(OgetEq(eq), env, {
            eq
          })
        )
    ),
  tuple: (...types) => (cfg) => (env) =>
    new EqType(
      eqApplyConfig(cfg?.conf)(
        {
          equals: (y) => (x) =>
            x.length === y.length &&
            x.length === types.length &&
            types.every((e, i) => e(env).eq.equals(y[i])(x[i]))
        },
        env,
        { eqs: types.map((e) => e(env).eq) as any }
      )
    )
}))
