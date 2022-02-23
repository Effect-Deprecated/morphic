// ets_tracing: off

import { getShow as SgetShow } from "@effect-ts/core/Collections/Immutable/Set"
import { pipe } from "@effect-ts/core/Function"

import type { SetURI } from "../../Algebra/Set/index.js"
import { interpreter } from "../../HKT/index.js"
import { showApplyConfig, ShowType, ShowURI } from "../base/index.js"

export const showSetInterpreter = interpreter<ShowURI, SetURI>()(() => ({
  _F: ShowURI,
  set: (getShow, _ord, _eq, config) => (env) =>
    pipe(
      getShow(env).show,
      (show) =>
        new ShowType(showApplyConfig(config?.conf)(SgetShow(show), env, { show }))
    )
}))
