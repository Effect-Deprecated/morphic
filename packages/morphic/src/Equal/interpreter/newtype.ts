// ets_tracing: off

import { pipe } from "@effect-ts/core/Function"

import type { NewtypeURI } from "../../Algebra/Newtype/index.js"
import { interpreter } from "../../HKT/index.js"
import { eqApplyConfig, EqType, EqURI } from "../base/index.js"

export const eqNewtypeInterpreter = interpreter<EqURI, NewtypeURI>()(() => ({
  _F: EqURI,
  newtypeIso: (iso, getEq, config) => (env) =>
    pipe(
      getEq(env).eq,
      (eq) =>
        new EqType(
          eqApplyConfig(config?.conf)(
            {
              equals: (x, y) => eq.equals(iso.reverseGet(x), iso.reverseGet(y))
            },
            env,
            { eq }
          )
        )
    ),
  newtypePrism: (prism, getEq, config) => (env) =>
    pipe(
      getEq(env).eq,
      (eq) =>
        new EqType(
          eqApplyConfig(config?.conf)(
            {
              equals: (x, y) => eq.equals(prism.reverseGet(x), prism.reverseGet(y))
            },
            env,
            { eq }
          )
        )
    )
}))
