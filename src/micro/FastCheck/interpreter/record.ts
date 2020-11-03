import { Foldable as array } from "@effect-ts/core/Classic/Array"
import { first } from "@effect-ts/core/Classic/Associative"
import { fromFoldable } from "@effect-ts/core/Classic/Record"
import { pipe } from "@effect-ts/core/Function"

import type { RecordURI } from "../../Algebra/Record"
import { interpreter } from "../../HKT"
import { accessFC, FastCheckType, FastCheckURI, fcApplyConfig } from "../base"

const recordFromArray = <A>() => fromFoldable(first<A>(), array)

export const fcStrMapInterpreter = interpreter<FastCheckURI, RecordURI>()(() => ({
  _F: FastCheckURI,
  record: (codomain, config) => (env) =>
    pipe(
      codomain(env).arb,
      (arb) =>
        new FastCheckType(
          fcApplyConfig(config?.conf)(
            accessFC(env)
              .array(accessFC(env).tuple(accessFC(env).string(), arb))
              .map(recordFromArray()),
            env,
            {
              arb
            }
          )
        )
    )
}))
