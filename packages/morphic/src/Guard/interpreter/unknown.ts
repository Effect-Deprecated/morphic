// ets_tracing: off

import type { UnknownURI } from "../../Algebra/Unknown/index.js"
import { interpreter } from "../../HKT/index.js"
import { guardApplyConfig, GuardType, GuardURI } from "../base/index.js"

export const guardUnknownInterpreter = interpreter<GuardURI, UnknownURI>()(() => ({
  _F: GuardURI,
  unknown: (cfg) => (env) =>
    new GuardType(
      guardApplyConfig(cfg?.conf)(
        {
          is: (u): u is unknown => true
        },
        env,
        {}
      )
    )
}))
