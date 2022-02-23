// ets_tracing: off

import type { TaggedUnionURI } from "../../Algebra/TaggedUnion/index.js"
import { isUnknownRecord } from "../../Guard/interpreter/common.js"
import { interpreter } from "../../HKT/index.js"
import { mapRecord } from "../../Utils/index.js"
import { decoderApplyConfig, DecoderType, DecoderURI } from "../base/index.js"
import type { Decoder } from "../common/index.js"
import { appendContext, fail, makeDecoder } from "../common/index.js"

export const decoderTaggedUnionInterpreter = interpreter<DecoderURI, TaggedUnionURI>()(
  () => ({
    _F: DecoderURI,
    taggedUnion: (tag, types, cfg) => (env) => {
      const decoders = mapRecord(types, (a) => a(env).decoder)

      return new DecoderType(
        decoderApplyConfig(cfg?.conf)(
          makeDecoder(
            (u, c) => {
              if (isUnknownRecord(u)) {
                if (tag in u) {
                  const dec = decoders[u[tag] as any]

                  if (dec) {
                    return (dec as Decoder<any>).validate(
                      u,
                      appendContext(c, "", dec, u)
                    )
                  } else {
                    return fail(
                      u,
                      c,
                      `${u[tag]} is not known in (${Object.keys(decoders).join(", ")})`
                    )
                  }
                }
                return fail(u, c, `${tag} field not found`)
              }
              return fail(u, c, `${typeof u} is not a record`)
            },
            "taggedUnion",
            cfg?.name || "TaggedUnion"
          ),
          env,
          {
            decoders: decoders as any
          }
        )
      )
    }
  })
)
