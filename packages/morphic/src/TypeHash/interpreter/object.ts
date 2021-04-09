// tracing: off

import { pipe } from "@effect-ts/core/Function"

import type { ObjectURI } from "../../Algebra/Object"
import { interpreter } from "../../HKT"
import { mapRecord, projectFieldWithEnv } from "../../Utils"
import { HashType, typeHashApplyConfig, TypeHashURI } from "../base"

const asPartial = <T>(x: HashType<T>): HashType<Partial<T>> => x as any

function sortRecord(x: Record<string, any>): Record<string, any> {
  const ks = Object.keys(x).sort()
  const r = {}
  ks.forEach((k) => {
    r[k] = x[k]
  })
  return r
}

export const typeHashObjectInterpreter = interpreter<TypeHashURI, ObjectURI>()(() => ({
  _F: TypeHashURI,
  interface: (props, config) => (env) =>
    new HashType(
      pipe(projectFieldWithEnv(props, env)("typeHash"), (typeHash) =>
        typeHashApplyConfig(config?.conf)(
          {
            typeHash: JSON.stringify(sortRecord(mapRecord(typeHash, (h) => h.typeHash)))
          },
          env,
          {
            typeHash: typeHash as any
          }
        )
      )
    ),
  partial: (props, config) => (env) =>
    asPartial(
      new HashType(
        pipe(projectFieldWithEnv(props, env)("typeHash"), (typeHash) =>
          typeHashApplyConfig(config?.conf)(
            {
              typeHash: JSON.stringify(
                sortRecord(
                  mapRecord(
                    mapRecord(typeHash, (h) => h.typeHash),
                    (h) => `${h} | undefined`
                  )
                )
              )
            },
            env,
            {
              typeHash: typeHash as any
            }
          )
        )
      )
    ),
  both: (props, partial, config) => (env) =>
    new HashType(
      pipe(projectFieldWithEnv(props, env)("typeHash"), (typeHash) =>
        pipe(projectFieldWithEnv(partial, env)("typeHash"), (typeHashPartial) =>
          typeHashApplyConfig(config?.conf)(
            {
              typeHash: JSON.stringify(
                sortRecord({
                  ...mapRecord(typeHash, (h) => h.typeHash),
                  ...mapRecord(
                    mapRecord(typeHashPartial, (h) => h.typeHash),
                    (h) => `${h} | undefined`
                  )
                })
              )
            },
            env,
            {
              typeHash: typeHash as any,
              typeHashPartial: typeHashPartial as any
            }
          )
        )
      )
    ) as any
}))
