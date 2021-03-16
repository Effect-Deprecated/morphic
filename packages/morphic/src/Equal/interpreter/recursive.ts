// tracing: off

import type { RecursiveURI } from "../../Algebra/Recursive"
import { interpreter } from "../../HKT"
import { eqApplyConfig, EqType, EqURI } from "../base"

export const eqRecursiveInterpreter = interpreter<EqURI, RecursiveURI>()(() => ({
  _F: EqURI,
  recursive: (a, config) =>
    function f(env) {
      return new EqType(
        eqApplyConfig(config?.conf)(
          { equals: (x, y) => a(f)(env).eq.equals(x, y) },
          env,
          {}
        )
      )
    }
}))
