// ets_tracing: off

import { pipe } from "@effect-ts/core/Function"

import type { RecordURI } from "../../Algebra/Record/index.js"
import { isUnknownRecord } from "../../Guard/interpreter/common.js"
import { interpreter } from "../../HKT/index.js"
import { decoderApplyConfig, DecoderType, DecoderURI } from "../base/index.js"
import { appendContext, fail, makeDecoder } from "../common/index.js"
import { forEachRecordWithIndex } from "./common.js"

export const decoderRecordInterpreter = interpreter<DecoderURI, RecordURI>()(() => ({
  _F: DecoderURI,
  record: (getCodomain, cfg) => (env) =>
    pipe(
      getCodomain(env).decoder,
      (decoder) =>
        new DecoderType(
          decoderApplyConfig(cfg?.conf)(
            makeDecoder(
              (u, c) =>
                isUnknownRecord(u)
                  ? forEachRecordWithIndex((k, a) =>
                      decoder.validate(a, appendContext(c, k, decoder, u))
                    )(u)
                  : fail(u, c, `${typeof u} is not a record`),
              "record",
              cfg?.name || "Record"
            ),
            env,
            { decoder }
          )
        )
    )
}))
