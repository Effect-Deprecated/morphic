// ets_tracing: off

import { pipe } from "@effect-ts/core/Function"

import type { NewtypeURI } from "../../Algebra/Newtype/index.js"
import { interpreter } from "../../HKT/index.js"
import { HashType, typeHashApplyConfig, TypeHashURI } from "../base/index.js"

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
