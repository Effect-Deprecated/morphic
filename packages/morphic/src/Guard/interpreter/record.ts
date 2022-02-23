// ets_tracing: off

import { pipe } from "@effect-ts/core/Function"

import type { RecordURI } from "../../Algebra/Record/index.js"
import { interpreter } from "../../HKT/index.js"
import { guardApplyConfig, GuardType, GuardURI } from "../base/index.js"
import type { AOfGuard } from "./common.js"
import { isUnknownRecord } from "./common.js"

export const guardRecordInterpreter = interpreter<GuardURI, RecordURI>()(() => ({
  _F: GuardURI,
  record: (getCodomain, config) => (env) =>
    pipe(
      getCodomain(env).guard,
      (guard) =>
        new GuardType(
          guardApplyConfig(config?.conf)(
            {
              is: (u): u is Readonly<Record<string, AOfGuard<typeof guard>>> =>
                isUnknownRecord(u) &&
                Object.keys(u).every((k) => typeof k === "string" && guard.is(u[k]))
            },
            env,
            { guard }
          )
        )
    )
}))
