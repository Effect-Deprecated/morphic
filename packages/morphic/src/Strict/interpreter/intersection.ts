// ets_tracing: off

import * as A from "@effect-ts/core/Collections/Immutable/Array"
import { pipe } from "@effect-ts/core/Function"
import * as T from "@effect-ts/core/Sync"

import type { IntersectionURI } from "../../Algebra/Intersection/index.js"
import { interpreter } from "../../HKT/index.js"
import { strictApplyConfig, StrictType, StrictURI } from "../base/index.js"

export const strictIntersectionInterpreter = interpreter<StrictURI, IntersectionURI>()(
  () => ({
    _F: StrictURI,
    intersection:
      (...types) =>
      (config) =>
      (env) => {
        const stricts = types.map((getStrict) => getStrict(env).strict)

        return new StrictType(
          strictApplyConfig(config?.conf)(
            {
              shrink: (u) =>
                pipe(
                  stricts,
                  A.forEachF(T.Applicative)((d) => d.shrink(u)),
                  T.map(A.reduce({} as unknown as any, (b, a) => ({ ...b, ...a })))
                )
            },
            env,
            {
              stricts: stricts as any
            }
          )
        )
      }
  })
)
