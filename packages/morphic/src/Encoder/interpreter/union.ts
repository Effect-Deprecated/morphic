// ets_tracing: off

import type { UnionURI } from "../../Algebra/Union/index.js"
import { interpreter } from "../../HKT/index.js"
import { encoderApplyConfig, EncoderType, EncoderURI } from "../base/index.js"

export const encoderUnionInterpreter = interpreter<EncoderURI, UnionURI>()(() => ({
  _F: EncoderURI,
  union:
    (...types) =>
    (config) =>
    (env) => {
      const encoders = types.map((a: any) => a(env).encoder)

      return new EncoderType(
        encoderApplyConfig(config?.conf)(
          {
            encode: (u) => {
              for (const i in config.guards) {
                if (config.guards[i](u)) {
                  return encoders[i].encode(u)
                }
              }
              throw new Error("BUG: guard not found")
            }
          },
          env,
          {
            encoders: encoders as any
          }
        )
      )
    }
}))
