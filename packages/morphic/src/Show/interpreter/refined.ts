// ets_tracing: off

import { pipe } from "@effect-ts/core/Function"

import type { RefinedURI } from "../../Algebra/Refined/index.js"
import { interpreter } from "../../HKT/index.js"
import { showApplyConfig, ShowType, ShowURI } from "../base/index.js"

export const showRefinedInterpreter = interpreter<ShowURI, RefinedURI>()(() => ({
  _F: ShowURI,
  refined: (getShow, _ref, config) => (env) =>
    pipe(
      getShow(env).show,
      (show) =>
        new ShowType(
          showApplyConfig(config?.conf)(
            {
              show: (x) =>
                config?.name ? `<${config.name}>(${show.show(x)})` : show.show(x)
            },
            env,
            {
              show,
              showRefined: show
            }
          )
        )
    ),
  constrained: (getShow, _ref, config) => (env) =>
    pipe(
      getShow(env).show,
      (show) =>
        new ShowType(
          showApplyConfig(config?.conf)(
            {
              show: (x) =>
                config?.name ? `<${config.name}>(${show.show(x)})` : show.show(x)
            },
            env,
            {
              show
            }
          )
        )
    )
}))
