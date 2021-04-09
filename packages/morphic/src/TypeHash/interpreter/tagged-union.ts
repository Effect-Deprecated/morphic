// tracing: off

import type { TaggedUnionURI } from "../../Algebra/TaggedUnion"
import { interpreter } from "../../HKT"
import { mapRecord } from "../../Utils"
import { HashType, typeHashApplyConfig, TypeHashURI } from "../base"

export const typeHashTaggedUnionInterpreter = interpreter<
  TypeHashURI,
  TaggedUnionURI
>()(() => ({
  _F: TypeHashURI,
  taggedUnion: (tag, types, config) => (env) => {
    const typeHashes = mapRecord(types as any, (a) => a(env).typeHash)
    return new HashType(
      typeHashApplyConfig(config?.conf)(
        {
          typeHash: `Tagged(${tag})(${Object.keys(typeHashes)
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
