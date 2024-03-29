// ets_tracing: off

import { pipe } from "@effect-ts/core/Function"

import type { RecordURI } from "../../Algebra/Record/index.js"
import { interpreter } from "../../HKT/index.js"
import { HashType, typeHashApplyConfig, TypeHashURI } from "../base/index.js"

export const typeHashRecordInterpreter = interpreter<TypeHashURI, RecordURI>()(() => ({
  _F: TypeHashURI,
  record: (codomain, config) => (env) =>
    pipe(
      codomain(env).typeHash,
      (typeHash) =>
        new HashType(
          typeHashApplyConfig(config?.conf)(
            {
              typeHash: `Record<string, ${typeHash.typeHash}>`
            },
            env,
            { typeHash }
          )
        )
    )
}))
