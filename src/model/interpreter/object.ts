import { projectFieldWithEnv, memo } from "../../utils"
import * as M from "../codec"
import { modelApplyConfig } from "../config"
import { ModelType, ModelURI } from "../hkt"

import { introduce } from "@matechs/core/Function"
import type { ConfigsForType, AnyEnv } from "@matechs/morphic-alg/config"
import type {
  MatechsAlgebraObject2,
  PropsKind2,
  InterfaceConfig,
  PartialConfig,
  BothConfig
} from "@matechs/morphic-alg/object"

export const modelNonStrictObjectInterpreter = memo(
  <Env extends AnyEnv>(): MatechsAlgebraObject2<ModelURI, Env> => ({
    _F: ModelURI,
    interface: <PropsE, PropsA>(
      props: PropsKind2<ModelURI, PropsE, PropsA, Env>,
      config?: {
        name?: string
        conf?: ConfigsForType<
          Env,
          PropsE,
          PropsA,
          InterfaceConfig<PropsKind2<ModelURI, PropsE, PropsA, Env>>
        >
      }
    ) => (env: Env) =>
      introduce(projectFieldWithEnv(props, env)("codec"))(
        (model) =>
          new ModelType<PropsE, PropsA>(
            modelApplyConfig(config?.conf)(M.type(model, config?.name) as any, env, {
              model: model as any
            })
          )
      ),
    partial: <PropsE, PropsA>(
      props: PropsKind2<ModelURI, PropsE, PropsA, Env>,
      config?: {
        name?: string
        conf?: ConfigsForType<
          Env,
          Partial<PropsE>,
          Partial<PropsA>,
          PartialConfig<PropsKind2<ModelURI, PropsE, PropsA, Env>>
        >
      }
    ) => (env: Env) =>
      introduce(projectFieldWithEnv(props, env)("codec"))(
        (model) =>
          new ModelType<Partial<PropsE>, Partial<PropsA>>(
            modelApplyConfig(config?.conf)(M.partial(model, config?.name) as any, env, {
              model: model as any
            }) as any
          )
      ),
    both: <PropsE, PropsA, PropsPartialE, PropsPartialA>(
      props: PropsKind2<ModelURI, PropsE, PropsA, Env>,
      partial: PropsKind2<ModelURI, PropsPartialE, PropsPartialA, Env>,
      config?: {
        name?: string
        namePartial?: string
        nameRequired?: string
        conf?: ConfigsForType<
          Env,
          PropsE & Partial<PropsPartialE>,
          PropsA & Partial<PropsPartialA>,
          BothConfig<
            PropsKind2<ModelURI, PropsE, PropsA, Env>,
            PropsKind2<ModelURI, PropsPartialE, PropsPartialA, Env>
          >
        >
      }
    ) => (env: Env) =>
      introduce(projectFieldWithEnv(props, env)("codec"))((model) =>
        introduce(projectFieldWithEnv(partial, env)("codec"))(
          (modelP) =>
            new ModelType<PropsE, PropsA>(
              modelApplyConfig(config?.conf)(
                M.intersection(
                  [
                    M.type(model, config?.nameRequired),
                    M.partial(modelP, config?.namePartial)
                  ],
                  config?.name
                ) as any,
                env,
                {
                  model: model as any,
                  modelPartial: modelP as any
                }
              )
            )
        )
      )
  })
)

export const modelStrictObjectInterpreter = memo(
  <Env extends AnyEnv>(): MatechsAlgebraObject2<ModelURI, Env> => ({
    _F: ModelURI,
    interface: <PropsE, PropsA>(
      props: PropsKind2<ModelURI, PropsE, PropsA, Env>,
      config?: {
        name?: string
        conf?: ConfigsForType<
          Env,
          PropsE,
          PropsA,
          InterfaceConfig<PropsKind2<ModelURI, PropsE, PropsA, Env>>
        >
      }
    ) => (env: Env) =>
      introduce(projectFieldWithEnv(props, env)("codec"))(
        (model) =>
          new ModelType<PropsE, PropsA>(
            modelApplyConfig(config?.conf)(M.strict(model, config?.name) as any, env, {
              model: model as any
            })
          )
      ),
    partial: <PropsE, PropsA>(
      props: PropsKind2<ModelURI, PropsE, PropsA, Env>,
      config?: {
        name?: string
        conf?: ConfigsForType<
          Env,
          Partial<PropsE>,
          Partial<PropsA>,
          InterfaceConfig<PropsKind2<ModelURI, PropsE, PropsA, Env>>
        >
      }
    ) => (env: Env) =>
      introduce(projectFieldWithEnv(props, env)("codec"))(
        (model) =>
          new ModelType<Partial<PropsE>, Partial<PropsA>>(
            modelApplyConfig(config?.conf)(
              M.exact(M.partial(model), config?.name) as any,
              env,
              {
                model: model as any
              }
            ) as any
          )
      ),
    both: <PropsE, PropsA, PropsPartialE, PropsPartialA>(
      props: PropsKind2<ModelURI, PropsE, PropsA, Env>,
      partial: PropsKind2<ModelURI, PropsPartialE, PropsPartialA, Env>,
      config?: {
        name?: string
        namePartial?: string
        nameRequired?: string
        conf?: ConfigsForType<
          Env,
          PropsE & Partial<PropsPartialE>,
          PropsA & Partial<PropsPartialA>,
          BothConfig<
            PropsKind2<ModelURI, PropsE, PropsA, Env>,
            PropsKind2<ModelURI, PropsPartialE, PropsPartialA, Env>
          >
        >
      }
    ) => (env: Env) =>
      introduce(projectFieldWithEnv(props, env)("codec"))((model) =>
        introduce(projectFieldWithEnv(partial, env)("codec"))(
          (modelP) =>
            new ModelType<PropsE, PropsA>(
              modelApplyConfig(config?.conf)(
                M.exact(
                  M.intersection(
                    [
                      M.type(model, config?.nameRequired),
                      M.partial(modelP, config?.namePartial)
                    ],
                    config?.name
                  )
                ) as any,
                env,
                {
                  model: model as any,
                  modelPartial: modelP as any
                }
              )
            )
        )
      )
  })
)

export const modelPreciseObjectInterpreter = memo(
  <Env extends AnyEnv>(): MatechsAlgebraObject2<ModelURI, Env> => ({
    _F: ModelURI,
    interface: <PropsE, PropsA>(
      props: PropsKind2<ModelURI, PropsE, PropsA, Env>,
      config?: {
        name?: string
        conf?: ConfigsForType<
          Env,
          PropsE,
          PropsA,
          InterfaceConfig<PropsKind2<ModelURI, PropsE, PropsA, Env>>
        >
      }
    ) => (env: Env) =>
      introduce(projectFieldWithEnv(props, env)("codec"))(
        (model) =>
          new ModelType<PropsE, PropsA>(
            modelApplyConfig(config?.conf)(
              M.precise(M.type(model), config?.name) as any,
              env,
              {
                model: model as any
              }
            )
          )
      ),
    partial: <PropsE, PropsA>(
      props: PropsKind2<ModelURI, PropsE, PropsA, Env>,
      config?: {
        name?: string
        conf?: ConfigsForType<
          Env,
          Partial<PropsE>,
          Partial<PropsA>,
          InterfaceConfig<PropsKind2<ModelURI, PropsE, PropsA, Env>>
        >
      }
    ) => (env: Env) =>
      introduce(projectFieldWithEnv(props, env)("codec"))(
        (model) =>
          new ModelType<Partial<PropsE>, Partial<PropsA>>(
            modelApplyConfig(config?.conf)(
              M.precise(M.partial(model, config?.name)) as any,
              env,
              {
                model: model as any
              }
            ) as any
          )
      ),
    both: <PropsE, PropsA, PropsPartialE, PropsPartialA>(
      props: PropsKind2<ModelURI, PropsE, PropsA, Env>,
      partial: PropsKind2<ModelURI, PropsPartialE, PropsPartialA, Env>,
      config?: {
        name?: string
        namePartial?: string
        nameRequired?: string
        conf?: ConfigsForType<
          Env,
          PropsE & Partial<PropsPartialE>,
          PropsA & Partial<PropsPartialA>,
          BothConfig<
            PropsKind2<ModelURI, PropsE, PropsA, Env>,
            PropsKind2<ModelURI, PropsPartialE, PropsPartialA, Env>
          >
        >
      }
    ) => (env: Env) =>
      introduce(projectFieldWithEnv(props, env)("codec"))((model) =>
        introduce(projectFieldWithEnv(partial, env)("codec"))(
          (modelP) =>
            new ModelType<PropsE, PropsA>(
              modelApplyConfig(config?.conf)(
                M.precise(
                  M.intersection(
                    [
                      M.type(model, config?.nameRequired),
                      M.partial(modelP, config?.namePartial)
                    ],
                    config?.name
                  )
                ) as any,
                env,
                {
                  model: model as any,
                  modelPartial: modelP as any
                }
              )
            )
        )
      )
  })
)
