import type {
  AnyEnv,
  ConfigsForType,
  InterpreterURIS,
  Kind,
  Named
} from "../../../src/HKT"

export interface DateFromTime {}

declare module "../../../src/Algebra/Extensions" {
  export interface AlgebraExtensions<F extends InterpreterURIS, Env extends AnyEnv> {
    readonly dateFromTime: (
      config?: Named<ConfigsForType<Env, number, Date, DateFromTime>>
    ) => Kind<F, Env, number, Date>
  }
}
