// ets_tracing: off

import { pipe } from "@effect-ts/core/Function"
import * as O from "@effect-ts/core/Option"
import * as T from "@effect-ts/core/Sync"

import type { NewtypeURI } from "../../Algebra/Newtype/index.js"
import { interpreter } from "../../HKT/index.js"
import { decoderApplyConfig, DecoderType, DecoderURI } from "../base/index.js"
import { fail, makeDecoder } from "../common/index.js"

export const decoderNewtypeInterpreter = interpreter<DecoderURI, NewtypeURI>()(() => ({
  _F: DecoderURI,
  newtypeIso: (iso, getDecoder, cfg) => (env) =>
    pipe(
      getDecoder(env).decoder,
      (decoder) =>
        new DecoderType(
          decoderApplyConfig(cfg?.conf)(
            makeDecoder(
              (u, c) => pipe(decoder.validate(u, c), T.map(iso.get)),
              "newtypeIso",
              cfg?.name || "NewtypeIso"
            ),
            env,
            { decoder }
          )
        )
    ),
  newtypePrism: (prism, getDecoder, cfg) => (env) =>
    pipe(
      getDecoder(env).decoder,
      (decoder) =>
        new DecoderType(
          decoderApplyConfig(cfg?.conf)(
            makeDecoder(
              (u, c) =>
                pipe(
                  decoder.validate(u, c),
                  T.map(prism.getOption),
                  T.chain(
                    O.fold(
                      () => fail(u, c, `newtype doesn't satisfy prism conditions`),
                      T.succeed
                    )
                  )
                ),
              "newtypePrism",
              cfg?.name || "NewtypePrism"
            ),
            env,
            { decoder }
          )
        )
    )
}))
