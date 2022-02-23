// ets_tracing: off

import * as A from "@effect-ts/core/Collections/Immutable/Array"
import * as S from "@effect-ts/core/Collections/Immutable/Set"
import { flow, pipe } from "@effect-ts/core/Function"
import * as T from "@effect-ts/core/Sync"

import type { SetURI } from "../../Algebra/Set/index.js"
import { interpreter } from "../../HKT/index.js"
import { encoderApplyConfig, EncoderType, EncoderURI } from "../base/index.js"

export const encoderSetInterpreter = interpreter<EncoderURI, SetURI>()(() => ({
  _F: EncoderURI,
  set: (a, _, __, config) => (env) =>
    pipe(
      a(env).encoder,
      (encoder) =>
        new EncoderType(
          encoderApplyConfig(config?.conf)(
            {
              encode: flow(S.toArray(_), A.forEachF(T.Applicative)(encoder.encode))
            },
            env,
            { encoder }
          )
        )
    )
}))
