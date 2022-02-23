// ets_tracing: off

import { flow, pipe } from "@effect-ts/core/Function"

import type { NewtypeURI } from "../../Algebra/Newtype/index.js"
import { interpreter } from "../../HKT/index.js"
import { encoderApplyConfig, EncoderType, EncoderURI } from "../base/index.js"

export const encoderNewtypeInterpreter = interpreter<EncoderURI, NewtypeURI>()(() => ({
  _F: EncoderURI,
  newtypeIso: (iso, getEncoder, config) => (env) =>
    pipe(
      getEncoder(env).encoder,
      (encoder) =>
        new EncoderType(
          encoderApplyConfig(config?.conf)(
            {
              encode: flow(iso.reverseGet, encoder.encode)
            },
            env,
            { encoder }
          )
        )
    ),
  newtypePrism: (prism, getEncoder, config) => (env) =>
    pipe(
      getEncoder(env).encoder,
      (encoder) =>
        new EncoderType(
          encoderApplyConfig(config?.conf)(
            {
              encode: flow(prism.reverseGet, encoder.encode)
            },
            env,
            { encoder }
          )
        )
    )
}))
