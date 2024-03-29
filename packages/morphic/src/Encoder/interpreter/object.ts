// ets_tracing: off

import * as R from "@effect-ts/core/Collections/Immutable/Dictionary"
import { pipe } from "@effect-ts/core/Function"
import * as T from "@effect-ts/core/Sync"

import type { ObjectURI } from "../../Algebra/Object/index.js"
import { interpreter } from "../../HKT/index.js"
import { projectFieldWithEnv2 } from "../../Utils/index.js"
import { encoderApplyConfig, EncoderType, EncoderURI } from "../base/index.js"

export const encoderObjectInterpreter = interpreter<EncoderURI, ObjectURI>()(() => ({
  _F: EncoderURI,
  interface: (props, config) => (env) =>
    pipe(projectFieldWithEnv2(props, env), (encoder) => {
      return new EncoderType(
        encoderApplyConfig(config?.conf)(
          {
            encode: R.forEachWithIndexF(T.Applicative)((k, a) =>
              encoder[k] != null ? encoder[k].encoder.encode(a) : T.succeed(a)
            ) as any
          },
          env,
          {
            encoder: R.map_(encoder as R.Dictionary<any>, (d) => d.encoder) as any
          }
        )
      ).setChilds(encoder)
    }),
  partial: (props, config) => (env) =>
    pipe(projectFieldWithEnv2(props, env), (encoder) => {
      return new EncoderType(
        encoderApplyConfig(config?.conf)(
          {
            encode: R.forEachWithIndexF(T.Applicative)((k, a) =>
              typeof a !== "undefined" && encoder[k] != null
                ? encoder[k].encoder.encode(a)
                : T.succeed(a)
            ) as any
          },
          env,
          {
            encoder: R.map_(encoder as R.Dictionary<any>, (d) => d.encoder) as any
          }
        )
      ).setChilds(encoder)
    }),
  both: (props, partial, config) => (env) =>
    pipe(projectFieldWithEnv2(props, env), (encoder) =>
      pipe(projectFieldWithEnv2(partial, env), (encoderPartial) => {
        return new EncoderType(
          encoderApplyConfig(config?.conf)(
            {
              encode: R.forEachWithIndexF(T.Applicative)((k, a) =>
                encoder[k] != null
                  ? encoder[k].encoder.encode(a)
                  : typeof a !== "undefined" && encoderPartial[k] != null
                  ? encoderPartial[k].encoder.encode(a)
                  : T.succeed(a)
              ) as any
            },
            env,
            {
              encoder: R.map_(encoder as R.Dictionary<any>, (d) => d.encoder) as any,
              encoderPartial: R.map_(
                encoderPartial as R.Dictionary<any>,
                (d) => d.encoder
              ) as any
            }
          )
        ).setChilds(encoder)
      })
    )
}))
