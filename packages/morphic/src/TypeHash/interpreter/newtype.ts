// tracing: off

import { pipe } from "@effect-ts/core/Function"

import type { NewtypeURI } from "../../Algebra/Newtype"
import { interpreter } from "../../HKT"
import { HashType, typeHashApplyConfig, TypeHashURI } from "../base"

export const typeHashNewtypeInterpreter = interpreter<TypeHashURI, NewtypeURI>()(
  () => ({
    _F: TypeHashURI,
    newtypeIso: (_, a, config) => (env) =>
      pipe(
        a(env).typeHash,
        (typeHash) =>
          new HashType(
            typeHashApplyConfig(config?.conf)(
              {
                typeHash: config?.name
                  ? `<${config.name}>(${typeHash.typeHash})`
                  : typeHash.typeHash
              },
              env,
              {
                typeHash
              }
            )
          )
      ),
    newtypePrism: (_, a, config) => (env) =>
      pipe(
        a(env).typeHash,
        (typeHash) =>
          new HashType(
            typeHashApplyConfig(config?.conf)(
              {
                typeHash: config?.name
                  ? `<${config.name}>(${typeHash.typeHash})`
                  : typeHash.typeHash
              },
              env,
              {
                typeHash
              }
            )
          )
      )
  })
)
