// ets_tracing: off

import { Chunk } from "@effect-ts/core"
import * as HM from "@effect-ts/core/Collections/Immutable/HashMap"
import { flow } from "@effect-ts/core/Function"
import * as Sy from "@effect-ts/core/Sync"

import type { HashMapURI } from "../../Algebra/HashMap/index.js"
import { interpreter } from "../../HKT/index.js"
import type { Reorder } from "../base/index.js"
import { reorderApplyConfig, ReorderType, ReorderURI } from "../base/index.js"

export type AOfReorder<X extends Reorder<any>> = X extends Reorder<infer A> ? A : never

export const reorderHashMapInterpreter = interpreter<ReorderURI, HashMapURI>()(() => ({
  _F: ReorderURI,
  hashMap: (getDomain, getCodomain, config) => (env) => {
    const reorder = getDomain(env).reorder
    const coReorder = getCodomain(env).reorder

    return new ReorderType(
      reorderApplyConfig(config?.conf)(
        {
          reorder: flow(
            Chunk.from,
            Sy.forEach((t) => Sy.tuple(reorder.reorder(t[0]), coReorder.reorder(t[1]))),
            Sy.map(
              Chunk.reduce(
                HM.make<AOfReorder<typeof reorder>, AOfReorder<typeof coReorder>>(),
                (h, t) => HM.set_(h, t[0], t[1])
              )
            )
          )
        },
        env,
        { reorder, coReorder }
      )
    )
  }
}))
