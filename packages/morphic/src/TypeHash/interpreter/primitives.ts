// tracing: off

/* eslint-disable @typescript-eslint/no-empty-interface */
import { pipe } from "@effect-ts/core/Function"

import type { PrimitivesURI } from "../../Algebra/Primitives"
import { interpreter } from "../../HKT"
import type { TypeHash } from "../base"
import { HashType, typeHashApplyConfig, TypeHashURI } from "../base"

export const named =
  (name?: string | undefined) =>
  (s: TypeHash): TypeHash => ({
    typeHash: name ? `<${name}>(${s.typeHash})` : s.typeHash
  })

export const typeHashPrimitiveInterpreter = interpreter<TypeHashURI, PrimitivesURI>()(
  () => ({
    _F: TypeHashURI,
    function: (_, __, config) => (env) =>
      new HashType(
        typeHashApplyConfig(config?.conf)(
          {
            typeHash: config?.name ? `function(${config?.name})` : `function`
          },
          env,
          {}
        )
      ),
    unknownE: (k, config) => (env) =>
      new HashType(typeHashApplyConfig(config?.conf)(k(env).typeHash, env, {})),
    date: (config) => (env) =>
      new HashType(
        pipe({ typeHash: "Date" }, (typeHash) =>
          typeHashApplyConfig(config?.conf)(named(config?.name)(typeHash), env, {})
        )
      ),
    boolean: (config) => (env) =>
      new HashType(
        typeHashApplyConfig(config?.conf)(
          named(config?.name)({
            typeHash: "boolean"
          }),
          env,
          {}
        )
      ),
    string: (config) => (env) =>
      new HashType(
        typeHashApplyConfig(config?.conf)(
          named(config?.name)({
            typeHash: "string"
          }),
          env,
          {}
        )
      ),
    number: (config) => (env) =>
      new HashType(
        typeHashApplyConfig(config?.conf)(
          named(config?.name)({
            typeHash: "number"
          }),
          env,
          {}
        )
      ),
    bigint: (config) => (env) =>
      new HashType(
        typeHashApplyConfig(config?.conf)(
          named(config?.name)({ typeHash: "bigint" }),
          env,
          {}
        )
      ),
    stringLiteral: (_, config) => (env) =>
      new HashType(
        typeHashApplyConfig(config?.conf)(
          named(config?.name)({
            typeHash: _
          }),
          env,
          {}
        )
      ),
    numberLiteral: (_, config) => (env) =>
      new HashType(
        typeHashApplyConfig(config?.conf)(
          named(config?.name)({
            typeHash: `${_}`
          }),
          env,
          {}
        )
      ),
    oneOfLiterals:
      (...ls) =>
      (config) =>
      (env) =>
        new HashType(
          typeHashApplyConfig(config?.conf)(
            named(config?.name)({
              typeHash: `${ls.join(",")}`
            }),
            env,
            {}
          )
        ),
    keysOf: (_keys, config) => (env) =>
      new HashType(
        typeHashApplyConfig(config?.conf)(
          named(config?.name)({
            typeHash: Object.keys(_keys).join(" | ")
          }),
          env,
          {}
        )
      ),
    nullable: (getHash, config) => (env) =>
      new HashType(
        pipe(getHash(env).typeHash, (typeHash) =>
          typeHashApplyConfig(config?.conf)(
            named(config?.name)({
              typeHash: `Nullable<${typeHash.typeHash}>`
            }),
            env,
            {
              typeHash
            }
          )
        )
      ),
    mutable: (getHash, config) => (env) =>
      new HashType(
        pipe(getHash(env).typeHash, (typeHash) =>
          typeHashApplyConfig(config?.conf)(named(config?.name)(typeHash), env, {
            typeHash
          })
        )
      ),
    optional: (getHash, config) => (env) =>
      new HashType(
        pipe(getHash(env).typeHash, (typeHash) =>
          typeHashApplyConfig(config?.conf)(
            named(config?.name)({
              typeHash: `${typeHash.typeHash} | undefined`
            }),
            env,
            {
              typeHash
            }
          )
        )
      ),
    array: (getHash, config) => (env) =>
      new HashType(
        pipe(getHash(env).typeHash, (typeHash) =>
          typeHashApplyConfig(config?.conf)(
            named(config?.name)({
              typeHash: `Array<${typeHash.typeHash}>`
            }),
            env,
            {
              typeHash
            }
          )
        )
      ),
    list: (getHash, config) => (env) =>
      new HashType(
        pipe(getHash(env).typeHash, (typeHash) =>
          typeHashApplyConfig(config?.conf)(
            named(config?.name)({
              typeHash: `List<${typeHash.typeHash}>`
            }),
            env,
            {
              typeHash
            }
          )
        )
      ),
    nonEmptyArray: (getHash, config) => (env) =>
      new HashType(
        pipe(getHash(env).typeHash, (typeHash) =>
          typeHashApplyConfig(config?.conf)(
            named(config?.name)({
              typeHash: `NonEmptyArray<${typeHash.typeHash}>`
            }),
            env,
            {
              typeHash
            }
          )
        )
      ),
    uuid: (config) => (env) =>
      new HashType(
        typeHashApplyConfig(config?.conf)(
          named(config?.name)({
            typeHash: "UUID"
          }),
          env,
          {}
        )
      ),
    either: (e, a, config) => (env) =>
      new HashType(
        pipe(e(env).typeHash, (left) =>
          pipe(a(env).typeHash, (right) =>
            typeHashApplyConfig(config?.conf)(
              named(config?.name)({
                typeHash: `Either<${left.typeHash}, ${right.typeHash}>`
              }),
              env,
              {
                left,
                right
              }
            )
          )
        )
      ),
    option: (a, config) => (env) =>
      new HashType(
        pipe(a(env).typeHash, (typeHash) =>
          typeHashApplyConfig(config?.conf)(
            named(config?.name)({
              typeHash: `Option<${typeHash.typeHash}>`
            }),
            env,
            {
              typeHash
            }
          )
        )
      ),
    tuple:
      (...types) =>
      (config) =>
      (env) =>
        new HashType(
          typeHashApplyConfig(config?.conf)(
            named(config?.name)({
              typeHash: `Tuple<${types.map((h) => h(env).typeHash).join(",")}>`
            }),
            env,
            {
              typeHashes: types.map((h) => h(env).typeHash) as any
            }
          )
        )
  })
)
