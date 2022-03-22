// ets_tracing: off

import type { Arbitrary } from "fast-check"

import type {
  InterfaceLA,
  IntersectionLA,
  TaggedUnionLA
} from "../../Algebra/Config/index.js"
import type { HKT, Kind } from "../../HKT/index.js"
import type { FastCheckURI } from "../base/index.js"

declare module "../../Algebra/Intersection/index.js" {
  interface IntersectionConfig<
    L extends readonly unknown[],
    A extends readonly unknown[]
  > {
    [FastCheckURI]: {
      arbs: IntersectionLA<L, A, FastCheckURI>
    }
  }
}

declare module "../../Algebra/Newtype/index.js" {
  interface NewtypeConfig<L, A, N> {
    [FastCheckURI]: {
      arb: Arbitrary<A>
    }
  }
  interface CoerceConfig<L, A, N> {
    [FastCheckURI]: {
      arb: Arbitrary<A>
    }
  }
  interface IsoConfig<L, A, N> {
    [FastCheckURI]: {
      arb: Arbitrary<A>
    }
  }
}

declare module "../../Algebra/Object/index.js" {
  interface InterfaceConfig<Props> {
    [FastCheckURI]: {
      arbs: InterfaceLA<Props, FastCheckURI>
    }
  }
  interface PartialConfig<Props> {
    [FastCheckURI]: {
      arbs: InterfaceLA<Props, FastCheckURI>
    }
  }
  interface BothConfig<Props, PropsPartial> {
    [FastCheckURI]: {
      arbs: InterfaceLA<Props, FastCheckURI>
      arbsPartial: InterfaceLA<PropsPartial, FastCheckURI>
    }
  }
}

declare module "../../Algebra/Primitives/index.js" {
  interface NonEmptyArrayConfig<L, A> {
    [FastCheckURI]: {
      arb: Arbitrary<A>
    }
  }
  interface ArrayConfig<L, A> {
    [FastCheckURI]: {
      arb: Arbitrary<A>
    }
  }
  interface NullableConfig<L, A> {
    [FastCheckURI]: {
      arb: Arbitrary<A>
    }
  }
  interface MutableConfig<L, A> {
    [FastCheckURI]: {
      arb: Arbitrary<A>
    }
  }
  interface OptionalConfig<L, A> {
    [FastCheckURI]: {
      arb: Arbitrary<A>
    }
  }
  interface EitherConfig<EE, EA, AE, AA> {
    [FastCheckURI]: {
      left: Arbitrary<EA>
      right: Arbitrary<AA>
    }
  }
  interface OptionConfig<L, A> {
    [FastCheckURI]: {
      arb: Arbitrary<A>
    }
  }
  interface TupleConfig<Types extends readonly Kind<any, any, any, any>[]> {
    [FastCheckURI]: {
      arbs: {
        [k in keyof Types]: [Types[k]] extends [HKT<any, infer E, infer A>]
          ? Arbitrary<A>
          : never
      }
    }
  }
}

declare module "../../Algebra/Recursive/index.js" {
  interface RecursiveConfig<L, A> {
    [FastCheckURI]: {
      getArb: () => Arbitrary<A>
    }
  }
}

declare module "../../Algebra/Refined/index.js" {
  interface RefinedConfig<E, A, B> {
    [FastCheckURI]: {
      arb: Arbitrary<A>
    }
  }
  interface PredicateConfig<E, A> {
    [FastCheckURI]: {
      arb: Arbitrary<A>
    }
  }
}

declare module "../../Algebra/Set/index.js" {
  interface SetConfig<L, A> {
    [FastCheckURI]: {
      arb: Arbitrary<A>
    }
  }
}

declare module "../../Algebra/Record/index.js" {
  interface RecordConfig<L, A> {
    [FastCheckURI]: {
      arb: Arbitrary<A>
    }
  }
}

declare module "../../Algebra/HashMap/index.js" {
  interface HashMapConfig<L, A, K> {
    [FastCheckURI]: {
      arb: Arbitrary<K>
      coArb: Arbitrary<A>
    }
  }
}

declare module "../../Algebra/TaggedUnion/index.js" {
  interface TaggedUnionConfig<Types> {
    [FastCheckURI]: {
      arbs: TaggedUnionLA<Types, FastCheckURI>
    }
  }
}

declare module "../../Algebra/Unknown/index.js" {
  interface UnknownConfig {
    [FastCheckURI]: {
      arb: Arbitrary<unknown>
    }
  }
}

declare module "../../Algebra/Union/index.js" {
  interface UnionConfig<Types> {
    [FastCheckURI]: {
      arbs: {
        [k in keyof Types]: Types[k] extends HKT<any, infer E, infer A>
          ? Arbitrary<A>
          : never
      }
    }
  }
}

export {}
