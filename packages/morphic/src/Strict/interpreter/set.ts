// ets_tracing: off

import { pipe } from "@effect-ts/core/Function"
import * as T from "@effect-ts/core/Sync"

import type { SetURI } from "../../Algebra/Set/index.js"
import { interpreter } from "../../HKT/index.js"
import { strictApplyConfig, StrictType, StrictURI } from "../base/index.js"

export const strictSetInterpreter = interpreter<StrictURI, SetURI>()(() => ({
  _F: StrictURI,
  set: (a, _, __, config) => (env) =>
    pipe(
      a(env).strict,
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
