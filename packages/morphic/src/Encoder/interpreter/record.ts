// ets_tracing: off

import * as R from "@effect-ts/core/Collections/Immutable/Dictionary"
import { pipe } from "@effect-ts/core/Function"
import * as T from "@effect-ts/core/Sync"

import type { RecordURI } from "../../Algebra/Record/index.js"
import { interpreter } from "../../HKT/index.js"
import { encoderApplyConfig, EncoderType, EncoderURI } from "../base/index.js"

export const encoderRecordInterpreter = interpreter<EncoderURI, RecordURI>()(() => ({
  _F: EncoderURI,
  record: (getCodomain, config) => (env) =>
    pipe(
      getCodomain(env).encoder,
      (encoder) =>
        new EncoderType(
          encoderApplyConfig(config?.conf)(
            {
              encode: R.forEachF(T.Applicative)(encoder.encode)
            },
            env,
            { encoder }
          )
        )
    )
}))
