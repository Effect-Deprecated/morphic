// ets_tracing: off

import * as T from "@effect-ts/core/Sync"

import type { UnknownURI } from "../../Algebra/Unknown/index.js"
import { interpreter } from "../../HKT/index.js"
import { strictApplyConfig, StrictType, StrictURI } from "../base/index.js"

export const strictUnknownInterpreter = interpreter<StrictURI, UnknownURI>()(() => ({
  _F: StrictURI,
  unknown: (cfg) => (env) =>
    new StrictType(
      strictApplyConfig(cfg?.conf)(
        {
          shrink: T.succeed
        },
        env,
        {}
      )
    )
}))
