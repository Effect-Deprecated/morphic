// ets_tracing: off

import type { TaggedUnionURI } from "../../Algebra/TaggedUnion/index.js"
import { interpreter } from "../../HKT/index.js"
import { mapRecord } from "../../Utils/index.js"
import type { Encoder } from "../base/index.js"
import { encoderApplyConfig, EncoderType, EncoderURI } from "../base/index.js"

export const encoderTaggedUnionInterpreter = interpreter<EncoderURI, TaggedUnionURI>()(
  () => ({
    _F: EncoderURI,
    taggedUnion: (tag, types, config) => (env) => {
      const encoders = mapRecord(types, (a) => a(env).encoder)

      return new EncoderType(
        encoderApplyConfig(config?.conf)(
          {
            encode: (u) =>
              (encoders[u[tag as any] as any] as Encoder<any, any>).encode(u)
          },
          env,
          {
            encoders: encoders as any
          }
        )
      )
    }
  })
)
