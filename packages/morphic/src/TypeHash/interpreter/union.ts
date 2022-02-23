// ets_tracing: off

import type { UnionURI } from "../../Algebra/Union/index.js"
import { interpreter } from "../../HKT/index.js"
import { HashType, typeHashApplyConfig, TypeHashURI } from "../base/index.js"

export const typeHashUnionInterpreter = interpreter<TypeHashURI, UnionURI>()(() => ({
  _F: TypeHashURI,
  union:
    (...types) =>
    (config) =>
    (env) => {
      const typeHashes = types.map((a) => a(env).typeHash)
      return new HashType(
        typeHashApplyConfig(config?.conf)(
          {
            typeHash: `(${Object.keys(typeHashes)
              .map((t) => typeHashes[t].typeHash)
              .sort()
              .join(" | ")})`
          },
          env,
          {
            typeHashes: typeHashes as any
          }
        )
      )
    }
}))
