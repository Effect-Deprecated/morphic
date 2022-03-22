// ets_tracing: off

import { Chunk } from "@effect-ts/core"
import * as HM from "@effect-ts/core/Collections/Immutable/HashMap"
import { pipe } from "@effect-ts/core/Function"
import * as Sy from "@effect-ts/core/Sync"

import type { HashMapURI } from "../../Algebra/HashMap/index.js"
import { isUnknownRecord } from "../../Guard/interpreter/common.js"
import { interpreter } from "../../HKT/index.js"
import { decoderApplyConfig, DecoderType, DecoderURI } from "../base/index.js"
import { appendContext, fail, makeDecoder } from "../common/index.js"
import { tuple } from "./common.js"

export const decoderHashMapInterpreter = interpreter<DecoderURI, HashMapURI>()(() => ({
  _F: DecoderURI,
  hashMap: (getDomain, getCodomain, cfg) => (env) => {
    const coDecoder = getCodomain(env).decoder
    const decoder = getDomain(env).decoder
    return new DecoderType(
      decoderApplyConfig(cfg?.conf)(
        makeDecoder(
          (u, c) =>
            isUnknownRecord(u)
              ? pipe(
                  Object.entries(u),
                  Chunk.from,
                  Sy.forEach(([k, a]) =>
                    tuple(
                      decoder.validate(k, appendContext(c, k, decoder, u)),
                      coDecoder.validate(a, appendContext(c, k, coDecoder, u))
                    )
                  ),
                  Sy.map(Chunk.reduce(HM.make(), (h, t) => HM.set_(h, t[0], t[1])))
                )
              : fail(u, c, `${typeof u} is not a hashMap`),
          "hashMap",
          cfg?.name || "hashMap"
        ),
        env,
        { decoder, coDecoder }
      )
    )
  }
}))
