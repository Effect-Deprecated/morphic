import * as R from "@effect-ts/core/Classic/Record"
import * as T from "@effect-ts/core/Classic/Sync"
import { pipe } from "@effect-ts/core/Function"

import type { AnyEnv } from "../../Algebra/config"
import type { AlgebraRecord1 } from "../../Algebra/record"
import { isUnknownRecord } from "../../Guard/interpreter/common"
import { memo } from "../../Internal/Utils"
import { decoderApplyConfig } from "../config"
import type { DecodingError } from "../hkt"
import { DecoderType, DecoderURI } from "../hkt"

export const decoderRecordInterpreter = memo(
  <Env extends AnyEnv>(): AlgebraRecord1<DecoderURI, Env> => ({
    _F: DecoderURI,
    record: (getCodomain, config) => (env) =>
      pipe(
        getCodomain(env).decoder,
        (decoder) =>
          new DecoderType(
            decoderApplyConfig(config?.conf)(
              {
                decode: (u) =>
                  isUnknownRecord(u)
                    ? R.foreachF(T.Applicative)(decoder.decode)(u)
                    : T.fail([
                        <DecodingError>{
                          actual: u,
                          message: `${typeof u} is not a record`
                        }
                      ])
              },
              env,
              { decoder }
            )
          )
      )
  })
)
