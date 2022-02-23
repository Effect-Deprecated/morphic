// ets_tracing: off

import type { TaggedUnionURI } from "../../Algebra/TaggedUnion/index.js"
import { interpreter } from "../../HKT/index.js"
import { mapRecord } from "../../Utils/index.js"
import { HashType, typeHashApplyConfig, TypeHashURI } from "../base/index.js"

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
