// ets_tracing: off

import { pipe } from "@effect-ts/core/Function"

import type { RefinedURI } from "../../Algebra/Refined/index.js"
import { interpreter } from "../../HKT/index.js"
import { encoderApplyConfig, EncoderType, EncoderURI } from "../base/index.js"

export const encoderRefinedInterpreter = interpreter<EncoderURI, RefinedURI>()(() => ({
  _F: EncoderURI,
  refined: (getEncoder, ref, config) => (env) =>
    pipe(
      getEncoder(env).encoder,
      (encoder) =>
        new EncoderType(
          encoderApplyConfig(config?.conf)(
            {
              encode: encoder.encode
            },
            env,
            { encoder }
          )
        )
    ),
  constrained: (getEncoder, ref, config) => (env) =>
    pipe(
      getEncoder(env).encoder,
      (encoder) =>
        new EncoderType(
          encoderApplyConfig(config?.conf)(
            {
              encode: encoder.encode
            },
            env,
            { encoder }
          )
        )
    )
}))
