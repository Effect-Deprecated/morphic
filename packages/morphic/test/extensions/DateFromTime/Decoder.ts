import * as T from "@effect-ts/core/Sync"

import { decoderExtension, DecoderType, fail, makeDecoder } from "../../../src/Decoder"
import { decoderApplyConfig } from "../../../src/Decoder/base"

decoderExtension("dateFromTime")(() => (cfg) => (env) =>
  new DecoderType(
    decoderApplyConfig(cfg?.conf)(
      makeDecoder(
        (u, c) => {
          if (typeof u !== "number") {
            return fail(u, c, `${typeof u} is not a number`)
          }
          if (Number.isInteger(u) && Number.isFinite(u)) {
            const d = new Date(u)
            return T.succeed(d)
          } else {
            return fail(u, c, `${u} is not a valid finate integer`)
          }
        },
        "date",
        cfg?.name
      ),
      env,
      {}
    )
  )
)
