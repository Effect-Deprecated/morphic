// tracing: off

import type { UnknownURI } from "../../Algebra/Unknown"
import { interpreter } from "../../HKT"
import { HashType, typeHashApplyConfig, TypeHashURI } from "../base"

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
