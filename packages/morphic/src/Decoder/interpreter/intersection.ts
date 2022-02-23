// ets_tracing: off

import * as A from "@effect-ts/core/Collections/Immutable/Array"
import { pipe } from "@effect-ts/core/Function"
import * as T from "@effect-ts/core/Sync"

import type { IntersectionURI } from "../../Algebra/Intersection/index.js"
import { interpreter } from "../../HKT/index.js"
import { decoderApplyConfig, DecoderType, DecoderURI } from "../base/index.js"
import { makeDecoder } from "../common/index.js"
import { forEachArray, mergePrefer } from "./common.js"

export const decoderIntersectionInterpreter = interpreter<
  DecoderURI,
  IntersectionURI
>()(() => ({
  _F: DecoderURI,
  intersection:
    (...types) =>
    (cfg) =>
    (env) => {
      const decoders = types.map((getDecoder) => getDecoder(env))

      return new DecoderType(
        decoderApplyConfig(cfg?.conf)(
          makeDecoder(
            (u, c) =>
              pipe(
                decoders,
                forEachArray((_, d) => d.decoder.validate(u, c)),
                T.map(A.reduce({} as any, (b, a) => mergePrefer(u, b, a)))
              ),
            "intersection",
            cfg?.name || "Intersection"
          ),
          env,
          {
            decoders: A.map_(decoders, (d) => d.decoder) as any
          }
        )
      ).setChilds(A.reduce_(decoders, {}, (b, d) => ({ ...b, ...d.getChilds() })))
    }
}))
