import type { Arbitrary } from "fast-check"

import type { InterfaceA, IntersectionA, TaggedUnionA } from "../../Internal/Config"
import type { FastCheckURI } from "../hkt"

declare module "../../Algebra/intersection" {
  interface IntersectionConfig<L extends unknown[], A extends unknown[]> {
    [FastCheckURI]: {
      arbs: IntersectionA<A, FastCheckURI>
    }
  }
}

declare module "../../Algebra/newtype" {
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

declare module "../../Algebra/object" {
  interface InterfaceConfig<Props> {
    [FastCheckURI]: {
      arbs: InterfaceA<Props, FastCheckURI>
    }
  }
  interface PartialConfig<Props> {
    [FastCheckURI]: {
      arbs: InterfaceA<Props, FastCheckURI>
    }
  }
  interface BothConfig<Props, PropsPartial> {
    [FastCheckURI]: {
      arbs: InterfaceA<Props, FastCheckURI>
      arbsPartial: InterfaceA<PropsPartial, FastCheckURI>
    }
  }
}

declare module "../../Algebra/primitives" {
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
}

declare module "../../Algebra/recursive" {
  interface RecursiveConfig<L, A> {
    [FastCheckURI]: {
      getArb: () => Arbitrary<A>
    }
  }
}

declare module "../../Algebra/refined" {
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

declare module "../../Algebra/set" {
  interface SetConfig<L, A> {
    [FastCheckURI]: {
      arb: Arbitrary<A>
    }
  }
}

declare module "../../Algebra/record" {
  interface RecordConfig<L, A> {
    [FastCheckURI]: {
      arb: Arbitrary<A>
    }
  }
}

declare module "../../Algebra/tagged-union" {
  interface TaggedUnionConfig<Types> {
    [FastCheckURI]: {
      arbs: TaggedUnionA<Types, FastCheckURI>
    }
  }
}

declare module "../../Algebra/unknown" {
  interface UnknownConfig {
    [FastCheckURI]: {
      arb: Arbitrary<unknown>
    }
  }
}

export {}
