// ets_tracing: off

import * as A from "@effect-ts/core/Collections/Immutable/Array"
import { pipe } from "@effect-ts/core/Function"
import * as T from "@effect-ts/core/Sync"

import type { IntersectionURI } from "../../Algebra/Intersection/index.js"
import { mergePrefer } from "../../Decoder/interpreter/common.js"
import { interpreter } from "../../HKT/index.js"
import { encoderApplyConfig, EncoderType, EncoderURI } from "../base/index.js"

export const encoderIntersectionInterpreter = interpreter<
  EncoderURI,
  IntersectionURI
>()(() => ({
  _F: EncoderURI,
  intersection:
    (...types) =>
    (config) =>
    (env) => {
      const encoders = types.map((getEncoder) => getEncoder(env))
      return new EncoderType(
        encoderApplyConfig(config?.conf)(
          {
            encode: (u) =>
              pipe(
                encoders,
                A.forEachF(T.Applicative)((d) => d.encoder.encode(u)),
                T.map(A.reduce({} as unknown as any, (b, a) => mergePrefer(u, b, a)))
              )
          },
          env,
          {
            encoders: A.map_(encoders, (d) => d.encoder) as any
          }
        )
      ).setChilds(A.reduce_(encoders, {}, (b, d) => ({ ...b, ...d.getChilds() })))
    }
}))
