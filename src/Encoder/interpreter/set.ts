import * as A from "@effect-ts/core/Classic/Array"
import * as S from "@effect-ts/core/Classic/Set"
import { flow, pipe } from "@effect-ts/core/Function"
import * as T from "@effect-ts/core/Sync"

import type { SetURI } from "../../Algebra/Set"
import { interpreter } from "../../HKT"
import { encoderApplyConfig, EncoderType, EncoderURI } from "../base"

export const encoderSetInterpreter = interpreter<EncoderURI, SetURI>()(() => ({
  _F: EncoderURI,
  set: (a, _, config) => (env) =>
    pipe(
      a(env).encoder,
      (encoder) =>
        new EncoderType(
          encoderApplyConfig(config?.conf)(
            {
              encode: flow(S.toArray(_), A.foreachF(T.Applicative)(encoder.encode))
            },
            env,
            { encoder }
          )
        )
    )
}))
