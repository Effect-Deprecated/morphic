// ets_tracing: off

import * as S from "@effect-ts/core/Sync"

import type { UnionURI } from "../../Algebra/Union/index.js"
import { interpreter } from "../../HKT/index.js"
import { decoderApplyConfig, DecoderType, DecoderURI } from "../base/index.js"
import type { Decoder, ValidationError } from "../common/index.js"
import { appendContext, failures, makeDecoder } from "../common/index.js"

export const decoderUnionInterpreter = interpreter<DecoderURI, UnionURI>()(() => ({
  _F: DecoderURI,
  union:
    (...types) =>
    (cfg) =>
    (env) => {
      const decoders = types.map((a) => a(env))

      return new DecoderType(
        decoderApplyConfig(cfg?.conf)(
          makeDecoder(
            (u, c) =>
              S.gen(function* (_) {
                const errors = [] as ValidationError[]
                for (const d in decoders) {
                  const res = yield* _(
                    S.either(
                      (decoders[d].decoder as Decoder<any>).validate(
                        u,
                        appendContext(c, "", decoders[d].decoder, u)
                      )
                    )
                  )
                  if (res._tag === "Right") {
                    return res.right
                  } else {
                    errors.push(...res.left)
                  }
                }

                return yield* _(failures(errors))
              }),
            "union",
            cfg?.name || "Union"
          ),
          env,
          {
            decoders: decoders as any
          }
        )
      )
    }
}))
