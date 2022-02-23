// ets_tracing: off

import { equals } from "@effect-ts/system/Structural"

import type { UnknownURI } from "../../Algebra/Unknown/index.js"
import { interpreter } from "../../HKT/index.js"
import { eqApplyConfig, EqType, EqURI } from "../base/index.js"

export const eqUnknownInterpreter = interpreter<EqURI, UnknownURI>()(() => ({
  _F: EqURI,
  unknown: (cfg) => (env) =>
    new EqType(eqApplyConfig(cfg?.conf)({ equals: (x, y) => equals(x, y) }, env, {}))
}))
