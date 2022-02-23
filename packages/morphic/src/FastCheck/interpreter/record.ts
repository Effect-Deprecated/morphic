// ets_tracing: off

import { first } from "@effect-ts/core/Associative"
import { Foldable as array } from "@effect-ts/core/Collections/Immutable/Array"
import { fromFoldable } from "@effect-ts/core/Collections/Immutable/Dictionary"
import { fromNative } from "@effect-ts/core/Collections/Immutable/Tuple"
import { pipe } from "@effect-ts/core/Function"

import type { RecordURI } from "../../Algebra/Record/index.js"
import { interpreter } from "../../HKT/index.js"
import { accessFC, FastCheckType, FastCheckURI, fcApplyConfig } from "../base/index.js"

const recordFromArray = <A>(fa: [string, A][]) =>
  fromFoldable(first<A>(), array)(fa.map(fromNative))

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
              .map(recordFromArray),
            env,
            {
              arb
            }
          )
        )
    )
}))
