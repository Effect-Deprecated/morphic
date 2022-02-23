// ets_tracing: off

import * as T from "@effect-ts/core/Sync"

import type { UnknownURI } from "../../Algebra/Unknown/index.js"
import { interpreter } from "../../HKT/index.js"
import { decoderApplyConfig, DecoderType, DecoderURI } from "../base/index.js"
import { makeDecoder } from "../common/index.js"

export const decoderUnknownInterpreter = interpreter<DecoderURI, UnknownURI>()(() => ({
  _F: DecoderURI,
  unknown: (cfg) => (env) =>
    new DecoderType(
      decoderApplyConfig(cfg?.conf)(
        makeDecoder(T.succeed, "unknown", cfg?.name || "unknown"),
        env,
        {}
      )
    )
}))
