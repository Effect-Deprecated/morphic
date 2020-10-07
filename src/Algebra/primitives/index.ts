import type { Array } from "@effect-ts/core/Classic/Array"
import type { Branded } from "@effect-ts/core/Classic/Branded"
import type { Either } from "@effect-ts/core/Classic/Either"
import type { NonEmptyArray } from "@effect-ts/core/Classic/NonEmptyArray"
import type { Option } from "@effect-ts/core/Classic/Option"
import type { Record } from "@effect-ts/core/Classic/Record"
import type { FunctionN } from "@effect-ts/core/Function"
import type { Mutable } from "@effect-ts/system/Mutable"

import type { AnyEnv, ConfigsForType } from "../config"
import type { HKT2, Kind, Kind2, URIS, URIS2 } from "../utils/hkt"

export interface UUIDBrand {
  readonly UUID: unique symbol
}

export type UUID = Branded<string, UUIDBrand>

export type Keys = Record<string, null>

export type LiteralT = string | number

export const PrimitivesURI = "PrimitivesURI" as const

export type PrimitivesURI = typeof PrimitivesURI

declare module "../utils/hkt" {
  export interface Algebra<F, Env> {
    [PrimitivesURI]: AlgebraPrimitive<F, Env>
  }
  export interface Algebra1<F extends URIS, Env extends AnyEnv> {
    [PrimitivesURI]: AlgebraPrimitive1<F, Env>
  }
  export interface Algebra2<F extends URIS2, Env extends AnyEnv> {
    [PrimitivesURI]: AlgebraPrimitive2<F, Env>
  }
}

export interface NonEmptyArrayConfig<L, A> {}
export interface ArrayConfig<L, A> {}
export interface NullableConfig<L, A> {}
export interface MutableConfig<L, A> {}
export interface OptionalConfig<L, A> {}
export interface StringLiteralConfig<T> {}
export interface NumberLiteralConfig<T> {}
export interface OneOfLiteralsConfig<T> {}
export interface KeysOfConfig<K> {}
export interface EitherConfig<EE, EA, AE, AA> {}
export interface OptionConfig<L, A> {}
export interface UnknownEConfig<L, A> {}
export interface BooleanConfig {}
export interface NumberConfig {}
export interface BigIntConfig {}
export interface StringConfig {}
export interface DateConfig {}
export interface UUIDConfig {}
export interface FunctionConfig<I, IE, O, OE> {}

export interface AlgebraPrimitive<F, Env> {
  _F: F
  function: {
    <I, IE, O, OE>(
      I: HKT2<F, Env, IE, I>,
      O: HKT2<F, Env, OE, O>,
      config?: {
        name?: string
        conf?: ConfigsForType<
          Env,
          unknown,
          FunctionN<[I], O>,
          FunctionConfig<I, IE, O, OE>
        >
      }
    ): HKT2<F, Env, unknown, FunctionN<[I], O>>
  }
  unknownE: {
    <L, A>(
      T: HKT2<F, Env, L, A>,
      config?: {
        name?: string
        conf?: ConfigsForType<Env, unknown, A, UnknownEConfig<L, A>>
      }
    ): HKT2<F, Env, unknown, A>
  }
  nullable: {
    <L, A>(
      T: HKT2<F, Env, L, A>,
      config?: {
        name?: string
        conf?: ConfigsForType<Env, L | null, Option<A>, NullableConfig<L, A>>
      }
    ): HKT2<F, Env, null | L, Option<A>>
  }
  mutable: {
    <L, A>(
      T: HKT2<F, Env, L, A>,
      config?: {
        name?: string
        conf?: ConfigsForType<Env, Mutable<L>, Mutable<A>, MutableConfig<L, A>>
      }
    ): HKT2<F, Env, Mutable<L>, Mutable<A>>
  }
  optional: {
    <L, A>(
      T: HKT2<F, Env, L, A>,
      config?: {
        name?: string
        conf?: ConfigsForType<Env, L | undefined, A | undefined, OptionalConfig<L, A>>
      }
    ): HKT2<F, Env, L | undefined, A | undefined>
  }
  boolean: {
    (config?: {
      name?: string
      conf?: ConfigsForType<Env, boolean, boolean, BooleanConfig>
    }): HKT2<F, Env, boolean, boolean>
  }
  number: {
    (config?: {
      name?: string
      conf?: ConfigsForType<Env, number, number, NumberConfig>
    }): HKT2<F, Env, number, number>
  }
  bigint: {
    (config?: {
      name?: string
      conf?: ConfigsForType<Env, string, bigint, BigIntConfig>
    }): HKT2<F, Env, string, bigint>
  }
  string: {
    (config?: {
      name?: string
      conf?: ConfigsForType<Env, string, string, StringConfig>
    }): HKT2<F, Env, string, string>
  }
  stringLiteral: {
    <T extends string>(
      value: T,
      config?: {
        name?: string
        conf?: ConfigsForType<Env, string, T, StringLiteralConfig<T>>
      }
    ): HKT2<F, Env, string, typeof value>
  }
  numberLiteral: {
    <T extends number>(
      value: T,
      config?: {
        name?: string
        conf?: ConfigsForType<Env, number, T, NumberLiteralConfig<T>>
      }
    ): HKT2<F, Env, number, typeof value>
  }
  oneOfLiterals: {
    /**
     * The value array has to be created with `as const` assertion for this
     * combinator to work correctly
     */
    <T extends readonly [LiteralT, LiteralT, ...LiteralT[]]>(
      value: T,
      config?: {
        name?: string
        conf?: ConfigsForType<Env, LiteralT, T[number], OneOfLiteralsConfig<T[number]>>
      }
    ): HKT2<F, Env, LiteralT, T[number]>
  }
  keysOf: {
    <K extends Keys>(
      keys: K,
      config?: {
        name?: string
        conf?: ConfigsForType<Env, string, keyof K & string, KeysOfConfig<K>>
      }
    ): HKT2<F, Env, string, keyof typeof keys & string>
  }
  array: {
    <L, A>(
      a: HKT2<F, Env, L, A>,
      config?: {
        name?: string
        conf?: ConfigsForType<Env, Array<L>, Array<A>, ArrayConfig<L, A>>
      }
    ): HKT2<F, Env, Array<L>, Array<A>>
  }
  nonEmptyArray: {
    <L, A>(
      a: HKT2<F, Env, L, A>,
      config?: {
        name?: string
        conf?: ConfigsForType<
          Env,
          Array<L>,
          NonEmptyArray<A>,
          NonEmptyArrayConfig<L, A>
        >
      }
    ): HKT2<F, Env, Array<L>, NonEmptyArray<A>>
  }
  date: {
    (config?: {
      name?: string
      conf?: ConfigsForType<Env, string, Date, DateConfig>
    }): HKT2<F, Env, string, Date>
  }
  uuid: {
    (config?: {
      name?: string
      conf?: ConfigsForType<Env, string, UUID, UUIDConfig>
    }): HKT2<F, Env, string, UUID>
  }
  either: {
    <EE, EA, AE, AA>(
      e: HKT2<F, Env, EE, EA>,
      a: HKT2<F, Env, AE, AA>,
      config?: {
        name?: string
        conf?: ConfigsForType<
          Env,
          Either<EE, AE>,
          Either<EA, AA>,
          EitherConfig<EE, EA, AE, AA>
        >
      }
    ): HKT2<F, Env, Either<EE, AE>, Either<EA, AA>>
  }
  option: {
    <E, A>(
      a: HKT2<F, Env, E, A>,
      config?: {
        name?: string
        conf?: ConfigsForType<Env, Option<E>, Option<A>, OptionConfig<E, A>>
      }
    ): HKT2<F, Env, Option<E>, Option<A>>
  }
}

export interface AlgebraPrimitive1<F extends URIS, Env extends AnyEnv> {
  _F: F
  function: {
    <I, O>(
      I: Kind<F, Env, I>,
      O: Kind<F, Env, O>,
      config?: {
        name?: string
        conf?: ConfigsForType<
          Env,
          FunctionN<[unknown], unknown>,
          FunctionN<[I], O>,
          FunctionConfig<I, unknown, O, unknown>
        >
      }
    ): Kind<F, Env, FunctionN<[I], O>>
  }
  unknownE: {
    <A>(
      T: Kind<F, Env, A>,
      config?: {
        name?: string
        conf?: ConfigsForType<Env, unknown, A, UnknownEConfig<unknown, A>>
      }
    ): Kind<F, Env, A>
  }
  nullable: <A>(
    T: Kind<F, Env, A>,
    config?: {
      name?: string
      conf?: ConfigsForType<Env, null | A, Option<A>, NullableConfig<unknown, A>>
    }
  ) => Kind<F, Env, Option<A>>
  mutable: {
    <A>(
      T: Kind<F, Env, A>,
      config?: {
        name?: string
        conf?: ConfigsForType<Env, unknown, Mutable<A>, MutableConfig<unknown, A>>
      }
    ): Kind<F, Env, Mutable<A>>
  }
  optional: {
    <A>(
      T: Kind<F, Env, A>,
      config?: {
        name?: string
        conf?: ConfigsForType<
          Env,
          unknown | undefined,
          A | undefined,
          OptionalConfig<unknown, A>
        >
      }
    ): Kind<F, Env, A | undefined>
  }
  boolean(config?: {
    name?: string
    conf?: ConfigsForType<Env, boolean, boolean, BooleanConfig>
  }): Kind<F, Env, boolean>
  number(config?: {
    name?: string
    conf?: ConfigsForType<Env, number, number, NumberConfig>
  }): Kind<F, Env, number>
  bigint(config?: {
    name?: string
    conf?: ConfigsForType<Env, string, bigint, BigIntConfig>
  }): Kind<F, Env, bigint>
  string(config?: {
    name?: string
    conf?: ConfigsForType<Env, string, string, StringConfig>
  }): Kind<F, Env, string>
  stringLiteral: <T extends string>(
    value: T,
    config?: {
      name?: string
      conf?: ConfigsForType<Env, string, T, StringLiteralConfig<T>>
    }
  ) => Kind<F, Env, typeof value>
  numberLiteral: <T extends number>(
    value: T,
    config?: {
      name?: string
      conf?: ConfigsForType<Env, number, T, NumberLiteralConfig<T>>
    }
  ) => Kind<F, Env, typeof value>
  oneOfLiterals: {
    <T extends readonly [LiteralT, ...LiteralT[]]>(
      value: T,
      config?: {
        name?: string
        conf?: ConfigsForType<Env, LiteralT, T[number], OneOfLiteralsConfig<T[number]>>
      }
    ): Kind<F, Env, T[number]>
  }
  keysOf: <K extends Keys>(
    keys: K,
    config?: {
      name?: string
      conf?: ConfigsForType<Env, string, keyof K & string, KeysOfConfig<K>>
    }
  ) => Kind<F, Env, keyof typeof keys & string>
  array: <A>(
    a: Kind<F, Env, A>,
    config?: {
      name?: string
      conf?: ConfigsForType<Env, Array<unknown>, Array<A>, ArrayConfig<unknown, A>>
    }
  ) => Kind<F, Env, Array<A>>
  nonEmptyArray: <A>(
    a: Kind<F, Env, A>,
    config?: {
      name?: string
      conf?: ConfigsForType<
        Env,
        Array<unknown>,
        NonEmptyArray<A>,
        NonEmptyArrayConfig<unknown, A>
      >
    }
  ) => Kind<F, Env, NonEmptyArray<A>>
  date(config?: {
    name?: string
    conf?: ConfigsForType<Env, string, Date, DateConfig>
  }): Kind<F, Env, Date>
  uuid(config?: {
    name?: string
    conf?: ConfigsForType<Env, string, UUID, UUIDConfig>
  }): Kind<F, Env, UUID>
  either: <EA, AA>(
    e: Kind<F, Env, EA>,
    a: Kind<F, Env, AA>,
    config?: {
      name?: string
      conf?: ConfigsForType<
        Env,
        Either<unknown, unknown>,
        Either<EA, AA>,
        EitherConfig<unknown, EA, unknown, AA>
      >
    }
  ) => Kind<F, Env, Either<EA, AA>>
  option: {
    <A>(
      a: Kind<F, Env, A>,
      config?: {
        name?: string
        conf?: ConfigsForType<Env, unknown, Option<A>, OptionConfig<unknown, A>>
      }
    ): Kind<F, Env, Option<A>>
  }
}

export interface AlgebraPrimitive2<F extends URIS2, Env extends AnyEnv> {
  _F: F
  function: {
    <I, IE, O, OE>(
      I: Kind2<F, Env, IE, I>,
      O: Kind2<F, Env, OE, O>,
      config?: {
        name?: string
        conf?: ConfigsForType<
          Env,
          unknown,
          FunctionN<[I], O>,
          FunctionConfig<I, IE, O, OE>
        >
      }
    ): Kind2<F, Env, unknown, FunctionN<[I], O>>
  }
  unknownE: {
    <L, A>(
      T: Kind2<F, Env, L, A>,
      config?: {
        name?: string
        conf?: ConfigsForType<Env, unknown, A, UnknownEConfig<L, A>>
      }
    ): Kind2<F, Env, unknown, A>
  }
  nullable: <L, A>(
    T: Kind2<F, Env, L, A>,
    config?: {
      name?: string
      conf?: ConfigsForType<Env, null | L, Option<A>, NullableConfig<L, A>>
    }
  ) => Kind2<F, Env, null | L, Option<A>>
  mutable: {
    <L, A>(
      T: Kind2<F, Env, L, A>,
      config?: {
        name?: string
        conf?: ConfigsForType<Env, Mutable<L>, Mutable<A>, MutableConfig<L, A>>
      }
    ): Kind2<F, Env, Mutable<L>, Mutable<A>>
  }
  optional: {
    <L, A>(
      T: Kind2<F, Env, L, A>,
      config?: {
        name?: string
        conf?: ConfigsForType<Env, L | undefined, A | undefined, OptionalConfig<L, A>>
      }
    ): Kind2<F, Env, L | undefined, A | undefined>
  }
  boolean(config?: {
    name?: string
    conf?: ConfigsForType<Env, boolean, boolean>
  }): Kind2<F, Env, boolean, boolean>
  number(config?: {
    name?: string
    conf?: ConfigsForType<Env, number, number, NumberConfig>
  }): Kind2<F, Env, number, number>
  bigint(config?: {
    name?: string
    conf?: ConfigsForType<Env, string, bigint, BigIntConfig>
  }): Kind2<F, Env, string, bigint>
  string(config?: {
    name?: string
    conf?: ConfigsForType<Env, string, string, StringConfig>
  }): Kind2<F, Env, string, string>
  stringLiteral: <T extends string>(
    value: T,
    config?: {
      name?: string
      conf?: ConfigsForType<Env, string, T, StringLiteralConfig<T>>
    }
  ) => Kind2<F, Env, string, typeof value>
  numberLiteral: <T extends number>(
    value: T,
    config?: {
      name?: string
      conf?: ConfigsForType<Env, number, T, NumberLiteralConfig<T>>
    }
  ) => Kind2<F, Env, number, typeof value>
  oneOfLiterals: {
    <T extends readonly [LiteralT, ...LiteralT[]]>(
      value: T,
      config?: {
        name?: string
        conf?: ConfigsForType<Env, LiteralT, T[number], OneOfLiteralsConfig<T[number]>>
      }
    ): Kind2<F, Env, LiteralT, T[number]>
  }
  keysOf: <K extends Keys>(
    keys: K,
    config?: {
      name?: string
      conf?: ConfigsForType<Env, string, keyof K & string, KeysOfConfig<K>>
    }
  ) => Kind2<F, Env, string, keyof typeof keys & string>
  array: <L, A>(
    a: Kind2<F, Env, L, A>,
    config?: {
      name?: string
      conf?: ConfigsForType<Env, Array<L>, Array<A>, ArrayConfig<L, A>>
    }
  ) => Kind2<F, Env, Array<L>, Array<A>>
  nonEmptyArray: <L, A>(
    a: Kind2<F, Env, L, A>,
    config?: {
      name?: string
      conf?: ConfigsForType<Env, Array<L>, NonEmptyArray<A>, NonEmptyArrayConfig<L, A>>
    }
  ) => Kind2<F, Env, Array<L>, NonEmptyArray<A>>
  date(config?: {
    name?: string
    conf?: ConfigsForType<Env, string, Date, DateConfig>
  }): Kind2<F, Env, string, Date>
  uuid(config?: {
    name?: string
    conf?: ConfigsForType<Env, string, UUID, UUIDConfig>
  }): Kind2<F, Env, string, UUID>
  either: <EE, EA, AE, AA>(
    e: Kind2<F, Env, EE, EA>,
    a: Kind2<F, Env, AE, AA>,
    config?: {
      name?: string
      conf?: ConfigsForType<
        Env,
        Either<EE, AE>,
        Either<EA, AA>,
        EitherConfig<EE, EA, AE, AA>
      >
    }
  ) => Kind2<F, Env, Either<EE, AE>, Either<EA, AA>>
  option: {
    <E, A>(
      a: Kind2<F, Env, E, A>,
      config?: {
        name?: string
        conf?: ConfigsForType<Env, Option<E>, Option<A>, OptionConfig<E, A>>
      }
    ): Kind2<F, Env, Option<E>, Option<A>>
  }
}
