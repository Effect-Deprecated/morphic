// ets_tracing: off

import type { HashMapURI } from "../../Algebra/HashMap/index.js"
import { interpreter } from "../../HKT/index.js"
import { HashType, typeHashApplyConfig, TypeHashURI } from "../base/index.js"

export const typeHashHashMapInterpreter = interpreter<TypeHashURI, HashMapURI>()(
  () => ({
    _F: TypeHashURI,
    hashMap: (domain, codomain, config) => (env) => {
      const typeHash = domain(env).typeHash
      const coTypeHash = codomain(env).typeHash
      return new HashType(
        typeHashApplyConfig(config?.conf)(
          {
            typeHash: `HashMap<${typeHash.typeHash}, ${coTypeHash.typeHash}>`
          },
          env,
          { typeHash, coTypeHash }
        )
      )
    }
  })
)
