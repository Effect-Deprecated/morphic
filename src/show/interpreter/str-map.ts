import { memo } from "../../utils"
import { showApplyConfig } from "../config"
import { ShowType, ShowURI } from "../hkt"

import { introduce } from "@matechs/core/Function"
import { getShow as RgetShow } from "@matechs/core/Record"
import type { Show } from "@matechs/core/Show"
import type { AnyEnv } from "@matechs/morphic-alg/config"
import type { MatechsAlgebraStrMap1 } from "@matechs/morphic-alg/str-map"

declare module "@matechs/morphic-alg/str-map" {
  interface StrMapConfig<L, A> {
    [ShowURI]: {
      show: Show<A>
    }
  }
}

export const showStrMapInterpreter = memo(
  <Env extends AnyEnv>(): MatechsAlgebraStrMap1<ShowURI, Env> => ({
    _F: ShowURI,
    strMap: (codomain, config) => (env) =>
      introduce(codomain(env).show)(
        (show) => new ShowType(showApplyConfig(config)(RgetShow(show), env, { show }))
      )
  })
)
