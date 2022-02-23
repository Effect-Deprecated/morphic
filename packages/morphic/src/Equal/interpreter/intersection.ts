// ets_tracing: off

import * as A from "@effect-ts/core/Collections/Immutable/Array"
import { all, fold } from "@effect-ts/core/Identity"

import type { IntersectionURI } from "../../Algebra/Intersection/index.js"
import { interpreter } from "../../HKT/index.js"
import { eqApplyConfig, EqType, EqURI } from "../base/index.js"

export const eqIntersectionInterpreter = interpreter<EqURI, IntersectionURI>()(() => ({
  _F: EqURI,
  intersection:
    (...types) =>
    (config) =>
    (env) => {
      const equals = types.map((getEq) => getEq(env))
      return new EqType(
        eqApplyConfig(config?.conf)(
          {
            equals: (a, b) => fold(all)(equals.map((eq) => eq.eq.equals(a, b)))
          },
          env,
          {
            equals: equals.map((e) => e.eq) as any
          }
        )
      ).setChilds(A.reduce_(equals, {}, (b, d) => ({ ...b, ...d.getChilds() })))
    }
}))
