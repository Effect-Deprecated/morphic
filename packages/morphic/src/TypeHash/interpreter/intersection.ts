// ets_tracing: off

import type { IntersectionURI } from "../../Algebra/Intersection/index.js"
import { interpreter } from "../../HKT/index.js"
import { HashType, typeHashApplyConfig, TypeHashURI } from "../base/index.js"

export const typeHashIntersectionInterpreter = interpreter<
  TypeHashURI,
  IntersectionURI
>()(() => ({
  _F: TypeHashURI,
  intersection:
    (...types) =>
    (config) =>
    (env) => {
      const typeHashes = types.map((getHash) => getHash(env).typeHash)
      return new HashType(
        typeHashApplyConfig(config?.conf)(
          {
            typeHash: typeHashes
              .map((s) => s.typeHash)
              .sort()
              .join(" & ")
          },
          env,
          {
            typeHashes: typeHashes as any
          }
        )
      )
    }
}))
