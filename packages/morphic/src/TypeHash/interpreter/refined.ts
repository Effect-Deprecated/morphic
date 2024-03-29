// ets_tracing: off

import { pipe } from "@effect-ts/core/Function"

import type { RefinedURI } from "../../Algebra/Refined/index.js"
import { interpreter } from "../../HKT/index.js"
import { HashType, typeHashApplyConfig, TypeHashURI } from "../base/index.js"

export const typeHashRefinedInterpreter = interpreter<TypeHashURI, RefinedURI>()(
  () => ({
    _F: TypeHashURI,
    refined: (getHash, _ref, config) => (env) =>
      pipe(
        getHash(env).typeHash,
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
                typeHash,
                typeHashRefined: typeHash
              }
            )
          )
      ),
    constrained: (getHash, _ref, config) => (env) =>
      pipe(
        getHash(env).typeHash,
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
