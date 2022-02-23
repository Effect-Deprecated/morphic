// ets_tracing: off

import { pipe } from "@effect-ts/core/Function"

import type { SetURI } from "../../Algebra/Set/index.js"
import { interpreter } from "../../HKT/index.js"
import { HashType, typeHashApplyConfig, TypeHashURI } from "../base/index.js"

export const typeHashSetInterpreter = interpreter<TypeHashURI, SetURI>()(() => ({
  _F: TypeHashURI,
  set: (getHash, _ord, _eq, config) => (env) =>
    pipe(
      getHash(env).typeHash,
      (typeHash) =>
        new HashType(
          typeHashApplyConfig(config?.conf)(
            {
              typeHash: `Set<${typeHash.typeHash}>`
            },
            env,
            { typeHash }
          )
        )
    )
}))
