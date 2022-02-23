// ets_tracing: off

import { pipe } from "@effect-ts/core/Function"
import * as T from "@effect-ts/core/Sync"

import type { RefinedURI } from "../../Algebra/Refined/index.js"
import { interpreter } from "../../HKT/index.js"
import { strictApplyConfig, StrictType, StrictURI } from "../base/index.js"

export const strictRefinedInterpreter = interpreter<StrictURI, RefinedURI>()(() => ({
  _F: StrictURI,
  refined: (getStrict, _ref, config) => (env) =>
    pipe(
      getStrict(env).strict,
      (strict) =>
        new StrictType(
          strictApplyConfig(config?.conf)(
            {
              shrink: T.succeed
            },
            env,
            { strict }
          )
        )
    ),
  constrained: (getStrict, _ref, config) => (env) =>
    pipe(
      getStrict(env).strict,
      (strict) =>
        new StrictType(
          strictApplyConfig(config?.conf)(
            {
              shrink: T.succeed
            },
            env,
            { strict }
          )
        )
    )
}))
