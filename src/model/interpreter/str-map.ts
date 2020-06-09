import { memo } from "../../utils"
import * as M from "../codec"
import { modelApplyConfig } from "../config"
import { ModelType, ModelURI } from "../hkt"

import { introduce } from "@matechs/core/Function"
import type { AnyEnv } from "@matechs/morphic-alg/config"
import type { MatechsAlgebraStrMap2 } from "@matechs/morphic-alg/str-map"

export const modelStrMapInterpreter = memo(
  <Env extends AnyEnv>(): MatechsAlgebraStrMap2<ModelURI, Env> => ({
    _F: ModelURI,
    record: (codomain, config) => (env) =>
      introduce(codomain(env).codec)(
        (model) =>
          new ModelType(
            modelApplyConfig(config?.conf)(
              M.record(M.string, model, config?.name),
              env,
              { model }
            )
          )
      )
  })
)
