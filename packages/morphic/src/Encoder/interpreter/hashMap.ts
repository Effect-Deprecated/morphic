// ets_tracing: off

import { Chunk } from "@effect-ts/core"
import * as R from "@effect-ts/core/Collections/Immutable/Dictionary"
import * as Tp from "@effect-ts/core/Collections/Immutable/Tuple"
import { flow } from "@effect-ts/core/Function"
import * as Sy from "@effect-ts/core/Sync"

import type { HashMapURI } from "../../Algebra/HashMap/index.js"
import { interpreter } from "../../HKT/index.js"
import { encoderApplyConfig, EncoderType, EncoderURI } from "../base/index.js"

export const encoderHashMapInterpreter = interpreter<EncoderURI, HashMapURI>()(() => ({
  _F: EncoderURI,
  hashMap: (getDomain, getCodomain, config) => (env) => {
    const encoder = getDomain(env).encoder
    const coEncoder = getCodomain(env).encoder
    return new EncoderType(
      encoderApplyConfig(config?.conf)(
        {
          encode: flow(
            (x) => x.tupleIterator,
            Sy.forEach((x) =>
              Sy.tuple(encoder.encode(x.get(0)), coEncoder.encode(x.get(1)))
            ),
            Sy.map(flow(Chunk.map(Tp.fromNative), Chunk.toArray, R.fromArray))
          )
        },
        env,
        { encoder }
      )
    )
  }
}))
