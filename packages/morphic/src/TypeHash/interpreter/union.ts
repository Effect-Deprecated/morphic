// tracing: off

import type { UnionURI } from "../../Algebra/Union"
import { interpreter } from "../../HKT"
import { HashType, typeHashApplyConfig, TypeHashURI } from "../base"

export const typeHashUnionInterpreter = interpreter<TypeHashURI, UnionURI>()(() => ({
  _F: TypeHashURI,
  union: (...types) => (_, config) => (env) => {
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
