// ets_tracing: off

import { pipe } from "@effect-ts/core/Function"

import type { UnknownURI } from "../../Algebra/Unknown/index.js"
import { interpreter } from "../../HKT/index.js"
import { showApplyConfig, ShowType, ShowURI } from "../base/index.js"

export const showUnknownInterpreter = interpreter<ShowURI, UnknownURI>()(() => ({
  _F: ShowURI,
  unknown: (config) => (env) =>
    new ShowType(
      pipe(
        {
          show: (_any: any) => config?.name || "<unknown>"
        },
        (show) => showApplyConfig(config?.conf)(show, env, {})
      )
    )
}))
