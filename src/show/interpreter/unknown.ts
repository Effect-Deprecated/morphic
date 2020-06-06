import { memo } from "../../utils"
import { showApplyConfig } from "../config"
import { ShowType, ShowURI } from "../hkt"

import { introduce } from "@matechs/core/Function"
import { Show } from "@matechs/core/Show"
import type { AnyEnv } from "@matechs/morphic-alg/config"
import type { MatechsAlgebraUnknown1 } from "@matechs/morphic-alg/unknown"

declare module "@matechs/morphic-alg/unknown" {
  interface UnknownConfig {
    [ShowURI]: {
      show: Show<unknown>
    }
  }
}

export const showUnknownInterpreter = memo(
  <Env extends AnyEnv>(): MatechsAlgebraUnknown1<ShowURI, Env> => ({
    _F: ShowURI,
    unknown: (config) => (env) =>
      new ShowType(
        introduce<Show<unknown>>({ show: (_any: any) => "<unknown>" })((show) =>
          showApplyConfig(config)(show, env, {
            show
          })
        )
      )
  })
)
