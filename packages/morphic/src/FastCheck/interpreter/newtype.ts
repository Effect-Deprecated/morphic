// ets_tracing: off

import { pipe } from "@effect-ts/core/Function"
import type { Some } from "@effect-ts/core/Option"

import type { NewtypeURI } from "../../Algebra/Newtype/index.js"
import { interpreter } from "../../HKT/index.js"
import { FastCheckType, FastCheckURI, fcApplyConfig } from "../base/index.js"

export const fcNewtypeInterpreter = interpreter<FastCheckURI, NewtypeURI>()(() => ({
  _F: FastCheckURI,
  newtypeIso: (iso, getArb, config) => (env) =>
    pipe(
      getArb(env).arb,
      (arb) =>
        new FastCheckType(fcApplyConfig(config?.conf)(arb.map(iso.get), env, { arb }))
    ),
  newtypePrism: (prism, getArb, config) => (env) =>
    pipe(
      getArb(env).arb,
      (arb) =>
        new FastCheckType(
          fcApplyConfig(config?.conf)(
            arb
              .filter((a) => prism.getOption(a)._tag === "Some")
              .map((a) => (prism.getOption(a) as Some<any>).value),
            env,
            { arb }
          )
        )
    )
}))
