// tracing: off

import { fromArray } from "@effect-ts/core/Collections/Immutable/Set"
import { pipe } from "@effect-ts/core/Function"
import * as Ord from "@effect-ts/core/Ord"

import type { SetURI } from "../../Algebra/Set"
import { interpreter } from "../../HKT"
import { accessFC, FastCheckType, FastCheckURI, fcApplyConfig } from "../base"

export const fcSetInterpreter = interpreter<FastCheckURI, SetURI>()(() => ({
  _F: FastCheckURI,
  set: (a, ord, eq, config) => (env) =>
    pipe(
      a(env).arb,
      (arb) =>
        new FastCheckType(
          fcApplyConfig(config?.conf)(
            accessFC(env)
              .set(arb)
              .map(fromArray(eq ?? Ord.getEqual(ord))),
            env,
            {
              arb
            }
          )
        )
    )
}))
