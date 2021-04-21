// tracing: off

import { first } from "@effect-ts/core/Associative"
import { Foldable as array } from "@effect-ts/core/Collections/Immutable/Array"
import { fromFoldable } from "@effect-ts/core/Collections/Immutable/Dictionary"
import { tuple } from "@effect-ts/core/Collections/Immutable/Tuple"
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
              .map((a) => a.map((b) => tuple(...b)))
              .map(recordFromArray()),
            env,
            {
              arb
            }
          )
        )
    )
}))
