// ets_tracing: off

import * as A from "@effect-ts/core/Collections/Immutable/Array"
import * as R from "@effect-ts/core/Collections/Immutable/Dictionary"
import * as HM from "@effect-ts/core/Collections/Immutable/HashMap"
import { pipe } from "@effect-ts/core/Function"
import * as Sy from "@effect-ts/core/Sync"

import type { HashMapURI } from "../../Algebra/HashMap/index.js"
import { isUnknownRecord } from "../../Guard/interpreter/common.js"
import { interpreter } from "../../HKT/index.js"
import { decoderApplyConfig, DecoderType, DecoderURI } from "../base/index.js"
import { appendContext, fail, makeDecoder } from "../common/index.js"
import { forEachArray, tuple } from "./common.js"

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
                  R.toArray(u),
                  forEachArray((i, x) => {
                    const k = x.get(0)
                    const a = x.get(1)
                    return tuple(
                      decoder.validate(k, appendContext(c, k, decoder, u)),
                      coDecoder.validate(a, appendContext(c, k, coDecoder, u))
                    )
                  }),
                  Sy.map(A.reduce(HM.make(), (h, t) => HM.set_(h, t[0], t[1])))
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
