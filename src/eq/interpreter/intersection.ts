import { memo } from "../../utils"
import { eqApplyConfig } from "../config"
import { EqType, EqURI } from "../hkt"

import { monoidAll, fold } from "@matechs/core/Monoid"
import type { AnyEnv, ConfigsForType } from "@matechs/morphic-alg/config"
import type {
  MatechsAlgebraIntersection1,
  IntersectionConfig
} from "@matechs/morphic-alg/intersection"

export const eqIntersectionInterpreter = memo(
  <Env extends AnyEnv>(): MatechsAlgebraIntersection1<EqURI, Env> => ({
    _F: EqURI,
    intersection: <A>(
      types: ((env: Env) => EqType<A>)[],
      _name: string,
      config?: ConfigsForType<Env, unknown, A, IntersectionConfig<unknown[], A[]>>
    ) => (env: Env) => {
      const equals = types.map((getEq) => getEq(env).eq.equals)
      return new EqType<A>(
        eqApplyConfig(config)(
          {
            equals: (a: A, b: A) => fold(monoidAll)(equals.map((eq) => eq(a, b)))
          },
          env,
          {}
        )
      )
    }
  })
)
