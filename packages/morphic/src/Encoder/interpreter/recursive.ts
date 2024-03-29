// ets_tracing: off

import { pipe } from "@effect-ts/core/Function"

import type { RecursiveURI } from "../../Algebra/Recursive/index.js"
import { interpreter } from "../../HKT/index.js"
import { memo } from "../../Utils/index.js"
import { encoderApplyConfig, EncoderType, EncoderURI } from "../base/index.js"

export const encoderRecursiveInterpreter = interpreter<EncoderURI, RecursiveURI>()(
  () => ({
    _F: EncoderURI,
    recursive: (a, config) => {
      const get = memo(() => a(res))
      const res: ReturnType<typeof a> = (env) =>
        new EncoderType(
          pipe(
            () => get()(env).encoder,
            (getEncoder) =>
              encoderApplyConfig(config?.conf)(
                {
                  encode: (u) => getEncoder().encode(u)
                },
                env,
                {}
              )
          )
        )
      return res
    }
  })
)
