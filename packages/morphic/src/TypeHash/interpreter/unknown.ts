// ets_tracing: off

import type { UnknownURI } from "../../Algebra/Unknown/index.js"
import { interpreter } from "../../HKT/index.js"
import { HashType, typeHashApplyConfig, TypeHashURI } from "../base/index.js"

export const typeHashUnknownInterpreter = interpreter<TypeHashURI, UnknownURI>()(
  () => ({
    _F: TypeHashURI,
    unknown: (config) => (env) =>
      new HashType(
        typeHashApplyConfig(config?.conf)(
          {
            typeHash: "unknown"
          },
          env,
          {}
        )
      )
  })
)
