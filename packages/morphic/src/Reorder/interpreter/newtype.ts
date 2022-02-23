// ets_tracing: off

import { pipe } from "@effect-ts/core/Function"

import type { NewtypeURI } from "../../Algebra/Newtype/index.js"
import { interpreter } from "../../HKT/index.js"
import { reorderApplyConfig, ReorderType, ReorderURI } from "../base/index.js"

export const reorderNewtypeInterpreter = interpreter<ReorderURI, NewtypeURI>()(() => ({
  _F: ReorderURI,
  newtypeIso: (_iso, getReorder, config) => (env) =>
    pipe(
      getReorder(env).reorder,
      (reorder) =>
        new ReorderType(
          reorderApplyConfig(config?.conf)(
            {
              reorder: reorder.reorder as any
            },
            env,
            { reorder }
          )
        )
    ),
  newtypePrism: (_prism, getReorder, config) => (env) =>
    pipe(
      getReorder(env).reorder,
      (reorder) =>
        new ReorderType(
          reorderApplyConfig(config?.conf)(
            {
              reorder: reorder.reorder as any
            },
            env,
            { reorder }
          )
        )
    )
}))
