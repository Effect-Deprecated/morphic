// tracing: off

import { pipe } from "@effect-ts/core/Function"
import * as Ord from "@effect-ts/core/Ord"
import * as S from "@effect-ts/core/Set"
import * as T from "@effect-ts/core/Sync"

import type { SetURI } from "../../Algebra/Set"
import { interpreter } from "../../HKT"
import { decoderApplyConfig, DecoderType, DecoderURI } from "../base"
import { appendContext, fail, makeDecoder } from "../common"
import { forEachArray } from "./common"

export const decoderSetInterpreter = interpreter<DecoderURI, SetURI>()(() => ({
  _F: DecoderURI,
  set: (a, ord, eq, cfg) => (env) =>
    pipe(
      a(env).decoder,
      (decoder) =>
        new DecoderType(
          decoderApplyConfig(cfg?.conf)(
            makeDecoder(
              (u, c) =>
                Array.isArray(u)
                  ? pipe(
                      u,
                      forEachArray((k, a) =>
                        decoder.validate(a, appendContext(c, String(k), decoder, a))
                      ),
                      T.map(S.fromArray(eq ?? Ord.getEqual(ord)))
                    )
                  : fail(u, c, `${typeof u} is not a Set`),
              "set",
              cfg?.name || "Set"
            ),
            env,
            { decoder }
          )
        )
    )
}))
