import { memo } from "../../utils"
import { fcApplyConfig, accessFC } from "../config"
import { FastCheckType, FastCheckURI } from "../hkt"

import { introduce } from "@matechs/core/Function"
import type { AnyEnv, ConfigsForType } from "@matechs/morphic-alg/config"
import type {
  MatechsAlgebraIntersection1,
  IntersectionConfig
} from "@matechs/morphic-alg/intersection"

export const fcIntersectionInterpreter = memo(
  <Env extends AnyEnv>(): MatechsAlgebraIntersection1<FastCheckURI, Env> => ({
    _F: FastCheckURI,
    intersection: <A>(
      items: ((env: Env) => FastCheckType<A>)[],
      config?: {
        conf?: ConfigsForType<Env, unknown, A, IntersectionConfig<unknown[], A[]>>
      }
    ) => (env: Env) =>
      introduce(items.map((getArb) => getArb(env).arb))(
        (arbs) =>
          new FastCheckType(
            fcApplyConfig(config?.conf)(
              accessFC(env)
                .genericTuple(arbs)
                .map((all) => Object.assign({}, ...all)),
              env,
              { arbs: arbs as any }
            )
          )
      )
  })
)
