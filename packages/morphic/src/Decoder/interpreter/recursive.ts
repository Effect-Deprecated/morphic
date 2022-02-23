// ets_tracing: off

import { pipe } from "@effect-ts/core/Function"

import type { RecursiveURI } from "../../Algebra/Recursive/index.js"
import { interpreter } from "../../HKT/index.js"
import { memo } from "../../Utils/index.js"
import { decoderApplyConfig, DecoderType, DecoderURI } from "../base/index.js"
import { makeDecoder } from "../common/index.js"

export const decoderRecursiveInterpreter = interpreter<DecoderURI, RecursiveURI>()(
  () => ({
    _F: DecoderURI,
    recursive: (a, cfg) => {
      const get = memo(() => a(res))
      const res: ReturnType<typeof a> = (env) =>
        new DecoderType(
          pipe(
            () => get()(env).decoder,
            (getDecoder) =>
              decoderApplyConfig(cfg?.conf)(
                makeDecoder(
                  (u, c) => getDecoder().validate(u, c),
                  "recursive",
                  cfg?.name || "Recursive"
                ),
                env,
                {}
              )
          )
        )
      return res
    }
  })
)
