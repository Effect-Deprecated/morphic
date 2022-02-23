// ets_tracing: off

import * as R from "@effect-ts/core/Collections/Immutable/Dictionary"
import * as E from "@effect-ts/core/Equal"
import { pipe } from "@effect-ts/core/Function"

import type { ObjectURI } from "../../Algebra/Object/index.js"
import { interpreter } from "../../HKT/index.js"
import { mapRecord, projectFieldWithEnv2 } from "../../Utils/index.js"
import { eqApplyConfig, EqType, EqURI } from "../base/index.js"

const asPartial = <T>(x: EqType<T>): EqType<Partial<T>> => x as any

export const eqOrUndefined = <A>(eq: E.Equal<A>): E.Equal<A | undefined> => ({
  equals: (x, y) =>
    typeof x === "undefined" && typeof y === "undefined"
      ? true
      : typeof x === "undefined"
      ? false
      : typeof y === "undefined"
      ? false
      : eq.equals(x, y)
})

export const eqObjectInterpreter = interpreter<EqURI, ObjectURI>()(() => ({
  _F: EqURI,
  interface: (props, config) => (env) =>
    pipe(projectFieldWithEnv2(props, env), (eq) => {
      const equals = R.map_(eq as R.Dictionary<any>, (e) => e.eq)
      return new EqType(
        eqApplyConfig(config?.conf)(E.struct(equals) as any, env, {
          eq: equals as any
        })
      ).setChilds(eq)
    }),
  partial: (props, config) => (env) =>
    pipe(projectFieldWithEnv2(props, env), (eq) => {
      const equals = R.map_(eq as R.Dictionary<any>, (e) => e.eq)
      return asPartial(
        new EqType(
          eqApplyConfig(config?.conf)(
            E.struct(mapRecord(equals, eqOrUndefined)) as any,
            env,
            { eq: equals as any }
          )
        )
      ).setChilds(eq)
    }),
  both: (props, partial, config) => (env) =>
    pipe(
      [projectFieldWithEnv2(props, env), projectFieldWithEnv2(partial, env)] as const,
      ([eq, eqPartial]) => {
        const equals = R.map_(eq as R.Dictionary<any>, (e) => e.eq)
        const equalsPartial = R.map_(eqPartial as R.Dictionary<any>, (e) => e.eq)
        return new EqType(
          eqApplyConfig(config?.conf)(
            E.struct({ ...equals, ...mapRecord(equalsPartial, eqOrUndefined) }),
            env,
            {
              eq: equals as any,
              eqPartial: equalsPartial as any
            }
          )
        ).setChilds({ ...eq, ...eqPartial })
      }
    )
}))
