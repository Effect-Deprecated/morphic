// ets_tracing: off

import type * as E from "@effect-ts/core/Equal"

import type {
  InterfaceLA,
  IntersectionLA,
  TaggedUnionLA
} from "../../Algebra/Config/index.js"
import type { HKT, Kind } from "../../HKT/index.js"
import type { EqURI } from "../base/index.js"

declare module "../../Algebra/Intersection/index.js" {
  export interface IntersectionConfig<
    L extends readonly unknown[],
    A extends readonly unknown[]
  > {
    [EqURI]: {
      equals: IntersectionLA<L, A, EqURI>
    }
  }
}

declare module "../../Algebra/Newtype/index.js" {
  interface NewtypeConfig<L, A, N> {
    [EqURI]: {
      eq: E.Equal<A>
    }
  }
  interface CoerceConfig<L, A, N> {
    [EqURI]: {
      eq: E.Equal<A>
    }
  }
  interface IsoConfig<L, A, N> {
    [EqURI]: {
      eq: E.Equal<A>
    }
  }
  interface PrismConfig<L, A, N> {
    [EqURI]: {
      eq: E.Equal<A>
    }
  }
}

declare module "../../Algebra/Object/index.js" {
  interface InterfaceConfig<Props> {
    [EqURI]: {
      eq: InterfaceLA<Props, EqURI>
    }
  }
  interface PartialConfig<Props> {
    [EqURI]: {
      eq: InterfaceLA<Props, EqURI>
    }
  }
  interface BothConfig<Props, PropsPartial> {
    [EqURI]: {
      eq: InterfaceLA<Props, EqURI>
      eqPartial: InterfaceLA<PropsPartial, EqURI>
    }
  }
}

declare module "../../Algebra/Primitives/index.js" {
  interface NonEmptyArrayConfig<L, A> {
    [EqURI]: {
      eq: E.Equal<A>
    }
  }
  interface ArrayConfig<L, A> {
    [EqURI]: {
      eq: E.Equal<A>
    }
  }
  interface NullableConfig<L, A> {
    [EqURI]: {
      eq: E.Equal<A>
    }
  }
  interface MutableConfig<L, A> {
    [EqURI]: {
      eq: E.Equal<A>
    }
  }
  interface OptionalConfig<L, A> {
    [EqURI]: {
      eq: E.Equal<A>
    }
  }
  interface EitherConfig<EE, EA, AE, AA> {
    [EqURI]: {
      left: E.Equal<EA>
      right: E.Equal<AA>
    }
  }
  interface OptionConfig<L, A> {
    [EqURI]: {
      eq: E.Equal<A>
    }
  }
  interface TupleConfig<Types extends readonly Kind<any, any, any, any>[]> {
    [EqURI]: {
      eqs: {
        [k in keyof Types]: [Types[k]] extends [HKT<any, infer E, infer A>]
          ? E.Equal<A>
          : never
      }
    }
  }
}

declare module "../../Algebra/Refined/index.js" {
  interface RefinedConfig<E, A, B> {
    [EqURI]: {
      eq: E.Equal<A>
      eqRefined: E.Equal<B>
    }
  }
  interface PredicateConfig<E, A> {
    [EqURI]: {
      eq: E.Equal<A>
    }
  }
}

declare module "../../Algebra/Set/index.js" {
  interface SetConfig<L, A> {
    [EqURI]: {
      eq: E.Equal<A>
    }
  }
}

declare module "../../Algebra/Record/index.js" {
  interface RecordConfig<L, A> {
    [EqURI]: {
      eq: E.Equal<A>
    }
  }
}

declare module "../../Algebra/HashMap/index.js" {
  interface HashMapConfig<L, A, K> {
    [EqURI]: {
      eq: E.Equal<K>
      coEq: E.Equal<A>
    }
  }
}

declare module "../../Algebra/TaggedUnion/index.js" {
  interface TaggedUnionConfig<Types> {
    [EqURI]: {
      equals: TaggedUnionLA<Types, EqURI>
    }
  }
}

declare module "../../Algebra/Union/index.js" {
  interface UnionConfig<Types> {
    [EqURI]: {
      equals: {
        [k in keyof Types]: Types[k] extends HKT<any, infer E, infer A>
          ? E.Equal<A>
          : never
      }
    }
  }
}
