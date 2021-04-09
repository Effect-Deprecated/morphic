// tracing: off

import { pipe } from "@effect-ts/core/Function"

import type { RecursiveURI } from "../../Algebra/Recursive"
import { interpreter } from "../../HKT"
import { memo } from "../../Utils"
import { HashType, typeHashApplyConfig, TypeHashURI } from "../base"

export const typeHashRecursiveInterpreter = interpreter<TypeHashURI, RecursiveURI>()(
  () => ({
    _F: TypeHashURI,
    recursive: (a, config) => {
      const get = memo(() => a(res))
      const res: ReturnType<typeof a> = (env) =>
        pipe(
          () => get()(env).typeHash,
          (getHash) =>
            new HashType(
              typeHashApplyConfig(config?.conf)(
                { typeHash: getHash().typeHash },
                env,
                {}
              )
            )
        )
      return res
    }
  })
)
