// tracing: off

import type { IntersectionURI } from "../../Algebra/Intersection"
import { interpreter } from "../../HKT"
import { HashType, typeHashApplyConfig, TypeHashURI } from "../base"

export const typeHashIntersectionInterpreter = interpreter<
  TypeHashURI,
  IntersectionURI
>()(() => ({
  _F: TypeHashURI,
  intersection: (...types) => (config) => (env) => {
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
