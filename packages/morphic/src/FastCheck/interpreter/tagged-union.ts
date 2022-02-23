// ets_tracing: off

import { pipe } from "@effect-ts/core/Function"

import type { TaggedUnionURI } from "../../Algebra/TaggedUnion/index.js"
import { interpreter } from "../../HKT/index.js"
import { collect } from "../../Utils/index.js"
import { accessFC, FastCheckType, FastCheckURI, fcApplyConfig } from "../base/index.js"

export const fcTaggedUnionInterpreter = interpreter<FastCheckURI, TaggedUnionURI>()(
  () => ({
    _F: FastCheckURI,
    taggedUnion: (_tag, dic, config) => (env) =>
      new FastCheckType(
        pipe(
          collect(dic, (_, getArb) => getArb(env).arb),
          (arbs) =>
            fcApplyConfig(config?.conf)(accessFC(env).oneof(...arbs) as any, env, {
              arbs: arbs as any
            })
        )
      )
  })
)
