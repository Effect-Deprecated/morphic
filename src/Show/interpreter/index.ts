import type { AnyEnv } from "../../HKT"
import { memo, merge } from "../../Utils"
import { showIntersectionInterpreter } from "./intersection"
import { showNewtypeInterpreter } from "./newtype"
import { showObjectInterpreter } from "./object"
import { showPrimitiveInterpreter } from "./primitives"
import { showRecordInterpreter } from "./record"
import { showRecursiveInterpreter } from "./recursive"
import { showRefinedInterpreter } from "./refined"
import { showSetInterpreter } from "./set"
import { showTaggedUnionInterpreter } from "./tagged-union"
import { showUnknownInterpreter } from "./unknown"

export const allModelShow = <Env extends AnyEnv>() =>
  merge(
    showRefinedInterpreter<Env>(),
    showNewtypeInterpreter<Env>(),
    showUnknownInterpreter<Env>(),
    showPrimitiveInterpreter<Env>(),
    showIntersectionInterpreter<Env>(),
    showObjectInterpreter<Env>(),
    showTaggedUnionInterpreter<Env>(),
    showRecursiveInterpreter<Env>(),
    showSetInterpreter<Env>(),
    showRecordInterpreter<Env>()
  )

export const modelShowInterpreter = memo(allModelShow) as typeof allModelShow
