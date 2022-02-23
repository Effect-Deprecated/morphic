// ets_tracing: off

import * as T from "@effect-ts/core/Sync"

import type { UnknownURI } from "../../Algebra/Unknown/index.js"
import { interpreter } from "../../HKT/index.js"
import { encoderApplyConfig, EncoderType, EncoderURI } from "../base/index.js"

export const encoderUnknownInterpreter = interpreter<EncoderURI, UnknownURI>()(() => ({
  _F: EncoderURI,
  unknown: (cfg) => (env) =>
    new EncoderType(
      encoderApplyConfig(cfg?.conf)(
        {
          encode: T.succeed
        },
        env,
        {}
      )
    )
}))
